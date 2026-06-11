import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API_ADMIN_URL = `${API_BASE_URL}/api/admin`;

const api = axios.create({
  baseURL: API_ADMIN_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminAuth = {
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  getProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  addProduct: async (product) => {
    try {
      const response = await api.post('/products', product);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  updateProduct: async (id, product) => {
    try {
      const response = await api.put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  getCustomers: async () => {
    try {
      const response = await api.get('/customers');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  getContacts: async () => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  getAdmins: async () => {
    try {
      const response = await api.get('/admins');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  addAdmin: async (adminData) => {
    try {
      const response = await api.post('/admins', adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  updateAdmin: async (id, adminData) => {
    try {
      const response = await api.put(`/admins/${id}`, adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  updateAdmin: async (id, adminData) => {
    try {
      const response = await api.put(`/admins/${id}`, adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },

  deleteAdmin: async (id) => {
    try {
      const response = await api.delete(`/admins/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }
};

// Order and Cart API
export const orderAPI = {
  placeOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }
};

export const cartAPI = {
  addToCart: async (cartData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/cart/add`, cartData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  },
  
  getCart: async (sessionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }
};

export default api;