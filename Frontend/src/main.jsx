import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { CartProvider } from './context/CartContext'
import { BakeryProvider } from './context/BakeryContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BakeryProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </BakeryProvider>
    </BrowserRouter>
  </React.StrictMode>
)