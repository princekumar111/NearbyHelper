// src/utils/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // or your deployed URL
});

// Automatically attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Catch JWT expiration globally
API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.data?.msg === 'jwt expired') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default API;
