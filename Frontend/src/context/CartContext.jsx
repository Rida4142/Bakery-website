// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [flyCart, setFlyCart] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemId = (item) => item.id || item._id;

  const addToCart = (product, selectedSize = null, quantity = 1) => {
    const normalizedId = product.id || product._id;
    const sizePriceMap = product.sizePriceMap || (product.sizes ? product.sizes.reduce((map, size) => ({ ...map, [size.label]: size.price }), {}) : null);
    let price = selectedSize ? sizePriceMap?.[selectedSize] : product.price;
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        getItemId(item) === normalizedId && item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + quantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, { 
          ...product, 
          id: normalizedId,
          quantity,
          selectedSize: selectedSize,
          price,
        }];
      }
    });

    const itemName = selectedSize ? `${product.name} (${selectedSize})` : product.name;
    setLastAddedItem(itemName);
    setShowAddedToast(true);
    setFlyCart(product);
    setTimeout(() => {
      setShowAddedToast(false);
      setFlyCart(null);
      setLastAddedItem(null);
    }, 2000);
  };

  const removeFromCart = (id, selectedSize) => {
    setCartItems(prevItems => prevItems.filter(item => 
      !(getItemId(item) === id && item.selectedSize === selectedSize)
    ));
  };

  const updateQuantity = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => prevItems.map(item =>
      getItemId(item) === id && item.selectedSize === selectedSize
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      lastAddedItem,
      showAddedToast,
      setShowAddedToast,
      flyCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 🔥 Added this custom hook – this is what your components import
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;