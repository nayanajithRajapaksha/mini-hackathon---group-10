const express = require('express');
const router = express.Router();
const ParkingArea = require('../models/ParkingArea');
const ParkingUpdate = require('../models/ParkingUpdate');
const HistoricalPattern = require('../models/HistoricalPattern');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// @desc    Get all parking areas
// @route   GET /api/parking-areas
// @access  Public
router.get('/parking-areas', async (req, res) => {
  try {
    const areas = await ParkingArea.find({}).sort({ name: 1 });
    res.json({
      status: 'success',
      data: areas
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// @desc    Submit a parking update
// @route   POST /api/parking-updates
// @access  Private (Worker, Admin)
router.post('/parking-updates', protect, authorizeRoles('worker', 'admin'), async (req, res) => {
  try {
    const { areaId, availableSpaces, note } = req.body;

    if (!areaId || availableSpaces === undefined) {
      return res.status(400).json({ status: 'error', message: 'Area ID and available spaces are required' });
    }

    const area = await ParkingArea.findById(areaId);
    if (!area) {
      return res.status(404).json({ status: 'error', message: 'Parking area not found' });
    }

    if (availableSpaces < 0 || availableSpaces > area.totalSpaces) {
      return res.status(400).json({ status: 'error', message: 'Invalid number of available spaces' });
    }

    // Create the update log
    const update = await ParkingUpdate.create({
      areaId,
      availableSpaces,
      note,
      reportedBy: req.user._id
    });

    // Update the actual parking area's current status
    area.availableSpaces = availableSpaces;
    await area.save();

    res.status(201).json({
      status: 'success',
      data: update
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// @desc    Get historical prediction
// @route   GET /api/predictions
// @access  Public
router.get('/predictions', async (req, res) => {
  try {
    const { areaId, dayOfWeek, hour } = req.query;

    if (!areaId || dayOfWeek === undefined || hour === undefined) {
      return res.status(400).json({ status: 'error', message: 'areaId, dayOfWeek, and hour are required' });
    }

    const pattern = await HistoricalPattern.findOne({
      areaId,
      dayOfWeek: parseInt(dayOfWeek),
      hour: parseInt(hour)
    });

    if (!pattern) {
      return res.status(404).json({ status: 'error', message: 'No prediction pattern found for this time' });
    }

    res.json({
      status: 'success',
      data: pattern
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
