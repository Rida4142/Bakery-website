// src/pages/Orders.jsx
import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { getOrders, updateOrderStatus, getNextStatuses, getStatusColor, getOrderType } from '../services/orderService';
import { FiFilter, FiDownload, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Clock, CheckCircle, Rocket, Compass, Anchor, Heart, RefreshCw, Bike, Truck, Navigation } from 'lucide-react';

const STATUS_OPTIONS = {
  pickup: ['Pending', 'Confirmed', 'Completed'],
  delivery: ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered'],
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    let result = [...orders];
    if (filter !== 'all') {
      result = result.filter(o => o.status === filter);
    }
    if (search) {
      result = result.filter(o => 
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer?.customerName.toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      if (sortField === 'createdAt') {
        return sortDir === 'desc' ? new Date(bVal) - new Date(aVal) : new Date(aVal) - new Date(bVal);
      }
      if (sortField === 'total') {
        return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
      }
      return sortDir === 'desc' ? String(bVal).localeCompare(String(aVal)) : String(aVal).localeCompare(String(bVal));
    });
    setFilteredOrders(result);
  }, [orders, filter, search, sortField, sortDir]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getOrders());
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-3.5 h-3.5" />;
      case 'Confirmed': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Out for Delivery': return <Truck className="w-3.5 h-3.5" />;
      case 'Delivered': return <Bike className="w-3.5 h-3.5" />;
      case 'Completed': return <CheckCircle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track all customer orders</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1f1f] focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1f1f]"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => { setSortField('id'); setSortDir(sortField === 'id' ? (sortDir === 'asc' ? 'desc' : 'asc') : 'desc'); }}>
                  <div className="flex items-center gap-1">Order ID {sortField === 'id' && (sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => { setSortField('customer'); setSortDir(sortField === 'customer' ? (sortDir === 'asc' ? 'desc' : 'asc') : 'desc'); }}>
                  <div className="flex items-center gap-1">Customer {sortField === 'customer' && (sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Type</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => { setSortField('total'); setSortDir(sortField === 'total' ? (sortDir === 'asc' ? 'desc' : 'asc') : 'desc'); }}>
                  <div className="flex items-center gap-1">Total {sortField === 'total' && (sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => { setSortField('createdAt'); setSortDir(sortField === 'createdAt' ? (sortDir === 'asc' ? 'desc' : 'asc') : 'desc'); }}>
                  <div className="flex items-center gap-1">Date {sortField === 'createdAt' && (sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : filteredOrders.map(order => {
                const orderType = getOrderType(order);
                const nextStatus = getNextStatuses(order.status, orderType);
                return (
                  <>
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                      <td className="py-4 px-6 font-medium text-gray-800">{order.id.slice(-8)}</td>
                      <td className="py-4 px-6 text-gray-700">{order.customer?.customerName || 'Guest'}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${orderType === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                          {orderType === 'delivery' ? <Truck size={12} /> : <Navigation size={12} />}
                          {orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-800">Rs. {order.total}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{formatDate(order.createdAt)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#cc1f1f] ${getStatusColor(order.status)}`}
                          >
                            {(STATUS_OPTIONS[orderType] || STATUS_OPTIONS.pickup).map(status => (
                              <option key={status} value={status} className="text-gray-800">{status}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                          >
                            {expandedOrder === order.id ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order.id && (
                      <tr className="bg-gray-50/50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Customer Details</p>
                              <p className="text-sm text-gray-800"><strong>Name:</strong> {order.customer?.customerName}</p>
                              <p className="text-sm text-gray-800"><strong>Phone:</strong> {order.customer?.phone}</p>
                              {order.orderType === 'delivery' && <p className="text-sm text-gray-800"><strong>Address:</strong> {order.customer?.address}</p>}
                              {order.notes && <p className="text-sm text-gray-600 mt-1"><strong>Notes:</strong> {order.notes}</p>}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Order Items</p>
                              <div className="space-y-1">
                                {order.items?.map((item, i) => (
                                  <div key={i} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{item.name} {item.selectedSize ? `(${item.selectedSize})` : ''} x{item.quantity}</span>
                                    <span className="text-gray-600">Rs. {item.price * item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t mt-2 pt-2 flex justify-between text-sm font-semibold">
                                <span>Subtotal</span>
                                <span>Rs. {order.subtotal}</span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Delivery Fee</span>
                                <span>Rs. {order.deliveryFee}</span>
                              </div>
                              <div className="flex justify-between text-sm font-bold text-gray-800">
                                <span>Total</span>
                                <span>Rs. {order.total}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
