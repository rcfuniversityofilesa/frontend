import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * ProtectedRoute Component
 * Redirects unauthenticated users to login
 * 
 * Usage:
 * <ProtectedRoute>
 *   <YourComponent />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({
  children,
  redirectTo = '/admin/login',
}) {
  const { isLoading, isAuthenticated } = useAuth()

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        Loading...
      </div>
    )
  }

  // User not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // User authenticated - render children
  return children
}
