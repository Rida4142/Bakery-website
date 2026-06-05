import { useState } from "react";

const EMOJI_MAP = {
  Cakes: "🎂", Pastries: "🥐", Breads: "🍞",
  Cookies: "🍪", Donuts: "🍩",
};

const ProductCard = ({ product, delay = 0, onAdd }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAdd();
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <div className="product-card" style={{ animationDelay: `${delay}s` }}>
      <div className="product-card-img">
        {product.image
          ? <img src={product.image} alt={product.name} />
          : EMOJI_MAP[product.category] || "🍰"
        }
      </div>
      <div className="product-card-info">
        <p className="product-card-category">{product.category}</p>
        <p className="product-card-name">{product.name}</p>
        <div className="product-card-row">
          <span className="product-card-price">${product.price}</span>
          <button
            className={`product-card-add ${added ? "added" : ""}`}
            onClick={handleAdd}
            aria-label="Add to order"
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;