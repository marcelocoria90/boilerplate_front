import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../auth/authStore.service'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // if (!user.emailVerified) {
  //   return <Navigate to="/verify-email" replace />
  // }

  return children
}

export default ProtectedRoute
