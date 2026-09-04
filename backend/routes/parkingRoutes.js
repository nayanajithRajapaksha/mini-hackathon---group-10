const express = require('express');
const router = express.Router();
const ParkingArea = require('../models/ParkingArea');
const ParkingUpdate = require('../models/ParkingUpdate');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// @desc    Get all parking areas
// @route   GET /api/parking-areas
// @access  Public
router.get('/parking-areas', protect, async (req, res) => {
  try {
    const query = req.user.role === 'worker' ? { assignedWorkers: req.user._id } : {};
    const areas = await ParkingArea.find(query).populate('assignedWorkers', 'name email role').sort({ name: 1 });
    res.json({
      status: 'success',
      data: areas
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/parking-areas', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, location, totalSpaces, availableSpaces, assignedWorkers = [] } = req.body;
    if (!name || !location || totalSpaces === undefined || availableSpaces === undefined) {
      return res.status(400).json({ status: 'error', message: 'All parking area fields are required' });
    }
    const area = await ParkingArea.create({ name, location, totalSpaces, availableSpaces, assignedWorkers });
    res.status(201).json({ status: 'success', data: area });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/parking-areas/:id', protect, authorizeRoles('admin', 'worker'), async (req, res) => {
  try {
    const area = await ParkingArea.findById(req.params.id);
    if (!area) return res.status(404).json({ status: 'error', message: 'Parking area not found' });
    
    if (req.user.role === 'worker' && !area.assignedWorkers.some(id => id.equals(req.user._id))) {
      return res.status(403).json({ status: 'error', message: 'You are not assigned to this parking area' });
    }

    const updatableFields = req.user.role === 'admin' 
      ? ['name', 'location', 'totalSpaces', 'availableSpaces', 'assignedWorkers', 'note']
      : ['availableSpaces', 'note'];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) area[field] = req.body[field];
    });
    
    await area.save();
    res.json({ status: 'success', data: area });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/parking-areas/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const area = await ParkingArea.findByIdAndDelete(req.params.id);
    if (!area) return res.status(404).json({ status: 'error', message: 'Parking area not found' });
    await ParkingUpdate.deleteMany({ areaId: area._id });
    res.json({ status: 'success', data: { id: area.id } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// @desc    Submit a parking update
// @route   POST /api/parking-updates
// @access  Private (Worker, Admin)
router.post('/parking-updates', protect, authorizeRoles('worker', 'admin'), async (req, res) => {
  try {
    const { areaId, availableSpaces, note } = req.body;

    if (!areaId || availableSpaces === undefined) {
      return res.status(400).json({ status: 'error', message: 'Area ID and available spaces are required' });
    }

    const area = await ParkingArea.findById(areaId);
    if (!area) {
      return res.status(404).json({ status: 'error', message: 'Parking area not found' });
    }

    if (req.user.role === 'worker' && !area.assignedWorkers.some((id) => id.equals(req.user._id))) {
      return res.status(403).json({ status: 'error', message: 'You are not assigned to this parking area' });
    }

    if (availableSpaces < 0 || availableSpaces > area.totalSpaces) {
      return res.status(400).json({ status: 'error', message: 'Invalid number of available spaces' });
    }

    // Create the update log
    const update = await ParkingUpdate.create({
      areaId,
      parkingId: area.parkingId,
      availableSpaces,
      observedAt: new Date(),
      note,
      reportedBy: req.user._id
    });

    // Update the actual parking area's current status
    area.availableSpaces = availableSpaces;
    area.note = note || '';
    await area.save();

    res.status(201).json({
      status: 'success',
      data: update
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/parking-updates', protect, authorizeRoles('worker', 'admin'), async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { reportedBy: req.user._id };
    const updates = await ParkingUpdate.find(query)
      .populate('areaId', 'name location totalSpaces')
      .populate('reportedBy', 'name email role')
      .sort({ observationTime: -1 });
    res.json({ status: 'success', data: updates });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/parking-updates/:id', protect, authorizeRoles('worker', 'admin'), async (req, res) => {
  try {
    const update = await ParkingUpdate.findById(req.params.id);
    if (!update) return res.status(404).json({ status: 'error', message: 'Update not found' });
    if (req.user.role !== 'admin' && update.reportedBy.toString() !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'You can only edit your own reports' });
    }

    const area = await ParkingArea.findById(req.body.areaId || update.areaId);
    const spaces = req.body.availableSpaces ?? update.availableSpaces;
    if (!area || spaces < 0 || spaces > area.totalSpaces) {
      return res.status(400).json({ status: 'error', message: 'Invalid parking area or available spaces' });
    }
    if (req.user.role === 'worker' && !area.assignedWorkers.some((id) => id.equals(req.user._id))) {
      return res.status(403).json({ status: 'error', message: 'You are not assigned to this parking area' });
    }
    update.areaId = area._id;
    update.parkingId = area.parkingId;
    update.availableSpaces = spaces;
    update.observedAt = new Date();
    if (req.body.note !== undefined) update.note = req.body.note;
    update.observationTime = new Date();
    await update.save();
    area.availableSpaces = spaces;
    area.note = update.note || '';
    await area.save();
    await update.populate('areaId', 'name location totalSpaces');
    res.json({ status: 'success', data: update });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/parking-updates/:id', protect, authorizeRoles('worker', 'admin'), async (req, res) => {
  try {
    const update = await ParkingUpdate.findById(req.params.id);
    if (!update) return res.status(404).json({ status: 'error', message: 'Update not found' });
    if (req.user.role !== 'admin' && update.reportedBy.toString() !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'You can only delete your own reports' });
    }
    await update.deleteOne();
    res.json({ status: 'success', data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
