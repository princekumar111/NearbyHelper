const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/authMiddleware');
const ServiceProvider = require('../models/ServiceProvider');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Review = require('../models/Review');
const upload = require('../middleware/multer');

const Provider = ServiceProvider;

// ✅ Create or Update Provider (Upsert)
router.post('/upsert', auth, async (req, res) => {
  console.log('🧾 req.user in /upsert:', req.user);

  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { category, location, availability, contact } = req.body;
    let existing = await Provider.findOne({ userId: req.user.id });

    if (existing) {
      existing.category = category;
      existing.location = location;
      existing.availability = availability;
      existing.contact = contact;
      await existing.save();
      return res.json({ msg: 'Provider updated', provider: existing });
    }

    const newProvider = new Provider({
      userId: req.user.id,
      category,
      location,
      availability,
      contact,
    });

    await newProvider.save();
    return res.status(201).json({ msg: 'Provider created', provider: newProvider });
  } catch (err) {
    console.error('❌ Error in /upsert:', err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all providers (with optional filters)
router.get('/', async (req, res) => {
  let { category, location } = req.query;
  category = category ? category.trim() : '';
  location = location ? location.trim() : '';

  const filter = {};
  if (category) filter.category = category;
  if (location) filter.location = location;

  try {
    const providers = await Provider.find(filter);
    res.json(providers);
  } catch (err) {
    console.error("Error fetching providers:", err);
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Update Provider by ID
router.put('/update/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { category, location, availability, contact } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid provider ID' });
    }

    const updated = await Provider.findByIdAndUpdate(
      req.params.id,
      { category, location, availability, contact },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    res.json({ msg: 'Provider updated successfully', provider: updated });
  } catch (err) {
    console.error('❌ Update error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// routes/providers.js or similar

router.put("/profile", auth, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const {
      name,
      location,
      contact,
      bio,
      category,
      availability,
    } = req.body;

    // 1. Update name in User model
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.name = name || user.name;
    await user.save();

    // 2. Update provider profile
    const provider = await Provider.findOne({ userId: req.user.id });
    if (!provider) return res.status(404).json({ msg: "Provider not found" });

    provider.location = location || provider.location;
    provider.contact = contact || provider.contact;
    provider.bio = bio || provider.bio;
    provider.category = category || provider.category;
    provider.availability =
      typeof availability === "boolean" ? availability : provider.availability;

    await provider.save();

    // 3. Send updated merged data
    const updatedProfile = {
      name: user.name,
      email: user.email,
      location: provider.location,
      contact: provider.contact,
      bio: provider.bio,
      category: provider.category,
      availability: provider.availability,
      image: provider.image || "",
    };

    res.json(updatedProfile);
  } catch (err) {
    console.error("❌ Profile update error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Delete Provider by ID
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid provider ID' });
    }

    const deleted = await Provider.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    res.json({ msg: 'Provider deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Search providers
router.get('/search', async (req, res) => {
  const { location, category, available } = req.query;

  const filter = {};
  if (location) filter.location = new RegExp(location, 'i');
  if (category) filter.category = new RegExp(category, 'i');
  if (available !== undefined) filter.available = available === 'true';

  try {
    const providers = await Provider.find(filter).populate('userId', '-password');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Profile route
// router.get('/profile', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'provider') {
//       return res.status(403).json({ msg: 'Only providers can view this' });
//     }

//     const provider = await Provider.findOne({ userId: req.user.id }).populate('userId', 'name email');
//     if (!provider) return res.status(404).json({ msg: 'Provider not found' });

//     res.json({
//       ...provider.toObject(),
//       name: provider.userId.name,
//       email: provider.userId.email,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

router.get("/profile", auth, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const user = await User.findById(req.user.id).select("name email");
    const provider = await Provider.findOne({ userId: req.user.id });

    if (!user || !provider) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      location: provider.location,
      contact: provider.contact,
      bio: provider.bio,
      category: provider.category,
      availability: provider.availability,
      image: provider.image || "",
    });
  } catch (err) {
    console.error("❌ Profile fetch error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});



// ✅ Get upcoming bookings for a provider
router.get('/dashboard/upcoming', auth, async (req, res) => {
  try {
    // 🔒 Ensure the user is a provider
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Only providers can access this data' });
    }

    // 🔍 Find provider record for the logged-in user
    const provider = await ServiceProvider.findOne({ userId: req.user.id });

    if (!provider) {
      console.warn('❌ No service provider found for user:', req.user.id);
      return res.status(404).json({ msg: 'Provider not found' });
    }

    // 🕒 Set today's date at 00:00 to filter only future bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensures we compare from the beginning of the day

    // 📅 Find bookings for this provider
    const upcomingBookings = await Booking.find({
      providerId: provider._id,
      status: { $in: ['pending', 'confirmed'] },
      date: { $gte: today }  // Only future dates
    }).populate('userId', 'name email');

    // console.log('✅ Upcoming bookings:', upcomingBookings);

    res.json({ upcomingBookings });
  } catch (err) {
    console.error('❌ Error fetching upcoming bookings:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
// ✅ Get past bookings for a provider
router.get('/dashboard/past', auth, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Only providers can access this data' });
    }

    const provider = await ServiceProvider.findOne({ userId: req.user.id });
    if (!provider) return res.status(404).json({ msg: 'Provider not found' });

    const pastBookings = await Booking.find({
      providerId: provider._id,
      $or: [{ status: 'completed' }, { status: 'cancelled' }],
      date: { $lt: new Date() }
    }).populate('userId', 'name email');

    res.json({ pastBookings });
  } catch (err) {
    console.error('❌ Error fetching past bookings:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Update provider's service details from dashboard
router.put('/dashboard/update', auth, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { category, location, availability, contact } = req.body;
    const provider = await ServiceProvider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    if (category) provider.category = category;
    if (location) provider.location = location;
    if (availability !== undefined) provider.availability = availability;
    if (contact) provider.contact = contact;

    await provider.save();
    res.json({ msg: 'Provider service updated', provider });
  } catch (err) {
    console.error('Error updating provider service:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/service/:serviceName', async (req, res) => {
  const { serviceName } = req.params;

  if (!serviceName) {
    return res.status(400).json({ message: 'Service name is required' });
  }

  try {
    const providers = await ServiceProvider.aggregate([
      {
        $match: {
          category: { $regex: new RegExp(`^${serviceName}$`, 'i') }
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'provider',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          totalReviews: { $size: '$reviews' }
        }
      },
      {
        $project: {
          reviews: 0 // Don't send full review array in response
        }
      }
    ]);

    // Manually populate userId field since populate() doesn't work with aggregate
    const populatedProviders = await ServiceProvider.populate(providers, {
      path: 'userId',
      select: 'name email'
    });

    res.status(200).json(populatedProviders);
  } catch (error) {
    console.error('Error fetching providers by service:', error);
    res.status(500).json({ message: 'Failed to fetch providers' });
  }
});





// ✅ Final fallback: GET provider by MongoDB ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid provider ID' });
    }

    const provider = await ServiceProvider.findById(id)
      .populate('userId', 'name email');

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.status(200).json(provider);
  } catch (error) {
    console.error('❌ Error fetching provider by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// router.put('/:providerId/upload-image', auth, upload.single('image'), async (req, res) => {

//   try {
//     const provider = await ServiceProvider.findById(req.params.providerId);
    
//     if (!provider) {
//       return res.status(404).json({ message: 'Provider not found' });
//     }


//     // 🔐 Authorization check
//     if (req.user.id.toString() !== provider.userId.toString()) {
//       return res.status(401).json({ message: 'Unauthorized: You can only update your own profile image' });
//     }

//     // ✅ Update image
//     provider.image = req.file.path;
//     await provider.save();

//     return res.status(200).json({ message: 'Image uploaded successfully', provider });

//   } catch (error) {
//     console.error('🔥 Upload error:', error);
//     res.status(500).json({ message: 'Image upload failed' });
//   }
// });
router.put('/:providerId/upload-image', auth, upload.single('image'), async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.providerId);
    if (!provider) return res.status(404).json({ message: 'Provider not found' });

    if (req.user.id.toString() !== provider.userId.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    provider.image = req.file.path;
    await provider.save();

    res.status(200).json({ message: 'Image uploaded', provider });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

module.exports = router;
