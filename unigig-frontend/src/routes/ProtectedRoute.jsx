import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ROLES } from '../constants/roles'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuth()

  if (!token || !user) {
    const isAdminRoute = allowedRoles?.length === 1 && allowedRoles[0] === ROLES.ADMIN
    return <Navigate to={isAdminRoute ? '/admin/login' : '/login'} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute