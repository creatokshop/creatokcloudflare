import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './db/connection.js';
import User from './Models/User.js';
import { sendOrderToTelegram } from './telegramBot.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Set up middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple API key validation middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  // For testing, we'll accept any API key that's provided
  // In production, you should compare with process.env.API_KEY
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required'
    });
  }
  
  next();
};

// API endpoint for orders
app.post("/api/orders", validateApiKey, async (req, res) => {
  try {
    // Basic validation
    const { name, email, phone } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }
    
    // Create new user
    let user = new User(req.body);
    let result = await user.save();
    
    // Send to Telegram
    try {
      await sendOrderToTelegram(result);
    } catch (telegramError) {
      console.error("Telegram notification failed:", telegramError);
      // Continue with the process even if Telegram notification fails
    }
    
    // Return success
    res.status(201).json({
      success: true,
      message: "Order submitted successfully!",
      data: result
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit order. Please try again."
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});