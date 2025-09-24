import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../auth/authStore.service'

const RedirectAuthenticatedUser = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to="/info-trabajador" replace />
  }
  return children
}

export default RedirectAuthenticatedUser
