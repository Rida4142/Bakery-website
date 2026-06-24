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

  const message = `
🛒 *NEW ORDER — ${order.orderNumber}*

👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.phone}
📍 *Address:* ${order.address || 'Not provided'}

*Items:*
${itemLines}

💰 *Total: Rs.${order.totalAmount}*

_Sent via website order form_
`.trim();

  return message;
};

module.exports = generateWhatsAppMessage;