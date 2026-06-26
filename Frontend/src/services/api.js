// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If token expires, redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const getProducts = () => API.get("/products");
export const getProductsByCategory = (category) => API.get(`/products?category=${category}`);
export const getCategories = () => API.get("/categories");
export const getAdminCategories = () => API.get("/admin/categories");
export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrderByNumber = (orderNumber) => API.get(`/orders/track/${orderNumber}`);
export const getTopProducts = () => API.get("/admin/reports/top-products");
export const uploadImage = (file) => {
  const form = new FormData();
  form.append("image", file);
  return API.post("/admin/upload", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export default API;