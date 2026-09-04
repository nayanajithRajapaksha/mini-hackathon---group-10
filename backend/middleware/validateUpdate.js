const ParkingArea = require('../models/ParkingArea');

/**
 * Server-side validation middleware for parking availability updates.
 * Validates parkingId, availableSpaces, observedAt, and note fields.
 */
async function validateUpdate(req, res, next) {
  const { parkingId, availableSpaces, observedAt, note } = req.body;
  const errors = {};

  // Validate parking area exists
  if (!parkingId || typeof parkingId !== 'string' || parkingId.trim() === '') {
    errors.parkingId = 'Please select a parking area.';
  }

  // Look up the parking area to get its real capacity
  let area = null;
  if (!errors.parkingId) {
    area = await ParkingArea.findOne({ parkingId: parkingId.trim() });
    if (!area) {
      errors.parkingId = 'The selected parking area was not found.';
    }
  }

  // Validate available spaces — must be a whole number within capacity
  if (availableSpaces === undefined || availableSpaces === null || availableSpaces === '') {
    errors.availableSpaces = 'Please enter the number of available spaces.';
  } else {
    const num = Number(availableSpaces);
    if (!Number.isInteger(num) || num < 0) {
      errors.availableSpaces = 'Available spaces must be a whole number of 0 or more.';
    } else if (area && num > area.totalSpaces) {
      errors.availableSpaces = `Available spaces cannot be more than ${area.totalSpaces}.`;
    }
  }

  // Validate observation date and time
  if (!observedAt) {
    errors.observedAt = 'Please enter the observation date and time.';
  } else {
    const observedDate = new Date(observedAt);
    if (isNaN(observedDate.getTime())) {
      errors.observedAt = 'Please enter a valid date and time.';
    } else if (observedDate > new Date()) {
      errors.observedAt = 'Observation time cannot be in the future.';
    }
  }

  // Validate note — optional but max 120 characters
  if (note && typeof note === 'string' && note.trim().length > 120) {
    errors.note = 'Please keep the note under 120 characters.';
  }

  // If any errors, return 400 with error details
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted information.',
      errors,
    });
  }

  // Attach the found area to the request for the route handler
  req.parkingArea = area;
  next();
}

module.exports = validateUpdate;
