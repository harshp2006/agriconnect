import { Navigate } from 'react-router-dom'
import { useAuth, ROLES } from '../context/AuthContext.jsx'

/**
 * Wrap a page element with this to require login, and optionally a
 * specific role. Usage:
 *   <ProtectedRoute><Marketplace /></ProtectedRoute>
 *   <ProtectedRoute role={ROLES.FARMER}><FarmerDashboard /></ProtectedRoute>
 */
export default function ProtectedRoute({ role, children }) {
  const { role: currentRole } = useAuth()

  if (!currentRole) return <Navigate to="/" replace />

  if (role && currentRole !== role) {
    // Logged in, but as the wrong role — send them to their own home
    // instead of showing a dead end.
    const home = currentRole === ROLES.FARMER ? '/farmer' : '/marketplace'
    return <Navigate to={home} replace />
  }

  return children
}
