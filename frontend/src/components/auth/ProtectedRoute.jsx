/**
 * components/auth/ProtectedRoute.jsx
 *
 * Route guard — redirects unauthenticated users to /login.
 * Redirects authenticated users with wrong role to their correct portal.
 *
 * Props:
 *   allowedRoles: string[]  e.g. ['analyst', 'admin']
 *   children:     ReactNode
 *
 * Usage:
 *   <Route path="/ntro" element={<ProtectedRoute allowedRoles={['analyst', 'admin']}><NTRO /></ProtectedRoute>} />
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { isRoleAllowed, getHomeRoute } from '../../utils/roles'
import { LoadingState } from '../common'

export function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, isLoading, role } = useAuth()
  const location = useLocation()

  // Still restoring token from localStorage
  if (isLoading) {
    return <LoadingState message="Restoring session…" fullScreen />
  }

  // Not logged in — redirect to login, preserve intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Logged in but wrong role — redirect to their own portal
  if (!isRoleAllowed(role, allowedRoles)) {
    return <Navigate to={getHomeRoute(role)} replace />
  }

  return children
}
