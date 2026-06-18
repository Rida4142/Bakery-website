// src/pages/Cart.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Truck, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useMemo } from 'react';
import { saveOrder } from '../services/orderService';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderType, setOrderType] = useState('pickup');
  const [deliveryDistance, setDeliveryDistance] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phone: '',
    notes: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const hasCakes = cartItems.some(item => item.pickupOnly);

  const getDeliveryFee = (distance) => {
    if (!distance || isNaN(distance) || Number(distance) <= 0) return 0;
    const d = Number(distance);
    if (d <= 2) return 50;
    if (d <= 5) return 100;
    if (d <= 10) return 150;
    return 200;
  };

  const deliveryFee = orderType === 'delivery' ? getDeliveryFee(deliveryDistance) : 0;
  const subtotal = getCartTotal();
  const grandTotal = subtotal + deliveryFee;

  const handleOrderTypeChange = (type) => {
    if (type === 'delivery' && hasCakes) {
      setError('Delivery is not available for cakes. Please select Pickup or remove cakes from cart.');
      return;
    }
    setError('');
    setOrderType(type);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendWhatsAppOrder = (order) => {
    const phoneNumber = '923416401994';
    const itemsList = order.items.map(item => 
      `${item.name} x${item.quantity} = Rs.${item.price * item.quantity}`
    ).join('%0A');
    const typeText = order.orderType === 'delivery' ? `Delivery Distance: ${order.deliveryDistance} km%0A` : '';
    const message = `*New Order #${order.id}*%0A%0A*Type:* ${order.orderType.toUpperCase()}%0A${typeText}*Customer:* ${order.customer.customerName}%0A*Phone:* ${order.customer.phone}%0A${order.orderType === 'delivery' ? `*Address:* ${order.customer.address}%0A` : ''}*Notes:* ${order.customer.notes || 'None'}%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* Rs.${order.subtotal}%0A*Delivery Fee:* Rs.${order.deliveryFee}%0A*Total:* Rs.${order.total}%0A%0AThank you!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePlaceOrder = () => {
    if (!formData.customerName || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }
    if (orderType === 'delivery' && (!formData.address || !deliveryDistance)) {
      alert('Please provide delivery address and distance');
      return;
    }

    const orderData = {
      customer: formData,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        selectedSize: item.selectedSize || null,
      })),
      orderType,
      deliveryDistance: orderType === 'delivery' ? Number(deliveryDistance) : 0,
      subtotal,
      deliveryFee,
      total: grandTotal,
    };

    const newOrder = saveOrder(orderData);
    setOrderId(newOrder.id);
    setOrderPlaced(true);
    clearCart();
    sendWhatsAppOrder(newOrder);
  };

  const handleTrackOrder = () => {
    navigate(`/track-order?id=${orderId}`);
  };

  if (orderPlaced) {
    return (
      <div className="py-20">
        <div className="container-custom text-center">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-auto">
            <div className="text-primary text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-textSecondary mb-2">Your Order ID: <span className="font-bold text-primary">{orderId}</span></p>
            <p className="text-sm mb-6">A WhatsApp message has been sent to the bakery.</p>
            <button onClick={handleTrackOrder} className="btn-primary inline-block mb-3 w-full">
              Track Your Order
            </button>
            <button onClick={() => navigate('/')} className="text-primary underline block mt-2">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !isCheckout) {
    return (
      <div className="py-20">
        <div className="container-custom text-center">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-textSecondary mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/menu" className="btn-primary inline-block">Browse Menu</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {!isCheckout && (
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="text-lg font-bold mb-3">Order Type</h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleOrderTypeChange('pickup')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition ${
                  orderType === 'pickup'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 text-gray-700 hover:border-primary'
                }`}
              >
                <Store size={20} /> Pickup — Free
              </button>
              <button
                onClick={() => handleOrderTypeChange('delivery')}
                disabled={hasCakes}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition ${
                  orderType === 'delivery'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 text-gray-700 hover:border-primary'
                } ${hasCakes ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Truck size={20} /> Delivery
              </button>
            </div>
            {hasCakes && (
              <p className="text-xs text-red-500 mt-2">Cakes can only be picked up. Delivery is disabled while cakes are in cart.</p>
            )}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            
            {orderType === 'delivery' && (
              <div className="mt-4">
                <label className="block font-medium mb-1">Delivery Distance (km)</label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={deliveryDistance}
                  onChange={(e) => {
                    setDeliveryDistance(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter distance in km"
                  className="input-field max-w-xs"
                />
                {deliveryDistance && Number(deliveryDistance) > 0 && (
                  <p className="text-sm text-gray-600 mt-1">Delivery Fee: Rs. {getDeliveryFee(deliveryDistance)}</p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  Fee: ≤2km: Rs.50 | ≤5km: Rs.100 | ≤10km: Rs.150 | &gt;10km: Rs.200
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.pickupOnly && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Pickup Only</span>}
                  <p className="text-primary font-bold">Rs. {item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="p-1 bg-gray-100 rounded"><Minus size={16} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="p-1 bg-gray-100 rounded"><Plus size={16} /></button>
                    <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="ml-auto text-red-500"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl p-6 h-fit shadow-sm">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 text-textSecondary">
              <div className="flex justify-between"><span>Subtotal:</span><span>Rs. {subtotal}</span></div>
              <div className="flex justify-between"><span>Delivery Fee:</span><span>Rs. {deliveryFee}</span></div>
              <div className="border-t pt-2 mt-2 font-bold text-textPrimary text-lg flex justify-between"><span>Total:</span><span>Rs. {grandTotal}</span></div>
            </div>
            <button onClick={() => setIsCheckout(true)} className="btn-primary w-full mt-6">Proceed to Checkout</button>
          </div>
        </div>
        
        {isCheckout && (
          <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm max-w-2xl">
            <button onClick={() => setIsCheckout(false)} className="flex items-center gap-2 text-primary mb-6">
              <ArrowLeft size={20} /> Back to Cart
            </button>
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Full Name *</label>
                <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} className="input-field" required />
              </div>
              {orderType === 'delivery' && (
                <>
                  <div>
                    <label className="block font-medium mb-1">Delivery Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="input-field" required />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Delivery Distance (km) *</label>
                    <input
                      type="number"
                      name="deliveryDistance"
                      min="1"
                      step="0.5"
                      value={deliveryDistance}
                      onChange={(e) => setDeliveryDistance(e.target.value)}
                      className="input-field max-w-xs"
                      required
                    />
                    {deliveryDistance && Number(deliveryDistance) > 0 && (
                      <p className="text-sm text-gray-600 mt-1">Delivery Fee: Rs. {getDeliveryFee(deliveryDistance)}</p>
                    )}
                  </div>
                </>
              )}
              {orderType === 'pickup' && (
                <div>
                  <label className="block font-medium mb-1">Pickup Location</label>
                  <p className="text-sm text-gray-600">Sweet Bakery, Main Market, City Center</p>
                </div>
              )}
              <div>
                <label className="block font-medium mb-1">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Special Instructions (Optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} className="input-field" />
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between py-2"><span>Subtotal:</span><span>Rs. {subtotal}</span></div>
                <div className="flex justify-between py-2"><span>Delivery Fee:</span><span>Rs. {deliveryFee}</span></div>
                <div className="border-t pt-2 mt-2 font-bold text-textPrimary text-lg flex justify-between"><span>Total:</span><span>Rs. {grandTotal}</span></div>
              </div>
              <button type="button" onClick={handlePlaceOrder} className="btn-primary w-full py-3">Place Order</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
