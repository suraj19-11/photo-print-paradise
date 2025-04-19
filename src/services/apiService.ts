
// API Service for external Node.js/Express backend

const API_URL = 'http://localhost:5000/api';

// Helper function for handling API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error occurred' }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  return response.json();
};

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  register: async (userData: { email: string, password: string, firstName: string, lastName: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => localStorage.getItem('token'),

  isAuthenticated: () => !!localStorage.getItem('token')
};

// Photo services
export const photoService = {
  uploadPhoto: async (file: File, userId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const response = await fetch(`${API_URL}/photos/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: formData
    });
    return handleResponse(response);
  },

  getUserPhotos: async (userId: string) => {
    const response = await fetch(`${API_URL}/photos/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    return handleResponse(response);
  },

  deletePhoto: async (photoId: string, userId: string) => {
    const response = await fetch(`${API_URL}/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify({ userId })
    });
    return handleResponse(response);
  }
};

// Document services
export const documentService = {
  uploadDocument: async (file: File, userId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const response = await fetch(`${API_URL}/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: formData
    });
    return handleResponse(response);
  },

  getUserDocuments: async (userId: string) => {
    const response = await fetch(`${API_URL}/documents/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    return handleResponse(response);
  },

  deleteDocument: async (documentId: string, userId: string) => {
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify({ userId })
    });
    return handleResponse(response);
  }
};

// Order services
export const orderService = {
  createOrder: async (orderData: any) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },

  getUserOrders: async (userId: string) => {
    const response = await fetch(`${API_URL}/orders/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    return handleResponse(response);
  },

  getOrderDetails: async (orderId: string) => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    return handleResponse(response);
  }
};

// Payment services
export const paymentService = {
  createPaymentIntent: async (amount: number) => {
    const response = await fetch(`${API_URL}/payments/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify({ amount })
    });
    return handleResponse(response);
  },

  processPayment: async (paymentData: any) => {
    const response = await fetch(`${API_URL}/payments/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(paymentData)
    });
    return handleResponse(response);
  }
};

// User services
export const userService = {
  updateProfile: async (userId: string, profileData: any) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  },

  getProfile: async (userId: string) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    return handleResponse(response);
  }
};
