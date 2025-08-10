const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    // console.log('✅req.user in booking route:', req.user);


    // Attach providerId if the user is a provider
    if (user.role === 'provider') {
      const sp = await ServiceProvider.findOne({ userId: user._id });
      if (sp) {
        req.user.providerId = sp._id;
      }
    }

  

    next();
  } catch (err) {
    console.error('Authorization error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
