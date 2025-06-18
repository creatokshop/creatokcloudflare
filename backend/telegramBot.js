import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Telegram configuration
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';

// Create a bot instance
const bot = new TelegramBot(token, { polling: false });

/**
 * Send order data to Telegram
 * @param {Object} order - The order data from MongoDB
 */
export const sendOrderToTelegram = async (order) => {
  try {
    const message = formatOrderMessage(order);
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    console.log('Order sent to Telegram successfully!');
    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
};

/**
 * Format order data into a readable message
 * @param {Object} order - The order data
 * @returns {String} - Formatted message for Telegram
 */
const formatOrderMessage = (order) => {
  return `
*🔔 New Order Received!*

*Customer Details:*
📝 Name: ${order.name || 'N/A'}
📧 Email: ${order.email || 'N/A'}
📱 Phone: ${order.phone || 'N/A'}
🌎 Country: ${order.country || 'N/A'}
👤 Username: ${order.username || 'N/A'}

*Order Information:*
💳 Selected Card: ${order.selectedCard || 'N/A'}
✅ Verification Status: ${order.verificationStatus || 'N/A'}
📬 Preferred Contact: ${order.contactMethod || 'N/A'}
📝 Message: ${order.message || 'N/A'}

*Order ID:* \`${order._id}\`
*Received:* ${new Date(order.createdAt).toLocaleString()}
`;
};
