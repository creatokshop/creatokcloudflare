import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
// MongoDB Atlas connection string from environment variables
const connectionString = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// No export needed if you're just establishing the connection
