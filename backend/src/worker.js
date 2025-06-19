// Enhanced debug version of your worker with better error handling
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
        return new Response(JSON.stringify({ 
          status: 'ok',
          timestamp: new Date().toISOString()
        }), {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }
        });
      }

      // Orders endpoint - support multiple path variations
      const ordersPaths = ['/api/orders', '/orders', '//api/orders']; // Handle double slash too
      if (ordersPaths.includes(url.pathname) && request.method === 'POST') {
        return handleCreateOrder(request, env, corsHeaders);
      }

      // Default response for unknown endpoints
      return new Response(JSON.stringify({
        success: false,
        message: "Endpoint not found",
        availableEndpoints: ['/api/health', '/api/orders', '/orders']
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
        message: 'Internal server error',
        error: error.message 
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

// Enhanced API Key validation function with better error handling
function validateApiKey(request, env) {
  const apiKey = request.headers.get('x-api-key');
  
  // Debug logging
  console.log('=== API Key Validation Debug ===');
  console.log('Received API Key:', apiKey ? `${apiKey.substring(0, 4)}...` : 'null');
  console.log('Expected API Key configured:', !!env.API_KEY);
  
  if (!apiKey) {
    console.log('❌ No API key provided in request');
    return { valid: false, error: 'API key is required' };
  }
  
  // Check if API_KEY is configured in environment
  if (!env.API_KEY) {
    console.log('⚠️ No API_KEY configured in environment - skipping validation');
    return { valid: true }; // Or you might want to return false here for security
  }
  
  // Validate against configured API key
  if (apiKey !== env.API_KEY) {
    console.log('❌ API key mismatch');
    return { valid: false, error: 'Invalid API key' };
  }
  
  console.log('✅ API key validation passed');
  return { valid: true };
}

// Handle order creation with improved error handling
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

    // Parse request body with error handling
    let orderData;
    try {
      orderData = await request.json();
      console.log('📦 Order data received');
    } catch (jsonError) {
      console.log('❌ Invalid JSON in request body:', jsonError.message);
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid JSON in request body"
      }), {
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }
    
    // Basic validation - matching your original validation
    const { name, email, phone } = orderData;
    
    if (!name || !email || !phone) {
      console.log('❌ Missing required fields');
      return new Response(JSON.stringify({
        success: false,
        message: "Missing required fields: name, email, and phone are required"
      }), {
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid email format"
      }), {
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }

    // Check if database is available
    if (!env.DB) {
      console.log('❌ Database not configured');
      return new Response(JSON.stringify({
        success: false,
        message: "Database not available"
      }), {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }

    // Insert into D1 database with better error handling
    console.log('💾 Inserting into database...');
    let result;
    try {
      result = await env.DB.prepare(`
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
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      return new Response(JSON.stringify({
        success: false,
        message: "Database error occurred. Please try again."
      }), {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      });
    }

    console.log('✅ Database insert successful, ID:', result.meta.last_row_id);

    // Create order object for response and Telegram
    const savedOrder = {
      id: result.meta.last_row_id,
      ...orderData,
      created_at: new Date().toISOString()
    };

    // Send to Telegram (non-blocking)
    try {
      console.log('📱 Sending to Telegram...');
      await sendOrderToTelegram(savedOrder, env);
      console.log('✅ Telegram notification sent');
    } catch (telegramError) {
      console.error("❌ Telegram notification failed:", telegramError.message);
      // Continue with the process even if Telegram notification fails
    }

    // Return success response
    console.log('✅ Order creation completed successfully');
    return new Response(JSON.stringify({
      success: true,
      message: "Order submitted successfully!",
      data: {
        id: savedOrder.id,
        name: savedOrder.name,
        email: savedOrder.email,
        created_at: savedOrder.created_at
      } // Don't return all sensitive data
    }), {
      status: 201,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      }
    });

  } catch (error) {
    console.error("❌ Unexpected error in handleCreateOrder:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "An unexpected error occurred. Please try again."
    }), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      }
    });
  }
}

// Improved Telegram function with better error handling
async function sendOrderToTelegram(orderData, env) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.log('⚠️ Telegram credentials not configured - skipping notification');
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
  
  try {
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
  } catch (fetchError) {
    console.error('Telegram fetch error:', fetchError);
    throw new Error(`Failed to send Telegram notification: ${fetchError.message}`);
  }
}