// backend/server.js - Return all products with tags
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'norland_health',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 5432,
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
        port: port
    });
});

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        console.log('📦 Fetching all products...');
        const result = await pool.query('SELECT * FROM products ORDER BY tag, id');
        console.log(`✅ Found ${result.rows.length} products`);
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Database error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET featured products - GROUPED by tag, returns ALL products
app.get('/api/products/featured', async (req, res) => {
    try {
        console.log('📦 Fetching featured products grouped by tag...');
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
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
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
    console.log(`\n🚀 Server running on http://localhost:${port}`);
    console.log(`📋 Test: http://localhost:${port}/api/test`);
    console.log(`📋 Products: http://localhost:${port}/api/products`);
    console.log(`📋 Featured: http://localhost:${port}/api/products/featured\n`);
});