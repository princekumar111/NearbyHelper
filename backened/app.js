const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const providerRoutes = require('./routes/provider');
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');
const notificationRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/review');
const categoryRoutes = require('./routes/category');
dotenv.config();
// console.log("🌍 ENV CHECK:", {
//   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
// });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NearbyHelper API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);  
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api', categoryRoutes);// Add booking routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
