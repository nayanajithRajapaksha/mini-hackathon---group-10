/**
 * Validate the parking availability update form on the client side.
 * Returns { isValid, errors } where errors is an object of field messages.
 */
export function validateUpdate(formData, totalSpaces) {
  const errors = {};

  // Parking area is required
  if (!formData.parkingId || formData.parkingId.trim() === '') {
    errors.parkingId = 'Please select a parking area.';
  }

  // Available spaces — required, whole number, 0 to totalSpaces
  const spacesStr = String(formData.availableSpaces).trim();
  if (spacesStr === '') {
    errors.availableSpaces = 'Please enter the number of available spaces.';
  } else {
    const num = Number(spacesStr);
    if (isNaN(num) || !Number.isInteger(num) || num < 0) {
      errors.availableSpaces = `Enter a whole number between 0 and ${totalSpaces}.`;
    } else if (num > totalSpaces) {
      errors.availableSpaces = `Enter a whole number between 0 and ${totalSpaces}.`;
    }
  }

  // Observation date and time is required and cannot be in the future
  if (!formData.observedAt || formData.observedAt.trim() === '') {
    errors.observedAt = 'Please enter the observation date and time.';
  } else {
    const observedDate = new Date(formData.observedAt);
    if (isNaN(observedDate.getTime())) {
      errors.observedAt = 'Please enter a valid date and time.';
    } else if (observedDate > new Date()) {
      errors.observedAt = 'Observation time cannot be in the future.';
    }
  }

  // Note is optional but max 120 characters
  if (formData.note && formData.note.trim().length > 120) {
    errors.note = 'Please keep the note under 120 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
