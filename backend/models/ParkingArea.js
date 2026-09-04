const mongoose = require('mongoose');

const parkingAreaSchema = new mongoose.Schema({
  parkingId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
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
    min: 0,
  },
  status: {
    type: String,
    enum: ['Available', 'Limited', 'Full'],
    default: 'Available',
  },
  assignedWorkers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    default: '',
  }
}, { timestamps: true });

// Middleware to automatically update status based on available spaces
parkingAreaSchema.pre('save', function () {
  if (this.totalSpaces < 1 || this.availableSpaces > this.totalSpaces) {
    throw new Error('Available spaces must be between 0 and total spaces');
  }
  const percentage = (this.availableSpaces / this.totalSpaces) * 100;
  if (percentage <= 5) {
    this.status = 'Full';
  } else if (percentage <= 20) {
    this.status = 'Limited';
  } else {
    this.status = 'Available';
  }
  if (this.isModified('availableSpaces')) this.lastUpdated = new Date();
});

module.exports = mongoose.model('ParkingArea', parkingAreaSchema);
