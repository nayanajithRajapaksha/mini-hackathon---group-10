const mongoose = require('mongoose');

const parkingUpdateSchema = new mongoose.Schema({
  parkingId: {
    type: String,
    required: true,
  },
  availableSpaces: {
    type: Number,
    required: true,
  },
  observedAt: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  // Keep Member 4's fields
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingArea',
    required: false,
  },
  observationTime: {
    type: Date,
    default: Date.now,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('ParkingUpdate', parkingUpdateSchema);
