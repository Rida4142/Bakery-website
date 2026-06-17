// src/data/products.js
// Helper to generate pizza size variants
const createPizzaVariants = (baseId, baseName, sizePrices, description, image) => {
  const variants = [];
  const sizes = ['S', 'M', 'L', 'XL'];
  sizes.forEach(size => {
    if (sizePrices[size]) {
      variants.push({
        id: `${baseId}-${size}`,
        name: `${baseName} (${size})`,
        price: sizePrices[size],
        sizePriceMap: sizePrices,
        selectedSizeDefault: size,
        category: 'Pizza',
        description: description,
        image: image,
        hasSize: true
      });
    }
  });
  return variants;
};

// Pizza data from images
const idealSpecialPrices = { S: 750, M: 1100, L: 1600, XL: 2100 };
const reshmiKababPrices = { S: 750, M: 1100, L: 1600, XL: 2100 };
const crownCrustPrices = { S: 800, M: 1100, L: 1600, XL: null };
const superIdealPrices = { S: 650, M: 950, L: 1450, XL: 1900 };

const pizzaImage = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop";
const superIdealImage = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop";

const pizzas = [
  ...createPizzaVariants('ideal-special', 'Ideal Special Pizza', idealSpecialPrices, 'Our signature special pizza with premium toppings', pizzaImage),
  ...createPizzaVariants('reshmi-kabab', 'Reshmi Kabab Pizza', reshmiKababPrices, 'Tender reshmi kabab topping with cheese', pizzaImage),
  ...createPizzaVariants('crown-crust', 'Crown Crust Pizza', crownCrustPrices, 'Delicious crown crust with cheesy filling', pizzaImage),
  ...createPizzaVariants('grilled-chicken', 'Grilled Chicken Pizza', superIdealPrices, 'Grilled chicken with mushrooms, tomato, capsicum, onion', superIdealImage),
  ...createPizzaVariants('sausages', 'Sausages Pizza', superIdealPrices, 'Chicken/beef sausages, olives, mushrooms, tomato', superIdealImage),
  ...createPizzaVariants('fajita', 'Fajita Pizza', superIdealPrices, 'Spicy fajita chicken with capsicum and onion', superIdealImage),
  ...createPizzaVariants('barbq', 'Bar B-Q Pizza', superIdealPrices, 'BBQ chicken with mushrooms and capsicum', superIdealImage),
  ...createPizzaVariants('tikka', 'Tikka Pizza', superIdealPrices, 'Tikka chicken with cheese and vegetables', superIdealImage),
  ...createPizzaVariants('supreme', 'Supreme Pizza', superIdealPrices, 'Supreme chicken with olives and onions', superIdealImage),
  ...createPizzaVariants('achari', 'Achari Pizza', superIdealPrices, 'Achari chicken with pickled spices', superIdealImage),
  ...createPizzaVariants('vegetable', 'Vegetable Pizza', superIdealPrices, 'Fresh vegetables with cheese', superIdealImage),
  ...createPizzaVariants('cheese-lover', 'Cheese Lover Pizza', superIdealPrices, 'Combination of cheddar and mozzarella', superIdealImage),
  ...createPizzaVariants('four-square', 'Four Square Pizza', superIdealPrices, 'Four cheese blend with fresh tomato', superIdealImage),
  ...createPizzaVariants('jalapeno', 'Jalapeno Pizza', superIdealPrices, 'Spicy jalapeno with chicken and olives', superIdealImage),
];

