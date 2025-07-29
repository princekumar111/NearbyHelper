const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const ServiceProvider = require('../models/ServiceProvider');
const { sendBookingStatusNotification } = require('../services/notificationService');
const auth = require('../middleware/authMiddleware');
const Review = require('../models/Review');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private (User only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ msg: 'Only users can book services' });
    }

    const { providerId, date, description } = req.body;

    if (!req.user?.id) {
      console.error('req.user.id is missing:', req.user);
      return res.status(400).json({ msg: 'User ID is missing in token' });
    }

    // Step 1: Get provider & category
    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    const category = provider.category;

    // Step 2: Get all active bookings for user
    const activeBookings = await Booking.find({
      userId: req.user.id,
      status: { $in: ['pending', 'confirmed'] }
    }).populate('providerId');

    // Step 3: Check if any of those bookings belong to the same category
    const hasBookingInSameCategory = activeBookings.some(
      (b) => b.providerId?.category === category
    );

    if (hasBookingInSameCategory) {
      return res.status(400).json({
        msg: `You already have a booking in the "${category}" category.`,
      });
    }

    // ✅ Booking is allowed
    const booking = new Booking({
      userId: req.user.id,
      providerId,
      date,
      description,
    });

    await booking.save();
    res.status(201).json({ msg: 'Booking created', booking });

  } catch (err) {
    console.error(' Booking error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});





router.get('/user', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ msg: 'Only users can view their bookings' });
    }

    const bookings = await Booking.find({ userId: req.user.id })
      .populate({
        path: 'providerId',
        populate: {
          path: 'userId',
          select: 'name email'
        },
        select: 'category location contact'
      })
      .populate('userId', 'name email');

    const enriched = await Promise.all(
      bookings.map(async (booking) => {
        const hasReview = await Review.exists({ booking: booking._id });
        const b = booking.toObject();

        return {
          _id: b._id,
          date: b.date,
          description: b.description,
          status: b.status,
          createdAt: b.createdAt,
          provider: {
            name: b.providerId?.userId?.name || 'Unknown',
            email: b.providerId?.userId?.email || '',
            category: b.providerId?.category,
            location: b.providerId?.location,
            contact: b.providerId?.contact
          },
          hasReview
        };
      })
    );

    res.json({ bookings: enriched });
  } catch (err) {
    console.error('❌ Error fetching user bookings:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});



// @route   GET /api/bookings/provider
// @desc    Get bookings received by the logged-in provider
// @access  Private (Provider only)
router.get('/provider', auth, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Only providers can view their bookings' });
    }

    // Find the service provider associated with this user
    const provider = await ServiceProvider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({ msg: 'Service provider profile not found' });
    }

    const bookings = await Booking.find({ providerId: provider._id })
      .populate('userId', 'name email')
      .populate('providerId', 'category location contact');

    if (bookings.length === 0) {
      return res.status(404).json({ msg: 'No bookings found for this provider' });
    }

    res.json({ bookings });
  } catch (err) {
    console.error('❌ Error fetching provider bookings:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// @route   PUT /api/bookings/:id/status
// @desc    Provider updates booking status (accept/reject/complete)
// @access  Private (Provider only)


router.put('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'completed', 'cancelled'];

  if (!allowed.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    booking.status = status.toLowerCase();
    await booking.save();

    res.json({ msg: 'Status updated', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});




// @route   DELETE /api/bookings/:id
// @desc    Cancel a booking by the user
// @access  Private (User only)
// @route   DELETE /api/bookings/:id
// @desc    Cancel a booking (user only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ msg: 'Only users can cancel bookings' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to cancel this booking' });
    }

    // 🟡 Soft-cancel: mark status as 'cancelled'
    booking.status = 'cancelled';
    await booking.save();

    // 🔔 Notify provider
    await Notification.create({
      userId: booking.providerId,
      message: `A booking scheduled on ${new Date(booking.date).toDateString()} was cancelled by the user.`,
    });

    res.json({ msg: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('❌ Error cancelling booking:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Get past bookings for the logged-in user
router.get('/user/history', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ msg: 'Only users can view their booking history' });
    }

    const currentDate = new Date();

    const bookings = await Booking.find({
      userId: req.user.id,
      date: { $lt: currentDate }  // Only past dates
    })
      .populate('providerId', 'category location contact')
      .populate('userId', 'name email');

    res.json({ bookings });
  } catch (err) {
    console.error('❌ Error fetching user booking history:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get past bookings for the logged-in provider
router.get('/provider/history', auth, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Only providers can view their booking history' });
    }

    const currentDate = new Date();

    const bookings = await Booking.find({
      providerId: req.user.providerId, // Ensure this is correctly set in auth middleware
      date: { $lt: currentDate }
    })
      .sort({ date: -1 }) // optional: latest first
      .populate('userId', 'name email')
      .populate('providerId', 'category location contact');
// console.log(bookings);
    res.json({ bookings });
  } catch (err) {
    console.error('❌ Error fetching provider booking history:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});







module.exports = router;
