// src/pages/Menu.jsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(
    categoryParam && categoryParam.toLowerCase() !== 'all' ? categoryParam : 'All'
  );
  const { products, loading, error } = useProducts(activeCategory);

  const filteredProducts = activeCategory === 'All' ? products : products;

  return (
    <div className="py-10">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-4">Our Delicious Menu</h1>
        <p className="text-textSecondary text-center mb-8">Freshly baked just for you</p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeCategory === cat.name
                  ? 'bg-primary text-white'
                  : 'bg-white text-textPrimary hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-textSecondary">Loading menu items...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-textSecondary">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;