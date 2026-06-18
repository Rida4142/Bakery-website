// src/services/orderService.js
const ORDERS_STORAGE_KEY = 'bakery_orders';

export const saveOrder = (orderData) => {
  const orders = getOrders();
  const newOrder = {
    id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...orderData,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  return newOrder;
};

export const getOrders = () => {
  const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
  return ordersJson ? JSON.parse(ordersJson) : [];
};

export const getOrderById = (id) => {
  const orders = getOrders();
  return orders.find(order => order.id === id);
};

export const updateOrderStatus = (orderId, newStatus) => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    orders[orderIndex].updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return orders[orderIndex];
  }
  return null;
};

export const deleteOrder = (orderId) => {
  const orders = getOrders();
  const filteredOrders = orders.filter(order => order.id !== orderId);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filteredOrders));
};

export const getNextStatuses = (currentStatus, orderType) => {
  if (orderType === 'delivery') {
    const flow = {
      'Pending': 'Confirmed',
      'Confirmed': 'Out for Delivery',
      'Out for Delivery': 'Delivered',
      'Delivered': null,
    };
    return flow[currentStatus] || null;
  } else {
    const flow = {
      'Pending': 'Confirmed',
      'Confirmed': 'Completed',
      'Completed': null,
    };
    return flow[currentStatus] || null;
  }
};

export const getStatusColor = (status) => {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-blue-100 text-blue-800',
    'Out for Delivery': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Completed': 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getOrderType = (order) => {
  return order.orderType || 'pickup';
};
