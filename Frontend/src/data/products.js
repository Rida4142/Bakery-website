// src/data/products.js
const DYNAMIC_PRODUCTS_KEY = 'dynamic_products';

const loadDynamicProducts = () => {
  try {
    const stored = localStorage.getItem(DYNAMIC_PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveProduct = (product) => {
  const dynamic = loadDynamicProducts();
  const existingIndex = dynamic.findIndex(p => p.id === product.id);
  if (existingIndex !== -1) {
    dynamic[existingIndex] = { ...dynamic[existingIndex], ...product, updatedAt: new Date().toISOString() };
  } else {
    dynamic.push({ ...product, id: product.id || `custom-${Date.now()}`, createdAt: new Date().toISOString() });
  }
  localStorage.setItem(DYNAMIC_PRODUCTS_KEY, JSON.stringify(dynamic));
  return product;
};

export const deleteProduct = (id) => {
  const dynamic = loadDynamicProducts().filter(p => p.id !== id);
  localStorage.setItem(DYNAMIC_PRODUCTS_KEY, JSON.stringify(dynamic));
};

// Helper to create a unique pizza product with size map and default S price
const createPizza = (id, name, sizePrices, description, image) => {
  const hasSize = Object.values(sizePrices).some(v => v !== null);
  const cleanPrices = {};
  Object.entries(sizePrices).forEach(([size, price]) => {
    if (price !== null) cleanPrices[size] = price;
  });
  return {
    id,
    name,
    price: cleanPrices.S || Object.values(cleanPrices)[0],
    sizePriceMap: Object.keys(cleanPrices).length > 1 ? cleanPrices : null,
    selectedSizeDefault: 'S',
    hasSize: Object.keys(cleanPrices).length > 1,
    category: 'Pizza',
    description,
    image,
  };
};

// Pizza data from images
const idealSpecialPrices = { S: 750, M: 1100, L: 1600, XL: 2100 };
const reshmiKababPrices = { S: 750, M: 1100, L: 1600, XL: 2100 };
const crownCrustPrices = { S: 800, M: 1100, L: 1600 };
const superIdealPrices = { S: 650, M: 950, L: 1450, XL: 1900 };

const pizzaImage = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop";
const superIdealImage = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop";

const pizzas = [
  createPizza('ideal-special', 'Ideal Special Pizza', idealSpecialPrices, 'Our signature special pizza with premium toppings', pizzaImage),
  createPizza('reshmi-kabab', 'Reshmi Kabab Pizza', reshmiKababPrices, 'Tender reshmi kabab topping with cheese', './assets/pizzas/ReshmikebabPizza.webp'),
  createPizza('crown-crust', 'Crown Crust Pizza', crownCrustPrices, 'Delicious crown crust with cheesy filling', './assets/pizzas/CrownCrustPizza.webp'),
  createPizza('grilled-chicken', 'Grilled Chicken Pizza', superIdealPrices, 'Grilled chicken with mushrooms, tomato, capsicum, onion', './assets/pizzas/GrilledChickenPizza.webp'),
  createPizza('sausages', 'Sausages Pizza', superIdealPrices, 'Chicken/beef sausages, olives, mushrooms, tomato', './assets/pizzas/SausagesPizza.webp'),
  createPizza('fajita', 'Fajita Pizza', superIdealPrices, 'Spicy fajita chicken with capsicum and onion', './assets/pizzas/FajitaPizza.webp'),
  createPizza('barbq', 'Bar B-Q Pizza', superIdealPrices, 'BBQ chicken with mushrooms and capsicum', './assets/pizzas/BBQPizza.webp'),
  createPizza('tikka', 'Tikka Pizza', superIdealPrices, 'Tikka chicken with cheese and vegetables', './assets/pizzas/TikkaPizza.webp'),
  createPizza('supreme', 'Supreme Pizza', superIdealPrices, 'Supreme chicken with olives and onions', './assets/pizzas/SupremePizza.webp'),
  createPizza('achari', 'Achari Pizza', superIdealPrices, 'Achari chicken with pickled spices', './assets/pizzas/AchariPizza.webp'),
  createPizza('vegetable', 'Vegetable Pizza', superIdealPrices, 'Fresh vegetables with cheese', './assets/pizzas/VegetablePizza.webp'),
  createPizza('cheese-lover', 'Cheese Lover Pizza', superIdealPrices, 'Combination of cheddar and mozzarella', './assets/pizzas/CheeseLoverPizza.webp'),
  createPizza('four-square', 'Four Square Pizza', superIdealPrices, 'Four cheese blend with fresh tomato', './assets/pizzas/4squarePizza.webp'),
  createPizza('jalapeno', 'Jalapeno Pizza', superIdealPrices, 'Spicy jalapeno with chicken and olives', './assets/pizzas/JalapenoPizza.webp'),
];

// Crispy Chicken items
const crispyChicken = [
  { id: 'leg-piece', name: 'Crispy Chicken Leg Piece', price: 500, category: 'Crispy Chicken', description: 'Juicy leg piece, crispy outside', image: './assets/chicken/legPiece.webp' },
  { id: 'chest-piece', name: 'Crispy Chicken Chest Piece', price: 550, category: 'Crispy Chicken', description: 'Tender chest piece', image: './assets/chicken/chestPiece.webp' },
  { id: 'hot-wings', name: 'Hot Wings', price: 600, category: 'Crispy Chicken', description: 'Spicy hot wings', image: './assets/chicken/hotWings.webp' },
  { id: 'hot-shot', name: 'Hot Shot', price: 600, category: 'Crispy Chicken', description: 'Extra spicy chicken shot', image: './assets/chicken/hotShots.webp' },
];

// Burgers
const burgers = [
  { id: 'zinger', name: 'Zinger Burger', price: 350, category: 'Burgers', description: 'Crispy zinger with sauce', image: './assets/burgers/zinger.webp' },
  { id: 'tower', name: 'Tower Burger', price: 480, category: 'Burgers', description: 'Double patty tower burger', image: './assets/burgers/tower.webp' },
  { id: 'chicken-burger', name: 'Chicken Burger', price: 300, category: 'Burgers', description: 'Classic chicken burger', image: './assets/burgers/chicken.webp' },
  { id: 'double-decker', name: 'Double Decker', price: 600, category: 'Burgers', description: 'Double decker with extra cheese', image: './assets/burgers/DD.webp' },
];

// Shawarma
const shawarma = [
  { id: 'chicken-shawarma', name: 'Chicken Shawarma', price: 150, category: 'Shawarma', description: 'Classic chicken shawarma', image: './assets/shawarmas/chicken.webp' },
  { id: 'chicken-cheese', name: 'Chicken Cheese Shawarma', price: 200, category: 'Shawarma', description: 'With extra melted cheese', image: './assets/shawarmas/chickenCheese.webp' },
  { id: 'paratha-shawarma', name: 'Paratha Shawarma', price: 200, category: 'Shawarma', description: 'Shawarma wrapped in paratha', image: './assets/shawarmas/paratha.webp' },
];

// Parathas & Panini
const parathas = [
  { id: 'crispy-paratha', name: 'Crispy Paratha', price: 350, category: 'Parathas', description: 'Extra crispy layered paratha', image: './assets/paratha/crispy.webp' },
  { id: 'achari-paratha', name: 'Achari Paratha', price: 300, category: 'Parathas', description: 'Achari flavored paratha', image: './assets/paratha/achari.webp' },
];

const panini = [
  { id: 'bbq-panini', name: 'Bar B-Q Panini', price: 400, category: 'Panini', description: 'Grilled BBQ chicken panini', image: './assets/panini/bbq.webp' },
  { id: 'grilled-panini', name: 'Grilled Panini', price: 400, category: 'Panini', description: 'Grilled vegetable and cheese panini', image: './assets/panini/grilled.webp' },
];

// Pastas
const pastas = [
  { id: 'crunchi-pasta', name: 'Crunchi Pasta', price: 600, category: 'Pasta', description: 'Creamy pasta with crunch', image: './assets/pasta/crunchi.webp' },
  { id: 'vegi-chicken-pasta', name: 'Vegi Chicken Pasta', price: 600, category: 'Pasta', description: 'With vegetables and chicken', image: './assets/pasta/vegi.webp' },
];

// Sweets Menu
const sweets = [
  { id: 'vanilla-cake-1lb', name: 'Vanilla Cake 1lb', price: 800, category: 'Cakes', description: 'Soft vanilla sponge cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop', pickupOnly: true },
  { id: 'chocolate-cake-1lb', name: 'Chocolate Cake 1lb', price: 900, category: 'Cakes', description: 'Rich chocolate cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop', pickupOnly: true },
  { id: 'vanilla-cake-2lb', name: 'Vanilla Cake 2lb', price: 1600, category: 'Cakes', description: 'Large vanilla cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop', pickupOnly: true },
  { id: 'chocolate-cake-2lb', name: 'Chocolate Cake 2lb', price: 1800, category: 'Cakes', description: 'Large chocolate cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop', pickupOnly: true },
  { id: 'donut', name: 'Glazed Donut', price: 150, category: 'Donuts', description: 'Soft glazed donut', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop' },
  { id: 'premium-pastry', name: 'Premium Pastry', price: 200, category: 'Pastries', description: 'Belgian chocolate pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { id: 'regular-pastry', name: 'Regular Pastry', price: 120, category: 'Pastries', description: 'Classic fruit pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { id: 'cream-roll', name: 'Cream Roll', price: 100, category: 'Pastries', description: 'Crispy cream filled roll', image: 'https://images.unsplash.com/photo-1624353327511-af5ac2ed2a6e?w=400&h=300&fit=crop' },
];

// Combine all products
const staticProducts = [
  ...pizzas,
  ...crispyChicken,
  ...burgers,
  ...shawarma,
  ...parathas,
  ...panini,
  ...pastas,
  ...sweets,
];

export const products = [...staticProducts, ...loadDynamicProducts()];

// Categories for filtering and display
export const categories = [
  { id: 'all', name: 'All', icon: '🍕' },
  { id: 'Pizza', name: 'Pizza', icon: '🍕' },
  { id: 'Crispy Chicken', name: 'Chicken', icon: '🍗' },
  { id: 'Burgers', name: 'Burgers', icon: '🍔' },
  { id: 'Shawarma', name: 'Shawarma', icon: '🌯' },
  { id: 'Parathas', name: 'Parathas', icon: '🥙' },
  { id: 'Panini', name: 'Panini', icon: '🥪' },
  { id: 'Pasta', name: 'Pasta', icon: '🍝' },
  { id: 'Cakes', name: 'Cakes', icon: '🎂' },
  { id: 'Donuts', name: 'Donuts', icon: '🍩' },
  { id: 'Pastries', name: 'Pastries', icon: '🍰' },
];

export const getProductById = (id) => products.find(p => p.id === id);