// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

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

  const addToCart = (product, selectedSize = null, quantity = 1) => {
    let price = selectedSize ? product.sizePriceMap?.[selectedSize] : product.price;
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && item.selectedSize === selectedSize
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
      !(item.id === id && item.selectedSize === selectedSize)
    ));
  };

  const updateQuantity = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => prevItems.map(item =>
      item.id === id && item.selectedSize === selectedSize
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

export default CartContext;