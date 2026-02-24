import axios from 'axios'
import toast from 'react-hot-toast'
import { clearAuth } from '../utils/jwtUtils'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'https://backend-04sy.onrender.com/api',
  timeout: 30000,
})

/**
 * Request Interceptor
 * Attaches JWT token to every request
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 * Handles errors globally:
 * - 401: Token invalid/expired, clear auth and redirect to login
 * - 403: User lacks required permissions, show unauthorized message
 * - 500: Server error
 * - Other: Network or client errors
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.message ||
      'An error occurred'

    switch (status) {
      case 401:
        // Token expired or invalid
        clearAuth()
        toast.error('Session expired. Please login again.')
        window.location.href = '/admin/login'
        break

      case 403:
        // User lacks permissions
        toast.error(
          'You are not authorized to access this resource.'
        )
        window.location.href = '/admin/unauthorized'
        break

      case 400:
        toast.error(message)
        break

      case 500:
        toast.error(
          'Server error. Please try again later.'
        )
        break

      default:
        if (error.message === 'Network Error') {
          toast.error(
            'Network error. Please check your connection.'
          )
        } else {
          toast.error(message)
        }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
