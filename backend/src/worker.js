// Enhanced debug version of your worker
export default {
  async fetch(request, env, ctx) {
    // CORS configuration
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
      'Access-Control-Allow-Credentials': 'true',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204,
        headers: corsHeaders 
      });
    }

    const url = new URL(request.url);
    
    try {
      // Health check endpoint
      if (url.pathname === '/api/health') {
        return new Response(JSON.stringify({ status: 'ok' }), {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }
        });
      }

      // Orders endpoint
      if (url.pathname === '/api/orders' && request.method === 'POST') {
        return handleCreateOrder(request, env, corsHeaders);
      }

      // Default response - FIXED: now returns valid JSON
      return new Response(JSON.stringify({
        success: false,
        message: "Not Found"
      }), {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }
  }
};

// Enhanced API Key validation function with debug logging
function validateApiKey(request, env) {
  const apiKey = request.headers.get('x-api-key');
  
  // Debug logging
  console.log('=== API Key Validation Debug ===');
  console.log('Received API Key:', apiKey);
  console.log('Expected API Key:', env.API_KEY);
  console.log('API Key exists in env:', !!env.API_KEY);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  
  if (!apiKey) {
    console.log('❌ No API key provided in request');
    return { valid: false, error: 'API key is required' };
  }
  
  // In production, validate against env.API_KEY
  if (env.API_KEY && apiKey !== env.API_KEY) {
    console.log('❌ API key mismatch');
    console.log('Expected length:', env.API_KEY.length);
    console.log('Received length:', apiKey.length);
    return { valid: false, error: 'Invalid API key' };
  }
  
  console.log('✅ API key validation passed');
  return { valid: true };
}

// Handle order creation
async function handleCreateOrder(request, env, corsHeaders) {
  try {
    console.log('=== Order Creation Started ===');
    
    // Validate API key
    const apiKeyValidation = validateApiKey(request, env);
    if (!apiKeyValidation.valid) {
      console.log('❌ API key validation failed:', apiKeyValidation.error);
      return new Response(JSON.stringify({
        success: false,
        message: apiKeyValidation.error
      }), {
        status: 401,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }

    // Parse request body
    const orderData = await request.json();
    console.log('📦 Order data received:', orderData);
    
    // Basic validation - matching your original validation
    const { name, email, phone } = orderData;
    
    if (!name || !email || !phone) {
      console.log('❌ Missing required fields');
      return new Response(JSON.stringify({
        success: false,
        message: "Missing required fields"
      }), {
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }

    // Insert into D1 database
    console.log('💾 Inserting into database...');
    const result = await env.DB.prepare(`
      INSERT INTO orders (
        name, email, phone, contactMethod, message, 
        country, username, verificationStatus, selectedCard
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      orderData.name,
      orderData.email,
      orderData.phone,
      orderData.contactMethod || null,
      orderData.message || null,
      orderData.country || null,
      orderData.username || null,
      orderData.verificationStatus || null,
      orderData.selectedCard || null
    )
    .run();

    console.log('✅ Database insert successful, ID:', result.meta.last_row_id);

    // Create order object for response and Telegram
    const savedOrder = {
      id: result.meta.last_row_id,
      ...orderData,
      created_at: new Date().toISOString()
    };

    // Send to Telegram
    try {
      console.log('📱 Sending to Telegram...');
      await sendOrderToTelegram(savedOrder, env);
      console.log('✅ Telegram notification sent');
    } catch (telegramError) {
      console.error("❌ Telegram notification failed:", telegramError);
      // Continue with the process even if Telegram notification fails
    }

    // Return success response
    console.log('✅ Order creation completed successfully');
    return new Response(JSON.stringify({
      success: true,
      message: "Order submitted successfully!",
      data: savedOrder
    }), {
      status: 201,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      }
    });

  } catch (error) {
    console.error("❌ Error saving order:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Failed to submit order. Please try again."
    }), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      }
    });
  }
}

// Convert your Telegram function to work with Workers
async function sendOrderToTelegram(orderData, env) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.log('Telegram credentials not configured');
    return;
  }

  const message = `
🆕 *New Order Received*

👤 *Name:* ${orderData.name}
📧 *Email:* ${orderData.email}
📱 *Phone:* ${orderData.phone}
${orderData.contactMethod ? `📞 *Contact Method:* ${orderData.contactMethod}` : ''}
${orderData.country ? `🌍 *Country:* ${orderData.country}` : ''}
${orderData.username ? `👤 *Username:* ${orderData.username}` : ''}
${orderData.verificationStatus ? `✅ *Verification:* ${orderData.verificationStatus}` : ''}
${orderData.selectedCard ? `💳 *Selected Card:* ${orderData.selectedCard}` : ''}
${orderData.message ? `💬 *Message:* ${orderData.message}` : ''}

🕐 *Time:* ${new Date(orderData.created_at).toLocaleString()}
🆔 *Order ID:* ${orderData.id}
  `.trim();

  const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Telegram API error: ${response.status} - ${errorData}`);
  }

  return await response.json();
}