const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/authMiddleware');

// GET /api/notifications - Get all notifications for the logged-in user
router.get('/', auth, async (req, res) => {
  console.log('Fetching notifications for user:', req.user.id);

  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
