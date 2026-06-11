const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category'); // adjust path if needed
const connectDB = require('./config/db');

async function seed() {
  await connectDB();

  try {
    const categories = [
      { name: 'Electrician', icon: '💡' },
      { name: 'Plumber', icon: '🚰' },
      { name: 'Carpenter', icon: '🪚' },
      { name: 'Mechanic', icon: '🔧' },
      { name: 'Painter', icon: '🎨' },
    ];

    await Category.insertMany(categories);

    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
