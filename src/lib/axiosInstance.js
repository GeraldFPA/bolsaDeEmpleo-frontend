
import axios from 'axios';
import { useUserStore } from '@/stores/user';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000, // 10 segundos de espera
});

// Agregar token automáticamente en cada request
axiosInstance.interceptors.request.use(config => {
const userStore = useUserStore();

  const token = userStore.token; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    console.warn('No autorizado. Verificá tu token.');
  }
  return Promise.reject(error);
});

export default axiosInstance;
