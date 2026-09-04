const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const ParkingArea = require('../models/ParkingArea');
const HistoricalPattern = require('../models/HistoricalPattern');
const connectDB = require('../config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await ParkingArea.deleteMany();
    await HistoricalPattern.deleteMany();

    console.log('Cleared existing data.');

    // 1. Seed Users
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    // We create them using .create but remember our pre-save hook will hash again if we don't handle it
    // Wait, pre-save hook hashes the password, so we just pass plain text here
    
    const users = await User.create([
      { email: 'admin@parkingpulse.lk', password: 'password123', role: 'admin' },
      { email: 'worker@parkingpulse.lk', password: 'password123', role: 'worker' },
      { email: 'driver@parkingpulse.lk', password: 'password123', role: 'driver' },
    ]);

    console.log('Seeded Users.');

    // 2. Seed Parking Areas
    const parkingAreas = await ParkingArea.create([
      { name: 'KCC Main Parking', location: 'Dalada Veediya, Kandy', totalSpaces: 100, availableSpaces: 20 },
      { name: 'Bogambara Public Parking', location: 'Bogambara, Kandy', totalSpaces: 200, availableSpaces: 150 },
      { name: 'Lake Round Street Parking', location: 'Lake Round, Kandy', totalSpaces: 50, availableSpaces: 2 },
      { name: 'Getambe Temple Parking', location: 'Getambe, Peradeniya Road', totalSpaces: 80, availableSpaces: 15 },
    ]);

    console.log('Seeded Parking Areas.');

    // 3. Seed Historical Patterns (Just a few examples)
    const patterns = [];
    for (let area of parkingAreas) {
      for (let day = 0; day <= 6; day++) {
        // Just hour 8 and 17 for example
        patterns.push({
          areaId: area._id,
          dayOfWeek: day,
          hour: 8,
          averageAvailability: Math.floor(Math.random() * area.totalSpaces * 0.8) // random avg
        });
        patterns.push({
          areaId: area._id,
          dayOfWeek: day,
          hour: 17,
          averageAvailability: Math.floor(Math.random() * area.totalSpaces * 0.3) // usually fuller in evening
        });
      }
    }

    await HistoricalPattern.create(patterns);
    console.log('Seeded Historical Patterns.');

    console.log('Data seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
