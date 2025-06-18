import { MongoClient } from 'mongodb';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function migrateData() {
  // Connect to MongoDB
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  
  console.log('Connected to MongoDB');
  
  try {
    const db = client.db();
    const orders = await db.collection('orders').find({}).toArray();
    
    console.log(`Found ${orders.length} orders to migrate`);
    
    // Convert to SQL format
    const sqlInserts = orders.map(order => {
      // Escape single quotes and handle null values
      const escapeValue = (value) => {
        if (value === null || value === undefined) return 'NULL';
        return `'${String(value).replace(/'/g, "''")}'`;
      };
      
      return `INSERT INTO orders (name, email, phone, contactMethod, message, country, username, verificationStatus, selectedCard, created_at, updated_at) VALUES (${escapeValue(order.name)}, ${escapeValue(order.email)}, ${escapeValue(order.phone)}, ${escapeValue(order.contactMethod)}, ${escapeValue(order.message)}, ${escapeValue(order.country)}, ${escapeValue(order.username)}, ${escapeValue(order.verificationStatus)}, ${escapeValue(order.selectedCard)}, ${escapeValue(order.createdAt || new Date().toISOString())}, ${escapeValue(order.updatedAt || new Date().toISOString())});`;
    });
    
    // Write to file
    fs.writeFileSync('migration.sql', sqlInserts.join('\n'));
    
    console.log('Migration SQL file created: migration.sql');
    console.log('Run: wrangler d1 execute your-orders-database --file=./migration.sql');
    
  } finally {
    await client.close();
  }
}

migrateData().catch(console.error);