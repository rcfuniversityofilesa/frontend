import { createContext, useContext, useEffect, useState } from 'react'
import {
  decodeToken,
  isTokenExpired,
  isAuthenticated,
  getUserRole,
  clearAuth,
} from '../utils/jwtUtils'

const AuthContext = createContext()

/**
 * Auth Provider Component
 * Manages global authentication state
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token')

        if (!token || isTokenExpired(token)) {
          setUser(null)
          if (token) clearAuth()
        } else {
          const decoded = decodeToken(token)
          const admin = localStorage.getItem('admin')
          setUser({
            ...decoded,
            adminData: admin ? JSON.parse(admin) : null,
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
      // API call is handled by Login.jsx - this just updates context after successful login
      const token = localStorage.getItem('token')
      if (token && !isTokenExpired(token)) {
        const decoded = decodeToken(token)
        const admin = localStorage.getItem('admin')
        setUser({
          ...decoded,
          adminData: admin ? JSON.parse(admin) : null,
        })
      }
    } catch (err) {
      setError(err.message)
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
    userRole: user?.role || null,
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

/**
 * Custom hook to use Auth Context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }
  return context
}
