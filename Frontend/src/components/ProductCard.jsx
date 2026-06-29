import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBakery } from '../context/BakeryContext';
import { useState, useEffect, useRef } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart, showAddedToast, lastAddedItem, flyCart, setShowAddedToast, setFlyCart } = useCart();
  const { bakery } = useBakery();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const addBtnRef = useRef(null);
  
  const sizePriceMap = product.sizePriceMap || (product.sizes ? product.sizes.reduce((map, size) => ({ ...map, [size.label]: size.price }), {}) : null);
  const hasSizes = sizePriceMap && Object.keys(sizePriceMap).some((s) => sizePriceMap[s]);
  const availableSizes = hasSizes ? Object.keys(sizePriceMap).filter((s) => sizePriceMap[s]) : [];
  const currencySymbol = bakery?.settings?.currencySymbol || 'Rs.';

  useEffect(() => {
    if (showAddedToast && flyCart && addBtnRef.current) {
      const endEl = document.getElementById('menu-page-cart');
      if (!endEl) return;
      const startRect = addBtnRef.current.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();
      
      const flyImg = document.createElement('div');
      flyImg.innerHTML = '🛒';
      flyImg.style.cssText = `
        position: fixed;
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: var(--brand-primary, #E63946);
        border-radius: 50%;
        color: white;
        font-size: 18px;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      const sx = startRect.left + startRect.width / 2 - 18;
      const sy = startRect.top + startRect.height / 2 - 18;
      flyImg.style.left = sx + 'px';
      flyImg.style.top = sy + 'px';
      document.body.appendChild(flyImg);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const ex = endRect.left + endRect.width / 2 - 18;
          const ey = endRect.top + endRect.height / 2 - 18;
          flyImg.style.transform = `translate(${ex - sx}px, ${ey - sy}px) scale(0.3)`;
          flyImg.style.opacity = '0';
        });
      });
      
      setTimeout(() => {
        try {
          document.body.removeChild(flyImg);
        } catch (cleanupError) {
          console.warn('fly animation cleanup failed', cleanupError);
        }
        setShowAddedToast(false);
        setFlyCart(null);
      }, 500);
    }
  }, [showAddedToast, flyCart, setShowAddedToast, setFlyCart]);

  const productId = product._id || product.id;

  const handleAddToCart = () => {
    if (hasSizes && availableSizes.length > 0) {
      setShowSizeModal(true);
      setSelectedSize(null);
      setQuantity(1);
    } else {
      addToCart({ ...product, _id: productId, id: productId }, null, 1);
    }
  };

  const handleAddWithSize = () => {
    if (!selectedSize) return;
    addToCart({ ...product, _id: productId, id: productId }, selectedSize, quantity);
  }

  return (
    <>
      <div className="card group">
        <div className="relative overflow-hidden h-48">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm text-center px-2">{product.name}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-textPrimary line-clamp-1">{product.name}</h3>
          <p className="text-textSecondary text-sm mt-1 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-brand-primary font-bold text-xl">{currencySymbol} {product.price}</span>
            <button 
              onClick={handleAddToCart}
              className="bg-brand-primary hover:bg-brand-accent text-white p-2 rounded-xl transition"
              ref={addBtnRef}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${showSizeModal ? '' : 'hidden'}`}>
        <div className="bg-white rounded-3xl max-w-sm w-full p-6">
          <h3 className="text-xl font-bold mb-2">Select Size</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border-2 rounded-xl text-sm font-medium transition ${
                  selectedSize === size
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-gray-200 hover:border-brand-primary text-gray-700'
                }`}
              >
                Size {size}
              </button>
            ))}
          </div>
          
          {selectedSize && (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-textSecondary">Price:</span>
                <span className="text-xl font-bold">{currencySymbol} {sizePriceMap[selectedSize]}</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-5">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={handleAddWithSize}
                className="btn-primary w-full py-3 text-center font-bold"
              >
                Add to Cart
              </button>
            </>
          )}
          
          <button 
            onClick={() => setShowSizeModal(false)}
            className="mt-3 w-full py-2 text-textSecondary hover:text-brand-primary"
          >
            Cancel
          </button>
        </div>
      </div>
      
      {showAddedToast && lastAddedItem && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium z-[60] animate-bounce shadow-lg">
          Added to cart
        </div>
      )}
    </>
  );
};

export default ProductCard;