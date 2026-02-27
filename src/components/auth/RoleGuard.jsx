import { useAuth } from '../../context/AuthContext'
import Unauthorized from '../../pages/admin/Unauthorized'

/**
 * RoleGuard Component
 * Prevents rendering of components before role verification
 * 
 * Usage:
 * <RoleGuard requiredRole="workersInTraining">
 *   <YourComponent />
 * </RoleGuard>
 */
export default function RoleGuard({
  children,
  requiredRole,
  fallback = <Unauthorized />,
}) {
  const { isLoading, isAuthenticated, userRole } =
    useAuth()

  // Show nothing while loading
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
        Verifying access...
      </div>
    )
  }

  // User not authenticated
  if (!isAuthenticated) {
    return fallback
  }

  // User authenticated but wrong role
  // compare case-insensitively; both sides should already be lowercased
  const normalizedUserRole = userRole ? userRole.toString().toLowerCase() : ''
  const normalizedRequired = requiredRole
    ? requiredRole.toString().toLowerCase()
    : ''

  if (normalizedUserRole !== normalizedRequired) {
    return fallback
  }

  // User has correct role - render children
  return children
}
