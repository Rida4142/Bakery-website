// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize = null) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { 
          ...product, 
          quantity: 1,
          selectedSize: selectedSize,
          price: selectedSize ? product.sizePriceMap?.[selectedSize] : product.price
        }];
      }
    });
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
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};