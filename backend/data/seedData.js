const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const ParkingArea = require('../models/ParkingArea');
const HistoricalPattern = require('../models/HistoricalPattern');
const connectDB = require('../config/db');

dotenv.config();

// Member 3's Historical sample patterns for predictions (4 samples each)
const historicalPatternsData = [
  // P001
  { parkingId: 'P001', dayType: 'Weekday', timeSlot: 'Morning', samples: [7, 9, 8, 10] },
  { parkingId: 'P001', dayType: 'Weekday', timeSlot: 'Midday', samples: [3, 4, 2, 5] },
  { parkingId: 'P001', dayType: 'Weekday', timeSlot: 'Evening', samples: [6, 8, 7, 5] },
  { parkingId: 'P001', dayType: 'Weekend', timeSlot: 'Morning', samples: [12, 14, 11, 13] },
  { parkingId: 'P001', dayType: 'Weekend', timeSlot: 'Midday', samples: [5, 6, 4, 7] },
  { parkingId: 'P001', dayType: 'Weekend', timeSlot: 'Evening', samples: [9, 10, 8, 11] },

  // P002
  { parkingId: 'P002', dayType: 'Weekday', timeSlot: 'Morning', samples: [2, 3, 1, 4] },
  { parkingId: 'P002', dayType: 'Weekday', timeSlot: 'Midday', samples: [0, 1, 0, 2] },
  { parkingId: 'P002', dayType: 'Weekday', timeSlot: 'Evening', samples: [5, 4, 6, 3] },
  { parkingId: 'P002', dayType: 'Weekend', timeSlot: 'Morning', samples: [10, 8, 12, 9] },
  { parkingId: 'P002', dayType: 'Weekend', timeSlot: 'Midday', samples: [3, 4, 2, 5] },
  { parkingId: 'P002', dayType: 'Weekend', timeSlot: 'Evening', samples: [7, 8, 6, 9] },

  // P003
  { parkingId: 'P003', dayType: 'Weekday', timeSlot: 'Morning', samples: [5, 6, 4, 7] },
  { parkingId: 'P003', dayType: 'Weekday', timeSlot: 'Midday', samples: [1, 2, 0, 3] },
  { parkingId: 'P003', dayType: 'Weekday', timeSlot: 'Evening', samples: [4, 5, 3, 6] },
  { parkingId: 'P003', dayType: 'Weekend', timeSlot: 'Morning', samples: [8, 10, 9, 7] },
  { parkingId: 'P003', dayType: 'Weekend', timeSlot: 'Midday', samples: [2, 3, 1, 4] },
  { parkingId: 'P003', dayType: 'Weekend', timeSlot: 'Evening', samples: [6, 7, 5, 8] },

  // P004
  { parkingId: 'P004', dayType: 'Weekday', timeSlot: 'Morning', samples: [6, 7, 5, 8] },
  { parkingId: 'P004', dayType: 'Weekday', timeSlot: 'Midday', samples: [2, 3, 1, 4] },
  { parkingId: 'P004', dayType: 'Weekday', timeSlot: 'Evening', samples: [5, 6, 4, 7] },
  { parkingId: 'P004', dayType: 'Weekend', timeSlot: 'Morning', samples: [10, 11, 9, 12] },
  { parkingId: 'P004', dayType: 'Weekend', timeSlot: 'Midday', samples: [4, 5, 3, 6] },
  { parkingId: 'P004', dayType: 'Weekend', timeSlot: 'Evening', samples: [7, 8, 6, 9] },
];

const seedData = async () => {
  try {
    // connectDB() is handled outside or we connect directly
    const uri = process.env.MONGODB_URI;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
    }

    // Clear existing data
    await User.deleteMany();
    await ParkingArea.deleteMany();
    await HistoricalPattern.deleteMany();

    console.log('Cleared existing data.');

    // 1. Seed Users
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    const users = await User.create([
      { email: 'admin@parkingpulse.lk', password: 'password123', role: 'admin' },
      { email: 'worker@parkingpulse.lk', password: 'password123', role: 'worker' },
      { email: 'driver@parkingpulse.lk', password: 'password123', role: 'driver' },
    ]);

    console.log('Seeded Users.');

    // 2. Seed Parking Areas (with Member 3's required parkingId)
    const parkingAreas = await ParkingArea.create([
      { parkingId: 'P001', name: 'KCC Main Parking', location: 'Dalada Veediya, Kandy', totalSpaces: 100, availableSpaces: 20 },
      { parkingId: 'P002', name: 'Bogambara Public Parking', location: 'Bogambara, Kandy', totalSpaces: 200, availableSpaces: 150 },
      { parkingId: 'P003', name: 'Lake Round Street Parking', location: 'Lake Round, Kandy', totalSpaces: 50, availableSpaces: 2 },
      { parkingId: 'P004', name: 'Getambe Temple Parking', location: 'Getambe, Peradeniya Road', totalSpaces: 80, availableSpaces: 15 },
    ]);

    console.log('Seeded Parking Areas.');

    // 3. Seed Historical Patterns
    const patterns = [];
    for (let area of parkingAreas) {
      for (let day = 0; day <= 6; day++) {
        patterns.push({
          parkingId: area.parkingId,
          dayType: day === 0 || day === 6 ? 'Weekend' : 'Weekday',
          timeSlot: 'Morning',
          samples: [1, 2, 3],
          areaId: area._id,
          dayOfWeek: day,
          hour: 8,
          averageAvailability: Math.floor(Math.random() * area.totalSpaces * 0.8)
        });
        patterns.push({
          parkingId: area.parkingId,
          dayType: day === 0 || day === 6 ? 'Weekend' : 'Weekday',
          timeSlot: 'Evening',
          samples: [1, 2, 3],
          areaId: area._id,
          dayOfWeek: day,
          hour: 17,
          averageAvailability: Math.floor(Math.random() * area.totalSpaces * 0.3)
        });
      }
    }
    
    // Add Member 3's historical patterns directly
    await HistoricalPattern.insertMany(historicalPatternsData);
    await HistoricalPattern.insertMany(patterns);

    console.log('Seeded Historical Patterns.');

    console.log('Data seeding completed successfully!');
    if (require.main === module) {
      process.exit();
    }
  } catch (error) {
    console.error('Error seeding data:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

module.exports = seedData;
