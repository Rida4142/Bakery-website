// src/components/WhatsAppButton.jsx
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '923416401994'; // Replace with actual number
  const message = 'Hello, I would like to place an order from SuperIdeal.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;