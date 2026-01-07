// API Service Layer - Centralized API communication
// Structure ready for React expansion - can be easily converted to Redux actions or React hooks

const API_BASE_URL = '/api';

const api = {
  // Helper function to make API requests
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token && !options.skipAuth) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Authentication endpoints
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });

    // Store token and user data
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },

  async register(firstName, lastName, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      skipAuth: true,
    });

    // Store token and user data
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },

  async getCurrentUser() {
    return await this.request('/auth/me');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  // Course endpoints
  async getCourses(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.category && filters.category !== 'all') {
      queryParams.append('category', filters.category);
    }
    if (filters.level && filters.level !== 'all') {
      queryParams.append('level', filters.level);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    const query = queryParams.toString();
    return await this.request(`/courses${query ? '?' + query : ''}`, {
      skipAuth: true,
    });
  },

  async getCourse(id) {
    return await this.request(`/courses/${id}`, {
      skipAuth: true,
    });
  },

  // Enrollment endpoints
  async enrollInCourse(courseId) {
    return await this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  },

  async getEnrolledCourses() {
    return await this.request('/enrollments/my-courses');
  },

  async unenrollFromCourse(courseId) {
    return await this.request(`/enrollments/${courseId}`, {
      method: 'DELETE',
    });
  },
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.api = api;
}
