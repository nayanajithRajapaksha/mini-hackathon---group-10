const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ParkingPulse LK API is running',
  });
});

// 404 handler for unknown API routes
app.use('/api/*path', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API route not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`ParkingPulse LK server running on port ${PORT}`);
});
