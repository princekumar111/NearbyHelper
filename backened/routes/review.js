const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authMiddleware');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

// ✅ Create review (only after booking is completed)
// Create review (Only after booking is completed)
router.post('/', checkAuth, async (req, res) => {
  const { providerId, rating, comment, bookingId } = req.body;
  // console.log('📥 Review POST by user:', req.user.id);

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    // console.log('🧾 Booking.userId:', booking.userId?.toString());
    // console.log('🔐 Authenticated user:', req.user.id);

    if (booking.status !== 'completed') {
      return res.status(400).json({ msg: 'Review allowed only after completed booking' });
    }

    if (booking.userId.toString() !== req.user.id.toString()) {
  return res.status(403).json({ msg: 'You can only review your own bookings' });
}


    const existing = await Review.findOne({ booking: bookingId });
    if (existing) {
      return res.status(400).json({ msg: 'You already submitted a review for this booking' });
    }

    const review = new Review({
      user: req.user.id,
      provider: providerId,
      rating,
      comment,
      booking: bookingId
    });

    await review.save();
    res.status(201).json({ msg: 'Review submitted successfully', review });
  } catch (err) {
    console.error('❌ Server error submitting review:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});


// ✅ Get all reviews for a provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.providerId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
