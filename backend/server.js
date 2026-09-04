// Load environment variables before database connection
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const parkingRoutes = require('./routes/parkingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', parkingRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    message: 'ParkingPulse LK API is running',
    database: isConnected ? 'connected' : 'disconnected',
  });
});

// 404 handler for unknown API routes
app.use('/api/*path', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API route not found',
  });
});

// Start server only after database connection succeeds
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`ParkingPulse LK server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
