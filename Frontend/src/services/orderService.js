// src/services/orderService.js
import API from './api';

export const getOrders = async (params = {}) => {
  const res = await API.get('/orders/admin', { params });
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await API.get(`/orders/admin/${id}`);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await API.patch(`/orders/admin/${id}/status`, { status });
  return res.data;
};

export const getStatusColor = (status) => {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-blue-100 text-blue-800',
    'Preparing': 'bg-orange-100 text-orange-800',
    'Out For Delivery': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getOrderType = (order) => {
  return order?.orderType || 'pickup';
};