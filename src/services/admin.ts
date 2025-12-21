import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// Usuarios
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// Carpinteros
export const getAllCarpinteros = async () => {
  const response = await api.get('/admin/carpinteros');
  return response.data;
};

export const deleteCarpintero = async (id: string) => {
  const response = await api.delete(`/admin/carpinteros/${id}`);
  return response.data;
};

// Productos
export const getAllProductosAdmin = async () => {
  const response = await api.get('/admin/productos');
  return response.data;
};

export const deleteProducto = async (id: string) => {
  const response = await api.delete(`/admin/productos/${id}`);
  return response.data;
};

// Reseñas
export const getAllReseñas = async () => {
  const response = await api.get('/admin/reseñas');
  return response.data;
};

export const deleteReseña = async (id: string) => {
  const response = await api.delete(`/admin/reseñas/${id}`);
  return response.data;
};

// Contratos
export const getAllContratos = async () => {
  const response = await api.get('/admin/contratos');
  return response.data;
};

export const deleteContrato = async (id: string) => {
  const response = await api.delete(`/admin/contratos/${id}`);
  return response.data;
};