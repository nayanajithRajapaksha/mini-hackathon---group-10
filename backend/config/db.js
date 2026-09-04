const mongoose = require('mongoose');

// Connect to MongoDB database
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Sanitize error message to avoid exposing any credentials or connection string
    const safeError = error && error.message
      ? error.message.replace(/:\/\/.*@/, '://<credentials>@')
      : 'Connection error';
    throw new Error(`Database connection failed: ${safeError}`);
  }
};

module.exports = connectDB;
