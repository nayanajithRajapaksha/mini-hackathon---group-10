const express = require('express');
const User = require('../models/User');
const ParkingArea = require('../models/ParkingArea');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();
router.use(protect, authorizeRoles('admin'));

router.get('/users', async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ status: 'success', data: users });
});

router.post('/users', async (req, res) => {
  try {
    const { email, password, role = 'driver' } = req.body;
    if (!email || !password || !['admin', 'worker', 'driver'].includes(role)) {
      return res.status(400).json({ status: 'error', message: 'Valid email, password and role are required' });
    }
    const user = await User.create({ email, password, role });
    res.status(201).json({ status: 'success', data: { _id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.code === 11000 ? 'User already exists' : error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    if (req.body.email !== undefined) user.email = req.body.email;
    if (req.body.role !== undefined) user.role = req.body.role;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.json({ status: 'success', data: { _id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({ status: 'error', message: 'You cannot delete your own account' });
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
  await ParkingArea.updateMany({}, { $pull: { assignedWorkers: user._id } });
  res.json({ status: 'success', data: { id: user.id } });
});

module.exports = router;
