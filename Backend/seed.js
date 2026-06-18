require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Bakery = require('./models/Bakery');
const Category = require('./models/Category');
const Product = require('./models/Product');

const PIZZA_SIZES_4 = [
  { label: 'S', price: 650 },
  { label: 'M', price: 950 },
  { label: 'L', price: 1450 },
  { label: 'XL', price: 1900 }
];

const SPECIAL_SIZES_4 = [
  { label: 'S', price: 750 },
  { label: 'M', price: 1100 },
  { label: 'L', price: 1600 },
  { label: 'XL', price: 2100 }
];

const CROWN_CRUST_SIZES = [
  { label: 'S', price: 800 },
  { label: 'M', price: 1100 },
  { label: 'L', price: 1600 }
];

const run = async () => {
  await connectDB();

  // Safety check: this script should only ever run against an EMPTY database.
  // If a Bakery document already exists here, stop — don't risk double-seeding
  // or accidentally reseeding live data.
  const alreadySeeded = await Bakery.findOne();
  if (alreadySeeded) {
    console.log(`This database already contains a bakery: "${alreadySeeded.bakeryName}". Aborting to avoid duplicate data.`);
    console.log('If you intentionally want to reseed, manually drop the database in Atlas first.');
    mongoose.connection.close();
    return;
  }

  const bakery = await Bakery.create({
    bakeryName: 'Super Ideal Bakers',
    slug: 'super-ideal-bakers',
    phone: '051-5955285',
    whatsappNumber: '923339440084',
    address: '155/B Main Road Gulzar-e-Quaid Near Masjid Al Rasheed, Rawalpindi'
  });
  console.log('Created bakery:', bakery.bakeryName, bakery._id.toString());

  const categoryNames = [
    'Pizza', 'Specials', 'Burgers', 'Shawarma', 'Crispy Chicken',
    'Parathas', 'Panini', 'Extras', 'Pastries', 'Donuts', 'Cakes'
  ];

  const categories = {};
  for (let i = 0; i < categoryNames.length; i++) {
    const cat = await Category.create({ bakeryId: bakery._id, name: categoryNames[i], sortOrder: i });
    categories[categoryNames[i]] = cat._id;
  }
  console.log(`Created ${categoryNames.length} categories`);

  const products = [
    // ---- PIZZAS ----
    { name: 'Grilled Chicken Pizza', description: 'Cheese, Mushroom, Chicken/Beef, Sausages, Olives', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Sausages Pizza', description: 'Chicken, Cheese, Mushroom', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Fajita Pizza', description: 'Tomato, Capsicum, Onion, Mushroom, Grilled Chicken, Cheese', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Bar B-Q Pizza', description: 'Bar B-Q Chicken, Cheese, Mushroom, Capsicum, Tomato & Slice Onion', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Tikka Pizza', description: 'Tikka Chicken, Cheese, Mushroom, Capsicum, Tomato & Slice Onion', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Supreme Pizza', description: 'Chicken, Supreme Cheese, Mushroom, Capsicum, Tomato & Olives Onion', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Achari Pizza', description: 'Achari Chicken, Cheese, Mushroom, Capsicum, Tomato & Olives, Onion', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Vegetable Pizza', description: 'Cheese, Mushroom, Capsicum, Tomato, Baby Corn & Onion', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Cheese Lover', description: 'Combination of Cheddar Mozzarella with Fresh Tomato & Pizza Sauce', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Four Square', description: 'Combination of Cheddar Mozzarella with Fresh Tomato & Pizza Sauce', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },
    { name: 'Jalapeno Pizza', description: 'Chicken, Cheese, Mushroom, Capsicum, Tomato, Olives & Onion', categoryId: categories['Pizza'], sizes: PIZZA_SIZES_4 },

    // ---- SPECIALS ----
    { name: 'Ideal Special Pizza', categoryId: categories['Specials'], sizes: SPECIAL_SIZES_4 },
    { name: 'Reshmi Kabab Pizza', categoryId: categories['Specials'], sizes: SPECIAL_SIZES_4 },
    { name: 'Crown Crust Pizza', categoryId: categories['Specials'], sizes: CROWN_CRUST_SIZES },

    // ---- CRISPY CHICKEN ----
    { name: 'Leg Piece', categoryId: categories['Crispy Chicken'], price: 500 },
    { name: 'Chest Piece', categoryId: categories['Crispy Chicken'], price: 550 },
    { name: 'Hot Wings', categoryId: categories['Crispy Chicken'], price: 600 },
    { name: 'Hot Shot', categoryId: categories['Crispy Chicken'], price: 600 },

    // ---- BURGERS ----
    { name: 'Zinger Burger', categoryId: categories['Burgers'], price: 350 },
    { name: 'Tower Burger', categoryId: categories['Burgers'], price: 480 },
    { name: 'Chicken Burger', categoryId: categories['Burgers'], price: 300 },
    { name: 'Double Decker', categoryId: categories['Burgers'], price: 600 },

    // ---- SHAWARMA ----
    { name: 'Chicken Shawarma', categoryId: categories['Shawarma'], price: 150 },
    { name: 'Chicken Cheese Shawarma', categoryId: categories['Shawarma'], price: 200 },
    { name: 'Paratha Shawarma', categoryId: categories['Shawarma'], price: 200 },

    // ---- PARATHAS ----
    { name: 'Crispy Paratha', categoryId: categories['Parathas'], price: 350 },
    { name: 'Achari Paratha', categoryId: categories['Parathas'], price: 300 },

    // ---- PANINI ----
    { name: 'Bar B-Q Panini', categoryId: categories['Panini'], price: 400 },
    { name: 'Grilled Panini', categoryId: categories['Panini'], price: 400 },

    // ---- EXTRAS ----
    { name: 'Crunchy Pasta', categoryId: categories['Extras'], price: 600 },
    { name: 'Vegi Chicken Pasta', categoryId: categories['Extras'], price: 155 },

    // ---- PASTRIES ----
    { name: 'Premium Belgian Chocolate Pastry', categoryId: categories['Pastries'], price: 200 },
    { name: 'Regular Classic Fruit Pastry', categoryId: categories['Pastries'], price: 120 },
    { name: 'Cream Roll', description: 'Crispy cream filled roll', categoryId: categories['Pastries'], price: 100 },

    // ---- DONUTS ----
    { name: 'Glazed Donut', description: 'Soft glazed donut', categoryId: categories['Donuts'], price: 150 },

    // ---- CAKES ----
    { name: 'Vanilla Cake', categoryId: categories['Cakes'], sizes: [{ label: '1lb', price: 800 }, { label: '2lb', price: 1600 }] },
    { name: 'Chocolate Cake', categoryId: categories['Cakes'], sizes: [{ label: '1lb', price: 900 }, { label: '2lb', price: 1800 }] }
  ];

  const created = [];
  for (const p of products) {
    const doc = await Product.create({ bakeryId: bakery._id, ...p });
    created.push(doc);
  }

  console.log(`Created ${created.length} products`);
  console.log('Seed complete.');
  mongoose.connection.close();
};

run().catch((err) => {
  console.error('Seed failed:', err);
  mongoose.connection.close();
  process.exit(1);
});