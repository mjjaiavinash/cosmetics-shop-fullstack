import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API_USER_URL = `${API_BASE_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_USER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Authentication APIs
export const userAuth = {
  // User Signup
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  // User Login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }
};

export default api;