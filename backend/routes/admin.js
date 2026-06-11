const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/checkAdmin');
const ServiceProvider = require('../models/ServiceProvider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '12345'; 

// ✅ Admin Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin
    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    console.error(' Admin Register Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Admin Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(401).json({ msg: 'Admin not found or not authorized' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      msg: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Admin Login Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ View all users
router.get('/users',checkAuth,checkAdmin, async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users)
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.get('/providers', checkAuth, checkAdmin, async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" });
    // console.log(providers);
    res.json(providers);
  } catch (err) {
    console.error('Error fetching providers:', err);
    res.status(500).json({ message: 'Failed to fetch providers' });
  }
});

router.delete('/providers/:id', checkAuth, checkAdmin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id);

    res.json({ message: 'Provider marked as deleted (soft delete)' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to soft delete provider' });
  }
});




// ✅ View all bookings
router.get('/bookings', checkAuth, checkAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('providerId', 'name email');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});


// ✅ Delete user
router.delete('/users/:id', checkAuth, checkAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// ✅ Booking trend analytics
router.get('/analytics/bookings-per-day', checkAuth, checkAdmin, async (req, res) => {
  const data = await Booking.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  res.json(data);
});

// ✅ Approve/Reject Provider
router.put('/providers/:id/status', checkAuth, checkAdmin, async (req, res) => {
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status. Choose "approved" or "rejected".' });
  }

  try {
    const provider = await ServiceProvider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    provider.status = status;
    await provider.save();

    res.json({ msg: `Provider status updated to ${status}`, provider });
  } catch (err) {
    console.error(' Error updating provider status:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.get('/stats', checkAuth, checkAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await User.countDocuments({ role: 'provider' });
    const pendingProviders = await ServiceProvider.countDocuments({ status: 'pending' });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    res.json({
      totalUsers,
      totalProviders,
      pendingProviders,
      totalBookings,
      pendingBookings,
      completedBookings,
    });
  } catch (err) {
    console.error('❌ Error fetching admin stats:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete by setting isDeleted: true
    await ServiceProvider.findByIdAndUpdate(id, { isDeleted: true });

    res.status(200).json({ message: 'Provider marked as deleted (soft delete)' });
  } catch (err) {
    console.error('Error soft deleting provider:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
