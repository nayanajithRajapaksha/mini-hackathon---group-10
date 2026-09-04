const express = require('express');
const router = express.Router();
const ParkingUpdate = require('../models/ParkingUpdate');
const validateUpdate = require('../middleware/validateUpdate');
const calculateStatus = require('../utils/calculateStatus');

// POST /api/parking-updates — submit a new availability update
router.post('/', validateUpdate, async (req, res) => {
  try {
    const { parkingId, availableSpaces, observedAt, note } = req.body;
    const area = req.parkingArea; // attached by validateUpdate middleware

    // Save the update record
    await ParkingUpdate.create({
      parkingId: parkingId.trim(),
      availableSpaces: Number(availableSpaces),
      observedAt: new Date(observedAt),
      note: note ? note.trim() : '',
    });

    // Update the parking area with the latest values
    const newStatus = calculateStatus(Number(availableSpaces), area.totalSpaces);
    area.availableSpaces = Number(availableSpaces);
    area.status = newStatus;
    area.lastUpdated = new Date(observedAt);
    area.note = note ? note.trim() : '';
    await area.save();

    res.json({
      success: true,
      message: 'Thank you. The parking availability was updated successfully.',
      data: area,
    });
  } catch (error) {
    console.error('Error saving parking update:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to save the update. Please try again later.',
    });
  }
});

module.exports = router;
