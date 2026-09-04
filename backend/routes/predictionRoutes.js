const express = require('express');
const router = express.Router();
const ParkingArea = require('../models/ParkingArea');
const HistoricalPattern = require('../models/HistoricalPattern');
const calculatePrediction = require('../utils/calculatePrediction');

// GET /api/predictions — predict availability from historical patterns
router.get('/', async (req, res) => {
  try {
    const { parkingId, dayType, timeSlot } = req.query;
    const errors = {};

    // Validate required query parameters
    if (!parkingId) errors.parkingId = 'Please select a parking area.';
    if (!dayType || !['Weekday', 'Weekend'].includes(dayType)) {
      errors.dayType = 'Please select a day type.';
    }
    if (!timeSlot || !['Morning', 'Midday', 'Evening'].includes(timeSlot)) {
      errors.timeSlot = 'Please select a time period.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Check the parking area exists
    const area = await ParkingArea.findOne({ parkingId });
    if (!area) {
      return res.status(400).json({
        success: false,
        message: 'The selected parking area was not found.',
      });
    }

    // Find matching historical pattern
    const pattern = await HistoricalPattern.findOne({ parkingId, dayType, timeSlot });
    if (!pattern || !pattern.samples || pattern.samples.length === 0) {
      return res.json({
        success: true,
        data: null,
        message: 'No historical data is available for the selected combination.',
      });
    }

    // Calculate prediction from samples
    const prediction = calculatePrediction(pattern.samples, area.totalSpaces);

    res.json({
      success: true,
      data: {
        parkingId: area.parkingId,
        parkingName: area.name,
        dayType,
        timeSlot,
        predictedAvailableSpaces: prediction.predictedAvailableSpaces,
        predictedStatus: prediction.predictedStatus,
        sampleCount: prediction.sampleCount,
      },
    });
  } catch (error) {
    console.error('Error generating prediction:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to generate prediction. Please try again later.',
    });
  }
});

module.exports = router;
