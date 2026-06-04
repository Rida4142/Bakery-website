import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const CATEGORIES = ["All", "Cakes", "Pastries", "Breads", "Cookies"];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, loading, error } = useProducts(selectedCategory);

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="bg-amber-700 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-amber-200 mt-2">Freshly baked with love</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <CategoryFilter
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading && <p className="text-center text-amber-700">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !error && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;