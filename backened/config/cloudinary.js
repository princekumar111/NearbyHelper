const dotenv = require('dotenv');
dotenv.config(); // ✅ Must come before using process.env

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("✅ Cloudinary Config Loaded:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY ? '✔️ Present' : '❌ Missing',
//   api_secret: process.env.CLOUDINARY_API_SECRET ? '✔️ Present' : '❌ Missing',
// });

module.exports = cloudinary;
