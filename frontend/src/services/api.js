/**
 * AgriConnect API Service
 * Connects the frontend to the deployed Railway backend with graceful fallback to local data.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agriconnect-production-120e.up.railway.app';

export const api = {
  baseUrl: API_BASE_URL,

  // Check health of the deployed Railway backend
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error(`Health check returned status ${res.status}`);
      return await res.json();
    } catch (error) {
      console.warn('Railway backend health check failed:', error);
      return { status: 'offline', error: error.message };
    }
  },

  // Generic request wrapper with auto error handling
  request: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      });
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`Request to ${url} failed, fallback may be used:`, err.message);
      throw err;
    }
  },

  // Auth endpoints (calls backend if available, fallback to mock user)
  login: async (credentials) => {
    try {
      return await api.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    } catch {
      return {
        token: 'jwt-demo-token',
        user: {
          name: credentials.fullName || (credentials.role === 'FARMER' ? 'Ramesh Kumar' : 'Sunil Sharma'),
          phone: credentials.phone || '9876543210',
          role: credentials.role || 'FARMER',
          location: credentials.location || (credentials.role === 'FARMER' ? 'Ludhiana, Punjab' : 'Noida, UP'),
          fpo: credentials.fpoName || 'Kisan Direct FPO'
        }
      };
    }
  },

  // Fetch listed harvest products
  getProducts: async () => {
    try {
      return await api.request('/api/products');
    } catch {
      return null; // Signals component to retain primary rich harvest catalogue
    }
  },

  // Create / list crop batch
  createCrop: async (cropData) => {
    try {
      return await api.request('/api/crops', {
        method: 'POST',
        body: JSON.stringify(cropData)
      });
    } catch {
      return { success: true, item: cropData };
    }
  },

  // Fetch live order tracking details
  getOrderTracking: async (orderId = 'AC-88392') => {
    try {
      return await api.request(`/api/orders/${orderId}/tracking`);
    } catch {
      return null;
    }
  }
};

export default api;
