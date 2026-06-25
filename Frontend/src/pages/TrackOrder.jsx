// src/pages/TrackOrder.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOrderByNumber } from '../services/api';
import { Package, CheckCircle, CookingPot, Bike, Home, AlertCircle } from 'lucide-react';

const statusConfig = {
  'Pending': { icon: Package, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  'Confirmed': { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
  'Preparing': { icon: CookingPot, color: 'text-orange-500', bg: 'bg-orange-100' },
  'Out For Delivery': { icon: Bike, color: 'text-purple-500', bg: 'bg-purple-100' },
  'Delivered': { icon: Home, color: 'text-green-500', bg: 'bg-green-100' },
};

const statusOrder = ['Pending', 'Confirmed', 'Preparing', 'Out For Delivery', 'Delivered'];

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const orderIdFromUrl = searchParams.get('id');

  const [orderId, setOrderId] = useState(orderIdFromUrl || '');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  // Auto-search when URL contains an order ID
  useEffect(() => {
    const fetchOrder = async (orderNumber) => {
      try {
        const response = await getOrderByNumber(orderNumber);
        setOrder(response.data);
        setError('');
      } catch {
        setOrder(null);
        setError('Order not found. Please check your Order ID.');
      }
    };

    if (orderIdFromUrl) {
      fetchOrder(orderIdFromUrl);
    }
  }, [orderIdFromUrl]);

  const handleSearch = async () => {
    if (!orderId.trim()) {
      setError('Please enter an Order ID');
      return;
    }
    try {
      const response = await getOrderByNumber(orderId.trim());
      setOrder(response.data);
      setError('');
    } catch {
      setOrder(null);
      setError('Order not found. Please check your Order ID.');
    }
  };

  const currentStatusIndex = order ? statusOrder.indexOf(order.status) : -1;
  const orderType = order?.orderType || 'pickup';

  return (
    <div className="py-12">
      <div className="container-custom max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Track Your Order</h1>
        <p className="text-textSecondary text-center mb-8">Enter your Order ID to check status</p>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., ORD-1734567890-123"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="input-field flex-1"
            />
            <button onClick={handleSearch} className="btn-primary">Track</button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl flex items-center gap-2">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          {order && (
            <div className="mt-8">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
                <p className="text-textSecondary">Placed on {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  {statusOrder.map((status, idx) => {
                    const IconComponent = statusConfig[status].icon;
                    const statusColor = statusConfig[status].color;
                    const statusBg = statusConfig[status].bg;
                    return (
                      <div key={status} className="text-center flex-1">
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          idx <= currentStatusIndex ? statusBg : 'bg-gray-100'
                        }`}>
                          {idx <= currentStatusIndex ? (
                            <IconComponent className={`h-4 w-4 ${statusColor}`} />
                          ) : (
                            <div className="w-2 h-2 bg-gray-300 rounded-full" />
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${idx <= currentStatusIndex ? 'text-textPrimary font-medium' : 'text-textSecondary'}`}>
                          {status}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-2 relative">
                  <div 
                    className="h-1 bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(currentStatusIndex + 1) / statusOrder.length * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Order Details</h3>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>{item.name} x{item.quantity}</span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t mt-3 pt-3 font-bold flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs. {order.subtotal || 0}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Delivery Fee</span>
                  <span>Rs. {order.deliveryFee || 0}</span>
                </div>
                <div className="border-t mt-3 pt-3 font-bold flex justify-between">
                  <span>Total Paid:</span>
                  <span>Rs. {order.totalAmount || 0}</span>
                </div>
                <p className="text-xs text-textSecondary mt-3">{orderType === 'delivery' ? `Delivery to: ${order.address}` : 'Pickup order'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;