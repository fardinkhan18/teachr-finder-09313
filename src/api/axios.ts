import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: Add auth token from storage if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Handle common errors (401, 403, etc.)
    return Promise.reject(error);
  }
);

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';
