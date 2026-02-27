
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

/* ========================================================
   ✅ CREATE or UPDATE PROVIDER (UPSERT)
======================================================== */
router.post('/upsert', auth, async (req, res) => {
  console.log("🧾 req.user in /upsert:", req.user);

  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { category, availability, contact, image, lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ msg: "Latitude and Longitude are required" });
    }

    const providerData = {
      userId: req.user.id,
      category,
      availability,
      contact,
      image,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };

    let existing = await Provider.findOne({ userId: req.user.id });

    if (existing) {
      const updatedProvider = await Provider.findOneAndUpdate(
        { userId: req.user.id },
        providerData,
        { new: true }
      );
      return res.json({ msg: "Provider updated", provider: updatedProvider });
    }

    const newProvider = await Provider.create(providerData);
    return res.status(201).json({ msg: "Provider created", provider: newProvider });

  } catch (err) {
    console.error("❌ Error in /upsert:", err.message);
    return res.status(500).json({ msg: err.message });
  }
});


/* ========================================================
   ✅ GET PROVIDER PROFILE
======================================================== */
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
      category: provider.category,
      availability: provider.availability,
      contact: provider.contact,
      image: provider.image,
      location: provider.location
    });

  } catch (err) {
    console.error("❌ Profile fetch error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});



router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q || "";

    if (!keyword.trim()) {
      return res.status(400).json({ message: "Search keyword required" });
    }

    const providers = await Provider.find({
      category: { $regex: keyword, $options: "i" } // case-insensitive
    }).populate("userId", "name email");

    res.status(200).json(providers);

  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


/* ========================================================
   ✅ SERVICE SUGGESTIONS
======================================================== */
router.get("/suggest", async (req, res) => {
  try {
    const keyword = req.query.q || "";

    if (!keyword.trim()) return res.json([]);

    const categories = await Provider.aggregate([
      {
        $match: {
          category: { $regex: keyword, $options: "i" }
        }
      },
      {
        $group: {
          _id: "$category"
        }
      },
      {
        $limit: 5
      }
    ]);

    res.json(categories.map(c => c._id));

  } catch (err) {
    res.status(500).json({ message: "Suggestion error" });
  }
});
/* ========================================================
   ✅ UPDATE PROVIDER PROFILE
======================================================== */
router.put("/profile", auth, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { name, contact, category, availability, lat, lng } = req.body;

    const user = await User.findById(req.user.id);
    const provider = await Provider.findOne({ userId: req.user.id });

    if (!user || !provider) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    if (name) user.name = name;
    await user.save();

    provider.category = category || provider.category;
    provider.contact = contact || provider.contact;
    provider.availability =
      availability !== undefined ? availability : provider.availability;

    if (lat && lng) {
      provider.location = {
        type: "Point",
        coordinates: [lng, lat]
      };
    }

    await provider.save();
    res.json({ msg: "Profile updated", provider });

  } catch (err) {
    console.error("❌ Profile update error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


/* ========================================================
   ✅ DASHBOARD UPDATE
======================================================== */
router.put('/dashboard/update', auth, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { category, availability, contact, lat, lng } = req.body;
    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    if (category) provider.category = category;
    if (contact) provider.contact = contact;
    if (availability !== undefined) provider.availability = availability;

    if (lat && lng) {
      provider.location = {
        type: "Point",
        coordinates: [lng, lat]
      };
    }

    await provider.save();
    res.json({ msg: 'Provider updated', provider });

  } catch (err) {
    console.error('Error updating provider:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

/* ========================================================
   ✅ GET UPCOMING BOOKINGS FOR PROVIDER DASHBOARD
======================================================== */
router.get("/dashboard/upcoming", auth, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ msg: "Only providers can view bookings" });
    }

    const provider = await Provider.findOne({ userId: req.user.id });
    if (!provider) {
      return res.status(404).json({ msg: "Provider profile not found" });
    }

    const today = new Date();

    const upcomingBookings = await Booking.find({
      providerId: provider._id,
      date: { $gte: today },
      status: { $in: ["pending", "confirmed"] }
    })
      .populate("userId", "name email")
      .sort({ date: 1 });

    res.json({ upcomingBookings });
  } catch (err) {
    console.error("❌ Error fetching upcoming bookings:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ========================================================
   ✅ MY SERVICES (NEW ROUTE)
   MUST BE ABOVE /:id ROUTE
======================================================== */
router.get("/my-services", auth, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({ msg: "Provider not found" });
    }

    const services = [
      {
        name: provider.category,
        description: provider.description || "No description available"
      }
    ];

    res.json({ services });

  } catch (err) {
    console.error("❌ Error fetching provider services:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


/* ========================================================
   ✅ NEARBY PROVIDERS
======================================================== */
router.post("/nearby", async (req, res) => {
  try {
    const { lat, lng, serviceName } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ msg: "Latitude and Longitude required" });
    }

    let providers = await Provider.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 20000
        }
      },
      {
        $match: { category: { $regex: new RegExp(`^${serviceName}$`, "i") } }
      }
    ]);

    providers = await Provider.populate(providers, {
      path: "userId",
      select: "name email"
    });

    res.json(providers);

  } catch (err) {
    console.error("Nearby error:", err);
    res.status(500).json({ msg: err.message });
  }
});


/* ========================================================
   ✅ GET PROVIDERS BY SERVICE
======================================================== */
router.get('/service/:serviceName', async (req, res) => {
  const { serviceName } = req.params;

  try {
    const providers = await Provider.aggregate([
      { $match: { category: { $regex: new RegExp(`^${serviceName}$`, 'i') } } },
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
      { $project: { reviews: 0 } }
    ]);

    const populated = await Provider.populate(providers, {
      path: 'userId',
      select: 'name email'
    });

    res.status(200).json(populated);

  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ message: 'Failed to fetch providers' });
  }
});


/* ========================================================
   ✅ GET PROVIDER BY ID (DYNAMIC — MUST BE LAST)
======================================================== */
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
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


/* ========================================================
   ✅ IMAGE UPLOAD
======================================================== */
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

