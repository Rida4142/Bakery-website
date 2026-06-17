// src/components/ProductCard.jsx
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showSizeModal, setShowSizeModal] = useState(false);
  
  // Check if product has sizes (pizza)
  const hasSizes = product.sizePriceMap && Object.keys(product.sizePriceMap).some(s => product.sizePriceMap[s]);
  const availableSizes = hasSizes ? Object.keys(product.sizePriceMap).filter(s => product.sizePriceMap[s]) : [];

  const handleAddToCart = () => {
    if (hasSizes && availableSizes.length > 0) {
      setShowSizeModal(true);
    } else {
      addToCart(product);
    }
  };

  const handleSizeSelect = (size) => {
    addToCart(product, size);
    setShowSizeModal(false);
  };

  return (
    <>
      <div className="card group">
        <div className="relative overflow-hidden h-48">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-textPrimary line-clamp-1">{product.name}</h3>
          <p className="text-textSecondary text-sm mt-1 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-primary font-bold text-xl">Rs. {product.price}</span>
            <button 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primaryHover text-white p-2 rounded-xl transition"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Size Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6">
            <h3 className="text-xl font-bold mb-4">Select Size</h3>
            <div className="space-y-3">
              {availableSizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className="w-full py-3 border border-gray-200 rounded-xl hover:bg-primary hover:text-white transition text-left px-4 flex justify-between"
                >
                  <span>Size {size}</span>
                  <span className="font-bold">Rs. {product.sizePriceMap[size]}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowSizeModal(false)}
              className="mt-4 w-full py-2 text-textSecondary hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;