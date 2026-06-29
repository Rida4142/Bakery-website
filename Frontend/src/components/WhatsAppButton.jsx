// src/components/WhatsAppButton.jsx
import { MessageCircle } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

const WhatsAppButton = () => {
  const { bakery } = useBakery();

  if (!bakery?.settings?.onlineOrderingEnabled) {
    return null;
  }

  if (!bakery?.whatsappNumber) {
    return null;
  }

  const message = `Hello, I would like to place an order from ${bakery.bakeryName || 'the bakery'}.`;
  const whatsappUrl = `https://wa.me/${bakery.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;