// Crispy Chicken items
const crispyChicken = [
  { id: 'leg-piece', name: 'Crispy Chicken Leg Piece', price: 500, category: 'Crispy Chicken', description: 'Juicy leg piece, crispy outside', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop' },
  { id: 'chest-piece', name: 'Crispy Chicken Chest Piece', price: 550, category: 'Crispy Chicken', description: 'Tender chest piece', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop' },
  { id: 'hot-wings', name: 'Hot Wings', price: 600, category: 'Crispy Chicken', description: 'Spicy hot wings', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop' },
  { id: 'hot-shot', name: 'Hot Shot', price: 600, category: 'Crispy Chicken', description: 'Extra spicy chicken shot', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop' },
];

// Burgers
const burgers = [
  { id: 'zinger', name: 'Zinger Burger', price: 350, category: 'Burgers', description: 'Crispy zinger with sauce', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop' },
  { id: 'tower', name: 'Tower Burger', price: 480, category: 'Burgers', description: 'Double patty tower burger', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop' },
  { id: 'chicken-burger', name: 'Chicken Burger', price: 300, category: 'Burgers', description: 'Classic chicken burger', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop' },
  { id: 'double-decker', name: 'Double Decker', price: 600, category: 'Burgers', description: 'Double decker with extra cheese', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop' },
];

// Shawarma
const shawarma = [
  { id: 'chicken-shawarma', name: 'Chicken Shawarma', price: 150, category: 'Shawarma', description: 'Classic chicken shawarma', image: 'https://images.unsplash.com/photo-1626700059175-7e2ea6c7c6c5?w=400&h=300&fit=crop' },
  { id: 'chicken-cheese', name: 'Chicken Cheese Shawarma', price: 200, category: 'Shawarma', description: 'With extra melted cheese', image: 'https://images.unsplash.com/photo-1626700059175-7e2ea6c7c6c5?w=400&h=300&fit=crop' },
  { id: 'paratha-shawarma', name: 'Paratha Shawarma', price: 200, category: 'Shawarma', description: 'Shawarma wrapped in paratha', image: 'https://images.unsplash.com/photo-1626700059175-7e2ea6c7c6c5?w=400&h=300&fit=crop' },
];

// Parathas & Panini
const parathas = [
  { id: 'crispy-paratha', name: 'Crispy Paratha', price: 350, category: 'Parathas', description: 'Extra crispy layered paratha', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop' },
  { id: 'achari-paratha', name: 'Achari Paratha', price: 300, category: 'Parathas', description: 'Achari flavored paratha', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop' },
];

const panini = [
  { id: 'bbq-panini', name: 'Bar B-Q Panini', price: 400, category: 'Panini', description: 'Grilled BBQ chicken panini', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop' },
  { id: 'grilled-panini', name: 'Grilled Panini', price: 400, category: 'Panini', description: 'Grilled vegetable and cheese panini', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop' },
];

// Pastas
const pastas = [
  { id: 'crunchi-pasta', name: 'Crunchi Pasta', price: 600, category: 'Pasta', description: 'Creamy pasta with crunch', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop' },
  { id: 'vegi-chicken-pasta', name: 'Vegi Chicken Pasta', price: 600, category: 'Pasta', description: 'With vegetables and chicken', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop' },
];

// Sweets Menu
const sweets = [
  { id: 'vanilla-cake-1lb', name: 'Vanilla Cake 1lb', price: 800, category: 'Cakes', description: 'Soft vanilla sponge cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop' },
  { id: 'chocolate-cake-1lb', name: 'Chocolate Cake 1lb', price: 900, category: 'Cakes', description: 'Rich chocolate cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop' },
  { id: 'vanilla-cake-2lb', name: 'Vanilla Cake 2lb', price: 1600, category: 'Cakes', description: 'Large vanilla cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop' },
  { id: 'chocolate-cake-2lb', name: 'Chocolate Cake 2lb', price: 1800, category: 'Cakes', description: 'Large chocolate cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9585?w=400&h=300&fit=crop' },
  { id: 'donut', name: 'Glazed Donut', price: 150, category: 'Donuts', description: 'Soft glazed donut', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop' },
  { id: 'premium-pastry', name: 'Premium Pastry', price: 200, category: 'Pastries', description: 'Belgian chocolate pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { id: 'regular-pastry', name: 'Regular Pastry', price: 120, category: 'Pastries', description: 'Classic fruit pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { id: 'cream-roll', name: 'Cream Roll', price: 100, category: 'Pastries', description: 'Crispy cream filled roll', image: 'https://images.unsplash.com/photo-1624353327511-af5ac2ed2a6e?w=400&h=300&fit=crop' },
];

// Combine all products
export const products = [
  ...pizzas,
  ...crispyChicken,
  ...burgers,
  ...shawarma,
  ...parathas,
  ...panini,
  ...pastas,
  ...sweets,
];

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