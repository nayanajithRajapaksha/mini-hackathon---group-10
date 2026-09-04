const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../models/User');
const ParkingArea = require('../models/ParkingArea');
const connectDB = require('../config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await ParkingArea.deleteMany();

    console.log('Cleared existing data.');

    // 1. Seed Users
    const users = await User.create([
      { email: 'admin@parkingpulse.lk', password: 'password123', role: 'admin' },
      { email: 'worker@parkingpulse.lk', password: 'password123', role: 'worker' },
      { email: 'driver@parkingpulse.lk', password: 'password123', role: 'driver' },
    ]);

    console.log('Seeded Users.');

    // 2. Seed Parking Areas
    await ParkingArea.create([
      { parkingId: 'P001', name: 'KCC Main Parking', location: 'Dalada Veediya, Kandy', totalSpaces: 100, availableSpaces: 20, assignedWorkers: [users[1]._id] },
      { parkingId: 'P002', name: 'Bogambara Public Parking', location: 'Bogambara, Kandy', totalSpaces: 200, availableSpaces: 150, assignedWorkers: [users[1]._id] },
      { parkingId: 'P003', name: 'Lake Round Street Parking', location: 'Lake Round, Kandy', totalSpaces: 50, availableSpaces: 2 },
      { parkingId: 'P004', name: 'Getambe Temple Parking', location: 'Getambe, Peradeniya Road', totalSpaces: 80, availableSpaces: 15 },
    ]);

    console.log('Seeded Parking Areas.');

    console.log('Data seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
