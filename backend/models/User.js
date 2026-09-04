const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'worker', 'driver'],
    default: 'driver',
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = crypto.createHash('sha256').update(this.password).digest('hex');
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  const enteredHash = crypto.createHash('sha256').update(enteredPassword).digest('hex');
  return enteredHash === this.password;
};

module.exports = mongoose.model('User', userSchema);
