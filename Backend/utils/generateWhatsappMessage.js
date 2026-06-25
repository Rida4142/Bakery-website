// utils/generateWhatsAppMessage.js
// Builds the pre-filled WhatsApp message text from an order object.
// Stored on the order so admin always sees exactly what was sent.

const generateWhatsAppMessage = (order) => {
  const itemLines = order.items
    .map((item) => {
      const sizeLabel = item.size ? ` (${item.size})` : '';
      return `• ${item.name}${sizeLabel} x${item.quantity} — Rs.${item.price * item.quantity}`;
    })
    .join('\n');

  const deliveryInfo = order.orderType === 'delivery'
    ? `🚚 Delivery Distance: ${order.deliveryDistance || 0} km\n🏷️ Delivery Fee: Rs.${order.deliveryFee || 0}\n📍 Address: ${order.address || 'Not provided'}`
    : '🏠 Pickup order';

  const emailLine = order.email ? `✉️ *Email:* ${order.email}\n` : '';
  const notesLine = order.notes ? `📝 *Notes:* ${order.notes}\n` : '';

  const message = `\n🛒 *NEW ORDER — ${order.orderNumber}*\n\n👤 *Customer:* ${order.customerName}\n📞 *Phone:* ${order.phone}\n${emailLine}${notesLine}${deliveryInfo}\n\n*Items:*\n${itemLines}\n\n💰 *Total: Rs.${order.totalAmount}*\n\n_Sent via website order form_`.trim();

  return message;
};

module.exports = generateWhatsAppMessage;