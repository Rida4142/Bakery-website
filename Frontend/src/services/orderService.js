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