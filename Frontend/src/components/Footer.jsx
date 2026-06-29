import { Cake, Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useBakery } from '../context/BakeryContext';

const Footer = () => {
  const { bakery } = useBakery();

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cake className="h-7 w-7 text-brand-primary" />
              <span className="font-bold text-xl">
                {bakery?.bakeryName?.split(' ').map((word, i) => 
                  i === 0 ? word : <span key={i} className="text-brand-primary">{word}</span>
                )}
              </span>
            </div>
            <p className="text-textSecondary text-sm">
              Freshly baked happiness delivered to your doorstep. Premium ingredients, authentic taste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-textSecondary">
              <li><a href="/menu" className="hover:text-brand-primary">Menu</a></li>
              <li><a href="/track-order" className="hover:text-brand-primary">Track Order</a></li>
              <li><a href="#" className="hover:text-brand-primary">About Us</a></li>
              <li><a href="#" className="hover:text-brand-primary">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-textSecondary">
              {bakery?.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={18} /> {bakery.phone}
                </li>
              )}
              {bakery?.address && (
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="mt-1" /> {bakery.address}
                </li>
              )}
              {bakery?.whatsappNumber && (
                <li className="flex items-center gap-2">
                  <Phone size={18} /> {bakery.whatsappNumber}
                </li>
              )}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-textSecondary">
              {bakery?.settings?.openingHours && (
                <li className="flex items-center gap-2">
                  <Clock size={18} /> {bakery.settings.openingHours}
                </li>
              )}
              <li className="text-sm">Delivery till late every day</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <FaFacebook className="h-5 w-5 text-textSecondary hover:text-brand-primary cursor-pointer" />
              <FaInstagram className="h-5 w-5 text-textSecondary hover:text-brand-primary cursor-pointer" />
              <FaTwitter className="h-5 w-5 text-textSecondary hover:text-brand-primary cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-textSecondary text-sm">
          <p>&copy; 2025 {bakery?.bakeryName || 'Bakery'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;