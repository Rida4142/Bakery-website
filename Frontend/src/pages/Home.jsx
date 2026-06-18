// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { Clock, Heart, Truck, Award, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Home = () => {
  const featuredProducts = products.slice(0, 8);
  const specialOffers = products.filter(p => p.category === 'Cakes').slice(0, 3);

  const whyChooseUs = [
    { icon: <Heart className="h-8 w-8 text-primary" />, title: 'Fresh Ingredients', desc: 'Daily sourced premium quality ingredients' },
    { icon: <Award className="h-8 w-8 text-primary" />, title: 'Custom Cakes', desc: 'Made just the way you want' },
    { icon: <Truck className="h-8 w-8 text-primary" />, title: 'Fast Delivery', desc: 'Hot & fresh at your doorstep' },
    { icon: <Clock className="h-8 w-8 text-primary" />, title: 'Made With Love', desc: 'Traditional recipes with care' },
  ];

  const steps = [
    { num: 1, title: 'Browse Menu', desc: 'Explore our delicious items' },
    { num: 2, title: 'Place Order', desc: 'Add to cart & checkout' },
    { num: 3, title: 'Bakery Confirms', desc: 'We accept your order' },
    { num: 4, title: 'Fast Delivery', desc: 'Freshly baked at your door' },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-secondary/20 pt-10 pb-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Freshly Baked <span className="text-primary">Happiness</span> Every Day
              </h1>
              <p className="text-textSecondary text-lg mt-4 max-w-lg mx-auto md:mx-0">
                Handcrafted cakes, cookies, donuts and breads made with premium ingredients.
              </p>
              <div className="flex gap-4 mt-8 justify-center md:justify-start">
                <Link to="/menu" className="btn-primary">Order Now</Link>
                <Link to="/menu" className="btn-outline">Explore Menu</Link>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="assets/Homepage.jpg"
                alt="Fresh Bakery"
                className="rounded-3xl shadow-xl object-cover w-full h-80 md:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {categories.filter(c => c.id !== 'all').map(cat => (
              <Link 
                key={cat.id} 
                to={`/menu?category=${cat.id}`}
                className="flex-shrink-0 flex flex-col items-center bg-white rounded-2xl p-4 w-24 shadow-sm hover:shadow-md transition"
              >
                <span className="text-3xl mb-2">{cat.icon}</span>
                <span className="text-sm font-medium text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Delights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
              View Full Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl text-center shadow-sm">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-textSecondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-primaryHover rounded-3xl p-8 md:p-12 text-white text-center">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm inline-block mb-4">Weekend Special</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">20% OFF on Celebration Cakes</h2>
            <p className="mb-6 opacity-90">Use code: SWEET20 at checkout</p>
            <Link to="/menu?category=Cakes" className="bg-white text-primary hover:bg-gray-100 font-semibold py-2 px-6 rounded-xl inline-block transition">
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Favorites */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Customer Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How Ordering Works */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">How Ordering Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-secondary/20 text-primary w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-textSecondary text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Visit Our Bakery</h2>
              <p className="text-textSecondary mb-6">Come and enjoy the aroma of fresh bakes!</p>
              <div className="space-y-3">
                <p className="flex items-center gap-2"><span className="font-medium">📍</span> 155/B Main Road Gulzar-e-Quaid, Rawalpindi</p>
                <p className="flex items-center gap-2"><span className="font-medium">📞</span> 051-5955285 | 0333-9440084</p>
                <p className="flex items-center gap-2"><span className="font-medium">⏰</span> 7:00 AM - 3:00 AM (Daily)</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-3xl h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop"
                alt="Bakery location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;