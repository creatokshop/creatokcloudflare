-- Create orders table matching your MongoDB schema
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    contactMethod TEXT,
    message TEXT,
    country TEXT,
    username TEXT,
    verificationStatus TEXT,
    selectedCard TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_phone ON orders(phone);
CREATE INDEX idx_orders_created_at ON orders(created_at);