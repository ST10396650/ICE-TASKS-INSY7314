import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// creating axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// adding token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

export const authService = {
  login: async (email, password) => {
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    
    const response = await api.post('/auth/login', {
      email: sanitizedEmail,
      password: sanitizedPassword
    });
    return response.data;
  },

  register: async (email, password) => {
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    
    const response = await api.post('/auth/register', {
      email: sanitizedEmail,
      password: sanitizedPassword
    });
    return response.data;
  },

  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};