const mongoose = require('mongoose');

// Parking update schema — records each submitted availability report
const parkingUpdateSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('ParkingUpdate', parkingUpdateSchema);
