const calculateStatus = require('./calculateStatus');

/**
 * Calculate predicted availability from historical sample data.
 * Returns the rounded average and predicted status.
 */
function calculatePrediction(samples, totalSpaces) {
  if (!samples || samples.length === 0) {
    return null;
  }

  // Calculate the average of all sample values
  const sum = samples.reduce((total, val) => total + val, 0);
  const average = sum / samples.length;
  const predictedSpaces = Math.round(average);

  // Calculate status using the predicted spaces
  const predictedStatus = calculateStatus(predictedSpaces, totalSpaces);

  return {
    predictedAvailableSpaces: predictedSpaces,
    predictedStatus,
    sampleCount: samples.length,
  };
}

module.exports = calculatePrediction;
