// src/pages/Orders.jsx
import React, { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { getOrders, updateOrderStatus, getStatusColor, getOrderType } from '../services/orderService';
import { FiSearch, FiChevronDown, FiChevronUp, FiRefreshCw } from 'react-icons/fi';
import { Clock, CheckCircle, Bike, Truck, Navigation } from 'lucide-react';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Preparing', 'Out For Delivery', 'Delivered', 'Cancelled'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (filter) params.status = filter;
      const data = await getOrders(params);
      setOrders(data.orders || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev =>
        prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
      );
    } catch (err) {
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-3.5 h-3.5" />;
      case 'Confirmed': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Out For Delivery': return <Truck className="w-3.5 h-3.5" />;
      case 'Delivered': return <Bike className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-PK', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const filteredOrders = search
    ? orders.filter(o =>
        o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        o.phone?.includes(search)
      )
    : orders;

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            {total} total orders
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm"
        >
          <FiRefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by order number, customer name, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1f1f] focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1f1f]"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Order #</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Customer</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Phone</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Type</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Total</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Date</th>
                <th className="text-left py-3.5 px-6 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="w-6 h-6 border-2 border-[#cc1f1f] border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">No orders found</td>
                </tr>
              ) : filteredOrders.map(order => (
                <React.Fragment key={order._id}>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-800">#{order.orderNumber}</td>
                    <td className="py-4 px-6 text-gray-700">{order.customerName || 'Guest'}</td>
                    <td className="py-4 px-6 text-gray-500">{order.phone}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${order.orderType === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                        {order.orderType === 'delivery' ? <Truck size={12} /> : <Navigation size={12} />}
                        {order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-800">Rs. {order.totalAmount}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#cc1f1f] bg-white disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                        >
                          {expandedOrder === order._id ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedOrder === order._id && (
                    <tr className="bg-gray-50/50">
                      <td colSpan={8} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Customer Details</p>
                            <p className="text-sm text-gray-800 mb-1"><strong>Name:</strong> {order.customerName}</p>
                            <p className="text-sm text-gray-800 mb-1"><strong>Phone:</strong> {order.phone}</p>
                            {order.email && <p className="text-sm text-gray-800 mb-1"><strong>Email:</strong> {order.email}</p>}
                            {order.orderType === 'delivery' && (
                              <p className="text-sm text-gray-800 mb-1"><strong>Address:</strong> {order.address}</p>
                            )}
                            {order.orderType === 'delivery' && (
                              <p className="text-sm text-gray-800 mb-1"><strong>Distance:</strong> {order.deliveryDistance} km</p>
                            )}
                            {order.notes && (
                              <p className="text-sm text-gray-600 mt-2"><strong>Notes:</strong> {order.notes}</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Order Items</p>
                            <div className="space-y-2">
                              {order.items?.map((item, i) => (
                                <div key={`${item.productId || item.name || 'item'}-${i}`} className="flex justify-between text-sm">
                                  <span className="text-gray-700">
                                    {item.name} {item.size ? `(${item.size})` : ''} x{item.quantity}
                                  </span>
                                  <span className="text-gray-600 font-medium">Rs. {item.price * item.quantity}</span>
                                </div>
                              ))}
                            </div>
                            <div className="border-t mt-3 pt-3 space-y-1">
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>Rs. {order.subtotal}</span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Delivery Fee</span>
                                <span>Rs. {order.deliveryFee}</span>
                              </div>
                              <div className="flex justify-between text-sm font-bold text-gray-800 pt-1 border-t">
                                <span>Total</span>
                                <span>Rs. {order.totalAmount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 20 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} orders
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page * 20 >= total}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}