const mongoose = require('mongoose');

// Parking area schema — stores each demo parking location
const parkingAreaSchema = new mongoose.Schema(
  {
    parkingId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    totalSpaces: {
      type: Number,
      required: true,
    },
    availableSpaces: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Available', 'Limited', 'Full'],
      default: 'Full',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ParkingArea', parkingAreaSchema);
