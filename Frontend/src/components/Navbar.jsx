// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Cake } from 'lucide-react';
import useCart from '../context/useCart';
import { useBakery } from '../context/BakeryContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { bakery } = useBakery();

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
            {bakery?.logo ? (
              <img src={bakery.logo} alt={bakery.bakeryName || 'Logo'} className="h-8 w-8 object-contain" />
            ) : (
              <Cake className="h-8 w-8 text-brand-primary" />
            )}
            <span className="font-bold text-xl text-textPrimary">
              {bakery?.bakeryName || 'Bakery'}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-brand-primary' : 'text-textPrimary hover:text-brand-primary'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-textPrimary hover:text-brand-primary transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                className="block py-2 text-textPrimary hover:text-brand-primary"
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