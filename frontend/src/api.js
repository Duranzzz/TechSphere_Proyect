import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const login = async (email, password) => {
  const response = await api.post('/auth/login/', { email, password });
  return response.data;
};

// Productos
export const getProductos = async (params = {}) => {
  const response = await api.get('/productos/', { params });
  return response.data;
};

export const getProducto = async (id) => {
  const response = await api.get(`/productos/${id}/`);
  return response.data;
};

export const createProducto = async (data) => {
  const response = await api.post('/productos/', data);
  return response.data;
};

export const updateProducto = async (id, data) => {
  const response = await api.put(`/productos/${id}/`, data);
  return response.data;
};

export const deleteProducto = async (id) => {
  const response = await api.delete(`/productos/${id}/`);
  return response.data;
};

// Categorías
export const getCategorias = async () => {
  const response = await api.get('/categorias/');
  return response.data;
};

// Marcas
export const getMarcas = async () => {
  const response = await api.get('/marcas/');
  return response.data;
};

// Dashboard
export const getDashboardMetrics = async () => {
  const response = await api.get('/dashboard/metrics/');
  return response.data;
};

export default api;

