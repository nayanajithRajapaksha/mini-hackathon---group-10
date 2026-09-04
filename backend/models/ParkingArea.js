const mongoose = require('mongoose');

const parkingAreaSchema = new mongoose.Schema({
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
  },
  status: {
    type: String,
    enum: ['Available', 'Limited', 'Full'],
    default: 'Available',
  }
}, { timestamps: true });

// Middleware to automatically update status based on available spaces
parkingAreaSchema.pre('save', function () {
  const percentage = (this.availableSpaces / this.totalSpaces) * 100;
  if (percentage <= 5) {
    this.status = 'Full';
  } else if (percentage <= 20) {
    this.status = 'Limited';
  } else {
    this.status = 'Available';
  }
});

module.exports = mongoose.model('ParkingArea', parkingAreaSchema);
