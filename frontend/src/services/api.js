import axios from 'axios'

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth services
export const authService = {
  register: data => api.post('/auth/register', data),
  login: data => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me')
}

// Task services
export const taskService = {
  getTasks: params => api.get('/tasks', { params }),
  getTask: id => api.get(`/tasks/${id}`),
  createTask: data => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: id => api.delete(`/tasks/${id}`)
}

// Admin services
export const adminService = {
  getUsers: () => api.get('/admin/users'),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser: id => api.delete(`/admin/users/${id}`),
  getStatistics: () => api.get('/admin/statistics')
}

export default api
