const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    // Try local MongoDB first
    await mongoose.connect('mongodb://localhost:27017/perfume_shop');
    console.log('✅ Connected to local MongoDB');
    
    // Log final status after connection
    console.log(`📊 Final Database status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  } catch (localError) {
    console.log('⚠️  Local MongoDB connection failed, trying MongoDB Atlas...');
    try {
      // Fallback to MongoDB Atlas (you can add your connection string here)
      // await mongoose.connect('mongodb+srv://username:password@cluster.mongodb.net/perfume_shop');
      console.log('⚠️  Please set up MongoDB Atlas connection string or start local MongoDB');
      console.log('⚠️  Starting server without database connection...');
    } catch (atlasError) {
      console.log('❌ MongoDB Atlas connection also failed');
      console.log('⚠️  Starting server without database connection...');
    }
  }
};

connectDB();

// Import models
const Product = require('./models/Product');
const Review = require('./models/Review');

// Routes
app.get('/api/products', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check MongoDB connection.',
        error: 'Database connection failed'
      });
    }
    
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check MongoDB connection.',
        error: 'Database connection failed'
      });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check MongoDB connection.',
        error: 'Database connection failed'
      });
    }
    
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/products/:id/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check MongoDB connection.',
        error: 'Database connection failed'
      });
    }
    
    const reviews = await Review.find({ productId: req.params.id });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Serve static files from frontend build (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // Catch all handler for React Router
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Initial Database status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});
