/**
 * Calculate parking status based on available spaces and total capacity.
 * Returns: 'Available', 'Limited', or 'Full'
 */
function calculateStatus(availableSpaces, totalSpaces) {
  if (availableSpaces <= 0) {
    return 'Full';
  }

  if (availableSpaces / totalSpaces <= 0.25) {
    return 'Limited';
  }

  return 'Available';
}

module.exports = calculateStatus;
