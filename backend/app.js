// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Database error:', err.message);
  } else {
    console.log('✅ Connected to SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Create Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT CHECK(role IN ('admin', 'vendor', 'user'))
      )
    `);

    // Create Vendors table
    db.run(`
      CREATE TABLE IF NOT EXISTS Vendors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        category TEXT,
        membership_expiry DATE,
        FOREIGN KEY(user_id) REFERENCES Users(id)
      )
    `);

    // Create Products table
    db.run(`
      CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vendor_id INTEGER,
        name TEXT,
        price REAL,
        image TEXT,
        FOREIGN KEY(vendor_id) REFERENCES Vendors(id)
      )
    `);

    // Create Orders table
    db.run(`
      CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        status TEXT DEFAULT 'Pending',
        FOREIGN KEY(user_id) REFERENCES Users(id),
        FOREIGN KEY(product_id) REFERENCES Products(id)
      )
    `);

    // Insert test data if empty
    db.get("SELECT COUNT(*) as count FROM Users", (err, row) => {
      if (row && row.count === 0) {
        console.log("⚡ Inserting sample data...");

        // Insert test users
        const users = [
          { email: 'admin@example.com', password: 'admin123', role: 'admin' },
          { email: 'vendor@example.com', password: 'vendor123', role: 'vendor' },
          { email: 'user@example.com', password: 'user123', role: 'user' }
        ];

        users.forEach(user => {
          db.run("INSERT INTO Users (email, password, role) VALUES (?, ?, ?)",
            [user.email, user.password, user.role]);
        });

        // Insert test vendor (linked to vendor user_id = 2)
        db.run("INSERT INTO Vendors (user_id, name, category, membership_expiry) VALUES (2, 'Test Vendor', 'Catering', '2025-12-31')");

        // Insert test products (linked to vendor_id = 1)
        const products = [
          { name: 'Birthday Cake', price: 500, image: 'https://via.placeholder.com/150' },
          { name: 'Wedding Cake', price: 2000, image: 'https://via.placeholder.com/150' }
        ];

        products.forEach(product => {
          db.run("INSERT INTO Products (vendor_id, name, price, image) VALUES (?, ?, ?, ?)",
            [1, product.name, product.price, product.image]);
        });
      }
    });
  });
}

// Routes
const authRoutes = require('./routes/auth');
console.log(authRoutes);
const vendorRoutes = require('./routes/vendor');
console.log(vendorRoutes);
const userRoutes = require('./routes/user');
console.log(userRoutes);

// ✅ Pass `db` to each route function
app.use('/api/auth', authRoutes(db));
app.use('/api/vendor', vendorRoutes(db));
app.use('/api/user', userRoutes(db));

// Serve frontend files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
});
