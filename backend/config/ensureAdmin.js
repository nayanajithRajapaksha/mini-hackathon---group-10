const User = require('../models/User');

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
  const existingWorker = await User.findOne({ email: workerEmail });

  if (!existingWorker && workerPassword) {
    await User.create({
      name: 'Kandy Parking Worker',
      email: workerEmail,
      password: workerPassword,
      role: 'worker',
    });
    console.log(`Created development worker account for ${workerEmail}`);
  }
}

module.exports = ensureAdmin;
