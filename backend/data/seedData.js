const ParkingArea = require('../models/ParkingArea');
const HistoricalPattern = require('../models/HistoricalPattern');

// Four demo parking areas in Kandy city centre
const parkingAreas = [
  {
    parkingId: 'P001',
    name: 'KCC Demo Parking Area A',
    location: 'Dalada Veediya area, Kandy',
    totalSpaces: 20,
    availableSpaces: 8,
    status: 'Available',
    lastUpdated: new Date('2026-09-04T08:15:00.000Z'),
    note: 'Spaces reported near the main entrance.',
  },
  {
    parkingId: 'P002',
    name: 'Municipal Demo Parking Area B',
    location: 'Municipal Council area, Kandy',
    totalSpaces: 24,
    availableSpaces: 0,
    status: 'Full',
    lastUpdated: new Date('2026-09-04T07:45:00.000Z'),
    note: 'All spaces occupied during morning rush.',
  },
  {
    parkingId: 'P003',
    name: 'Bogambara Demo Parking Area C',
    location: 'Bogambara area, Kandy',
    totalSpaces: 20,
    availableSpaces: 2,
    status: 'Limited',
    lastUpdated: new Date('2026-09-04T08:00:00.000Z'),
    note: 'Only a few spaces left near the exit.',
  },
  {
    parkingId: 'P004',
    name: 'Clock Tower Demo Parking Area D',
    location: 'Clock Tower area, Kandy',
    totalSpaces: 18,
    availableSpaces: 6,
    status: 'Available',
    lastUpdated: new Date('2026-09-04T07:30:00.000Z'),
    note: 'Spaces available on the upper level.',
  },
];

// Historical sample patterns for predictions (4 samples each)
const historicalPatterns = [
  // P001 — KCC Demo Parking Area A (total: 20)
  { parkingId: 'P001', dayType: 'Weekday', timeSlot: 'Morning', samples: [7, 9, 8, 10] },
  { parkingId: 'P001', dayType: 'Weekday', timeSlot: 'Midday', samples: [3, 4, 2, 5] },
  { parkingId: 'P001', dayType: 'Weekday', timeSlot: 'Evening', samples: [6, 8, 7, 5] },
  { parkingId: 'P001', dayType: 'Weekend', timeSlot: 'Morning', samples: [12, 14, 11, 13] },
  { parkingId: 'P001', dayType: 'Weekend', timeSlot: 'Midday', samples: [5, 6, 4, 7] },
  { parkingId: 'P001', dayType: 'Weekend', timeSlot: 'Evening', samples: [9, 10, 8, 11] },

  // P002 — Municipal Demo Parking Area B (total: 24)
  { parkingId: 'P002', dayType: 'Weekday', timeSlot: 'Morning', samples: [2, 3, 1, 4] },
  { parkingId: 'P002', dayType: 'Weekday', timeSlot: 'Midday', samples: [0, 1, 0, 2] },
  { parkingId: 'P002', dayType: 'Weekday', timeSlot: 'Evening', samples: [5, 4, 6, 3] },
  { parkingId: 'P002', dayType: 'Weekend', timeSlot: 'Morning', samples: [10, 8, 12, 9] },
  { parkingId: 'P002', dayType: 'Weekend', timeSlot: 'Midday', samples: [3, 4, 2, 5] },
  { parkingId: 'P002', dayType: 'Weekend', timeSlot: 'Evening', samples: [7, 8, 6, 9] },

  // P003 — Bogambara Demo Parking Area C (total: 20)
  { parkingId: 'P003', dayType: 'Weekday', timeSlot: 'Morning', samples: [5, 6, 4, 7] },
  { parkingId: 'P003', dayType: 'Weekday', timeSlot: 'Midday', samples: [1, 2, 0, 3] },
  { parkingId: 'P003', dayType: 'Weekday', timeSlot: 'Evening', samples: [4, 5, 3, 6] },
  { parkingId: 'P003', dayType: 'Weekend', timeSlot: 'Morning', samples: [8, 10, 9, 7] },
  { parkingId: 'P003', dayType: 'Weekend', timeSlot: 'Midday', samples: [2, 3, 1, 4] },
  { parkingId: 'P003', dayType: 'Weekend', timeSlot: 'Evening', samples: [6, 7, 5, 8] },

  // P004 — Clock Tower Demo Parking Area D (total: 18)
  { parkingId: 'P004', dayType: 'Weekday', timeSlot: 'Morning', samples: [6, 7, 5, 8] },
  { parkingId: 'P004', dayType: 'Weekday', timeSlot: 'Midday', samples: [2, 3, 1, 4] },
  { parkingId: 'P004', dayType: 'Weekday', timeSlot: 'Evening', samples: [5, 6, 4, 7] },
  { parkingId: 'P004', dayType: 'Weekend', timeSlot: 'Morning', samples: [10, 11, 9, 12] },
  { parkingId: 'P004', dayType: 'Weekend', timeSlot: 'Midday', samples: [4, 5, 3, 6] },
  { parkingId: 'P004', dayType: 'Weekend', timeSlot: 'Evening', samples: [7, 8, 6, 9] },
];

/**
 * Seed the database with sample data only if collections are empty.
 * This prevents duplicates after server restarts.
 */
async function seedDatabase() {
  try {
    // Check if parking areas already exist
    const areaCount = await ParkingArea.countDocuments();
    if (areaCount === 0) {
      await ParkingArea.insertMany(parkingAreas);
      console.log('Seeded parking areas: 4 demo records');
    } else {
      console.log(`Parking areas already exist (${areaCount} records) — skipping seed`);
    }

    // Check if historical patterns already exist
    const patternCount = await HistoricalPattern.countDocuments();
    if (patternCount === 0) {
      await HistoricalPattern.insertMany(historicalPatterns);
      console.log('Seeded historical patterns: 24 demo records');
    } else {
      console.log(`Historical patterns already exist (${patternCount} records) — skipping seed`);
    }
  } catch (error) {
    console.error('Seed data error:', error.message);
  }
}

module.exports = seedDatabase;
