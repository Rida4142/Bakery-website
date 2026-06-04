import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const CATEGORIES = ["All", "Donuts", "Cookies", "Breads", "Cakes", "Pastries"];

const BESTSELLERS = [
  { label: "Coo\nkies", emoji: "🍪", bg: "bg-red-600", text: "text-white", tag: "Order now" },
  { label: "Do\nnut",  emoji: "🍩", bg: "bg-amber-50", text: "text-red-600", tag: "Trending" },
];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, loading, error } = useProducts(selectedCategory);

  return (
    <div className="min-h-screen bg-red-50">

      {/* Navbar */}
      <nav className="bg-red-600 px-6 py-4 flex items-center justify-between">
        <button className="text-white text-2xl">☰</button>
        <h1 className="text-white font-medium text-lg">Sweet Bakery</h1>
        <div className="relative">
          <span className="text-white text-2xl">🛒</span>
          <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
            0
          </span>
        </div>
      </nav>

      {/* Promo Banner */}
      <div className="mx-4 mt-4 bg-red-600 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-red-300 text-xs uppercase tracking-widest">Today's special</p>
          <h2 className="text-white text-xl font-medium mt-1 leading-tight">
            Which treat<br />
            <span className="text-yellow-400">are you?</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl">🍩</div>
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl">🧁</div>
        </div>
      </div>

      <div className="px-4 mt-5">

        {/* Categories */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800">Categories</h3>
          <span className="text-red-600 text-sm font-medium cursor-pointer">See all</span>
        </div>
        <CategoryFilter
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Best Sellers */}
        <h3 className="font-medium text-gray-800 mt-5 mb-3">Best Sellers</h3>
        <div className="grid grid-cols-2 gap-3">
          {BESTSELLERS.map((item) => (
            <div key={item.label} className={`${item.bg} rounded-2xl h-40 relative overflow-hidden cursor-pointer`}>
              <div className={`${item.text} text-3xl font-medium p-4 leading-tight whitespace-pre-line`}>
                {item.label}
              </div>
              <span className="absolute bottom-2 right-2 text-5xl">{item.emoji}</span>
              <span className={`absolute bottom-2 left-3 text-xs px-2 py-1 rounded-full ${item.bg === "bg-red-600" ? "bg-white bg-opacity-20 text-white" : "bg-red-600 text-white"}`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* All Items */}
        <h3 className="font-medium text-gray-800 mt-5 mb-3">All Items</h3>

        {loading && (
          <p className="text-center text-red-400 py-10">Loading fresh items...</p>
        )}
        {error && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-400 py-10">No items in this category.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-24">
          {!loading && !error && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-red-100 px-6 py-3 flex justify-around items-center">
        <div className="bg-red-600 text-white rounded-full px-5 py-2 flex items-center gap-2 text-sm font-medium">
          🏠 Home
        </div>
        <span className="text-2xl text-gray-300 cursor-pointer">🎁</span>
        <span className="text-2xl text-gray-300 cursor-pointer">📊</span>
      </div>

    </div>
  );
};

export default MenuPage;