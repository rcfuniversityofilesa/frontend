/**
 * JWT Utilities
 * Handles token validation, decoding, and expiration checks
 */

/**
 * Decode JWT token without verification (safe for frontend)
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null

    const parts = token.split('.')
    if (parts.length !== 3) return null

    const decoded = JSON.parse(atob(parts[1]))
    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - true if expired, false otherwise
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true

  // exp is in seconds, convert to milliseconds
  const expirationTime = decoded.exp * 1000
  const currentTime = Date.now()

  return currentTime >= expirationTime
}

/**
 * Check if user is authenticated
 * @returns {boolean} - true if valid token exists and not expired
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  return !isTokenExpired(token)
}

/**
 * Get user role from token
 * @returns {string|null} - User role or null
 */
export const getUserRole = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  const decoded = decodeToken(token)
  return decoded?.role || null
}

/**
 * Get user information from token
 * @returns {object|null} - User data from token
 */
export const getUserData = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  return decodeToken(token)
}

/**
 * Clear authentication data
 */
export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('admin')
}

/**
 * Check if user has specific role
 * @param {string} requiredRole - Required role
 * @returns {boolean} - true if user has required role
 */
export const hasRole = (requiredRole) => {
  const role = getUserRole()
  return role === requiredRole
}
