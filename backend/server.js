// backend/server.js - Updated for production
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

// CORS - Allow your Vercel frontend URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://norland-website-1w3m.vercel.app',
  'https://norland-website.vercel.app',
  'https://norland-website-3bw6-eight.vercel.app'  // ← ADD YOUR NEW URL HERE
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked:', origin); // Add this for debugging
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Test database connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Database connected successfully');
  release();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Server is running!',
    database: 'connected',
    port: port,
    environment: process.env.NODE_ENV
  });
});

// GET all products with their categories
app.get('/api/products', async (req, res) => {
  try {
    console.log('📦 Fetching all products with categories...');
    const result = await pool.query(
      "SELECT p.*, COALESCE(array_agg(c.name) FILTER (WHERE c.name IS NOT NULL), '{}') as categories " +
      "FROM products p " +
      "LEFT JOIN product_categories pc ON p.id = pc.product_id " +
      "LEFT JOIN categories c ON pc.category_id = c.id " +
      "GROUP BY p.id " +
      "ORDER BY p.id"
    );
    console.log(`✅ Found ${result.rows.length} products`);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET products by category name
app.get('/api/products/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    console.log(`📦 Fetching products for category: ${categoryName}`);
    const result = await pool.query(
      "SELECT p.* FROM products p " +
      "JOIN product_categories pc ON p.id = pc.product_id " +
      "JOIN categories c ON pc.category_id = c.id " +
      "WHERE c.name = $1",
      [categoryName]
    );
    console.log(`✅ Found ${result.rows.length} products`);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching products by category:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET all categories with product counts
app.get('/api/categories', async (req, res) => {
  try {
    console.log('📦 Fetching all categories...');
    const result = await pool.query(
      "SELECT c.*, COUNT(pc.product_id) as product_count " +
      "FROM categories c " +
      "LEFT JOIN product_categories pc ON c.id = pc.category_id " +
      "GROUP BY c.id " +
      "ORDER BY c.name"
    );
    console.log(`✅ Found ${result.rows.length} categories`);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching categories:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET featured products
app.get('/api/products/featured', async (req, res) => {
  try {
    console.log('📦 Fetching featured products...');
    const result = await pool.query(
      "SELECT * FROM products WHERE tag IN ('Featured', 'Best Selling', 'Latest') ORDER BY tag, id"
    );
    console.log(`✅ Found ${result.rows.length} total products`);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching featured:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT p.*, COALESCE(array_agg(c.name) FILTER (WHERE c.name IS NOT NULL), '{}') as categories " +
      "FROM products p " +
      "LEFT JOIN product_categories pc ON p.id = pc.product_id " +
      "LEFT JOIN categories c ON pc.category_id = c.id " +
      "WHERE p.id = $1 " +
      "GROUP BY p.id",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`\n🚀 Server running on port ${port}`);
  console.log(`📋 Test: http://localhost:${port}/api/test`);
});