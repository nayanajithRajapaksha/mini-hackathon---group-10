const User = require('../models/User');
const ParkingArea = require('../models/ParkingArea');

async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@parkingpulse.lk').toLowerCase();
  let admin = await User.findOne({ email });

  if (admin && admin.role !== 'admin') {
    admin.role = 'admin';
    await admin.save();
    console.log(`Corrected administrator role for ${email}`);
  }

  if (!admin) {
    const password = process.env.ADMIN_PASSWORD ||
      (process.env.NODE_ENV !== 'production' ? 'password123' : null);

    if (!password) {
      console.warn('No administrator exists. Set ADMIN_EMAIL and ADMIN_PASSWORD to create one.');
      return;
    }

    admin = await User.create({ name: 'System Administrator', email, password, role: 'admin' });
    console.log(`Created administrator account for ${admin.email}`);
  }

  const workerEmail = (process.env.WORKER_EMAIL || 'worker@parkingpulse.lk').toLowerCase();
  const workerPassword = process.env.WORKER_PASSWORD ||
    (process.env.NODE_ENV !== 'production' ? 'password123' : null);
  let worker = await User.findOne({ email: workerEmail });

  if (!worker && workerPassword) {
    worker = await User.create({
      name: 'Kandy Parking Worker',
      email: workerEmail,
      password: workerPassword,
      role: 'worker',
    });
    console.log(`Created development worker account for ${workerEmail}`);
  }

  if (await ParkingArea.countDocuments() === 0) {
    await ParkingArea.create([
      { parkingId: 'P001', name: 'KCC Main Parking', location: 'Dalada Veediya, Kandy', totalSpaces: 100, availableSpaces: 20, assignedWorkers: worker ? [worker._id] : [] },
      { parkingId: 'P002', name: 'Bogambara Public Parking', location: 'Bogambara, Kandy', totalSpaces: 200, availableSpaces: 150 },
      { parkingId: 'P003', name: 'Lake Round Street Parking', location: 'Lake Round, Kandy', totalSpaces: 50, availableSpaces: 2 },
      { parkingId: 'P004', name: 'Getambe Temple Parking', location: 'Getambe, Peradeniya Road', totalSpaces: 80, availableSpaces: 15 },
    ]);
    console.log('Created default parking areas because the collection was empty');
  }
}

module.exports = ensureAdmin;
