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


export const isTokenExpired = (token) => {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true

  // exp is in seconds, convert to milliseconds
  const expirationTime = decoded.exp * 1000
  const currentTime = Date.now()

  return currentTime >= expirationTime
}


export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  return !isTokenExpired(token)
}


export const getUserRole = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  const decoded = decodeToken(token)
  return decoded?.role || null
}


export const getUserData = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  return decodeToken(token)
}


export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('admin')
}


export const hasRole = (requiredRole) => {
  const role = getUserRole()
  return role === requiredRole
}
