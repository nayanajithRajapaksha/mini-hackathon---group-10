const express = require('express');
const router = express.Router();
const ParkingArea = require('../models/ParkingArea');
// GET /api/parking-areas — return all parking areas
router.get('/', async (req, res) => {
  try {
    const areas = await ParkingArea.find().sort({ parkingId: 1 });

    res.json({
      success: true,
      count: areas.length,
      data: areas,
    });
  } catch (error) {
    console.error('Error fetching parking areas:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to load parking areas. Please try again later.',
    });
  }
});

module.exports = router;
