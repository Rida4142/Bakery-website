import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getProducts = () => API.get("/products");
export const getProductsByCategory = (category) =>
  API.get(`/products?category=${category}`);

export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrders = () => API.get("/orders");
export const updateOrderStatus = (id, status) =>
  API.patch(`/orders/${id}/status`, { status });

export default API;