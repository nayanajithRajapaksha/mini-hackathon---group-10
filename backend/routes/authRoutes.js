const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Generate Mock JWT using base64 encoding (hackathon simplified)
const generateToken = (id) => {
  return Buffer.from(JSON.stringify({ id })).toString('base64');
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ status: 'error', message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role: 'driver',
    });

    if (user) {
      res.status(201).json({
        status: 'success',
        data: {
          _id: user.id,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        }
      });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        status: 'success',
        data: {
          _id: user.id,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        }
      });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, async (req, res) => {
  res.json({ status: 'success', data: req.user });
});

module.exports = router;
