import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import useCart from "../context/useCart";
import "../menu.css";

const CATEGORIES = ["All", "Donuts", "Cookies", "Breads", "Cakes", "Pastries"];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { products, loading, error } = useProducts(selectedCategory);

  return (
    <div className="menu-page">

      {/* Navbar — full width red, content capped inside */}
      <nav className="menu-nav">
        <div className="menu-nav-inner">
          <button className="menu-nav-ham" aria-label="Menu">☰</button>
          <span className="menu-nav-logo">🍰 Sweet Bakery</span>
          <div className="menu-nav-right">
            <div className="menu-nav-cart-wrap">
              <button id="menu-page-cart" className="menu-nav-cart" aria-label="Cart">🛒</button>
              <span className="menu-nav-badge">{cartCount}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* All page content capped at max-width */}
      <div className="menu-body">

        {/* Banners */}
        <div className="menu-banners">
          <div className="menu-banner-red">
            <p className="banner-red-sub">Which team</p>
            <h2 className="banner-red-title">ARE YOU MTO?</h2>
            <div className="banner-red-imgs">
              <div className="banner-red-img">
                <div className="banner-img-circle">🍮</div>
                <span className="banner-img-label">RASGULLA</span>
              </div>
              <div className="banner-red-img">
                <div className="banner-img-circle">🍡</div>
                <span className="banner-img-label">GULAB JAMUN</span>
              </div>
            </div>
          </div>
          <div className="menu-banner-amber">
            <p className="banner-amber-title">Super Taste–Super Fresh</p>
            <p className="banner-amber-sub">Your Trusted Neighbourhood Bakery</p>
            <span className="banner-amber-badge">BUY 6, GET 1 FREE!</span>
          </div>
        </div>

        {/* Categories */}
        <div className="menu-section">
          <div className="menu-section-header">
            <h3 className="menu-section-title">Categories</h3>
            <button className="menu-see-all">SEE ALL</button>
          </div>
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Best Sellers */}
        <div className="menu-section">
          <div className="menu-section-header">
            <h3 className="menu-section-title">Best Sellers</h3>
          </div>
          <div className="bestsellers-grid">
            <div className="bs-card red">
              <div className="bs-card-text">Coo<br />kies</div>
              <span className="bs-card-emoji">🍪</span>
              <span className="bs-card-tag">Order now</span>
            </div>
            <div className="bs-card cream">
              <div className="bs-card-text">Do<br />nut</div>
              <span className="bs-card-emoji">🍩</span>
              <span className="bs-card-tag">Trending</span>
            </div>
          </div>
        </div>

        {/* All Items */}
        <div className="menu-section">
          <div className="menu-section-header">
            <h3 className="menu-section-title">All Items</h3>
          </div>

          {loading && <p className="menu-status">Loading fresh items...</p>}
          {error   && <p className="menu-status error">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="menu-status empty">No items in this category.</p>
          )}

          <div className="products-grid">
             {!loading && !error && products.map((product, i) => (
               <ProductCard
                 key={product._id}
                 product={product}
                 delay={i * 0.05}
               />
             ))}
           </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          <button className="bottom-nav-home">🏠 Home</button>
          <button className="bottom-nav-icon">🎁</button>
          <button className="bottom-nav-icon">📊</button>
        </div>
      </div>

    </div>
  );
};

export default MenuPage;