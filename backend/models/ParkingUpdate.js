const mongoose = require('mongoose');

const parkingUpdateSchema = new mongoose.Schema({
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingArea',
    required: true,
  },
  availableSpaces: {
    type: Number,
    required: true,
  },
  observationTime: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('ParkingUpdate', parkingUpdateSchema);
