import { createContext, useContext, useEffect, useState } from 'react'
import {
  decodeToken,
  isTokenExpired,
  isAuthenticated,
  getUserRole,
  clearAuth,
} from '../utils/jwtUtils'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)  
  const [error, setError] = useState(null)

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token')

        if (!token || isTokenExpired(token)) {
          setUser(null)
          if (token) clearAuth()
        } else {
          const decoded = decodeToken(token) || {}
          const admin = localStorage.getItem('admin')
          const adminData = admin ? JSON.parse(admin) : null

          const roleFromToken = decoded.role
          const finalRole = roleFromToken || adminData?.role || null

          setUser({
            ...decoded,
            role: finalRole,
            adminData,
          })
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
        setError(err.message)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const adminData = localStorage.getItem('admin')
      
      if (!token || isTokenExpired(token)) {
        setError('Invalid or expired token')
        setUser(null)
        return
      }

      const decoded = decodeToken(token) || {}
      const parsedAdmin = adminData ? JSON.parse(adminData) : null

      const finalRole = decoded.role || parsedAdmin?.role || null

      // Update context with decoded token and admin data
      setUser({
        ...decoded,
        role: finalRole,
        adminData: parsedAdmin,
      })
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message)
      setUser(null)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    clearAuth()
    setUser(null)
    setError(null)
  }

  const updateUser = (userData) => {
    setUser(userData)
  }

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated:
      user !== null && isAuthenticated(),
    userRole: user?.role ? user.role.toString().toLowerCase() : null,
    login,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }
  return context
}
