const mongoose = require('mongoose');

// Historical pattern schema — stores sample availability data for predictions
const historicalPatternSchema = new mongoose.Schema(
  {
    parkingId: {
      type: String,
      required: true,
    },
    dayType: {
      type: String,
      enum: ['Weekday', 'Weekend'],
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ['Morning', 'Midday', 'Evening'],
      required: true,
    },
    samples: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HistoricalPattern', historicalPatternSchema);
