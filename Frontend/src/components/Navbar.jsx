// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Cake } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/menu', name: 'Menu' },
    { path: '/track-order', name: 'Track Order' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Cake className="h-8 w-8 text-[#E63946]" />
            <span className="font-bold text-xl text-[#1F2937]">Super<span className="text-[#E63946]">Ideal</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-[#E63946]' : 'text-[#1F2937] hover:text-[#E63946]'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-[#1F2937] hover:text-[#E63946] transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E63946] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E63946] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-[#1F2937] hover:text-[#E63946]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;