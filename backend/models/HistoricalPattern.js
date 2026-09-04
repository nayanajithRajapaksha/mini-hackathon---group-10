const mongoose = require('mongoose');

const historicalPatternSchema = new mongoose.Schema({
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingArea',
    required: true,
  },
  dayOfWeek: {
    type: Number, // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    required: true,
    min: 0,
    max: 6,
  },
  hour: {
    type: Number, // 0 to 23
    required: true,
    min: 0,
    max: 23,
  },
  averageAvailability: {
    type: Number, // percentage or count
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('HistoricalPattern', historicalPatternSchema);
