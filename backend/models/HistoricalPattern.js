const mongoose = require('mongoose');

const historicalPatternSchema = new mongoose.Schema({
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
  // Keep Member 4's fields for compatibility if they use it
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingArea',
    required: false,
  },
  dayOfWeek: {
    type: Number, // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    required: false,
    min: 0,
    max: 6,
  },
  hour: {
    type: Number, // 0 to 23
    required: false,
    min: 0,
    max: 23,
  },
  averageAvailability: {
    type: Number, // percentage or count
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('HistoricalPattern', historicalPatternSchema);
