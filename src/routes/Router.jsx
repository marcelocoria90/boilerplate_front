import { Navigate, Route, Routes } from 'react-router-dom'
import WorkerPage from '../pages/worker/WorkerPage.jsx'
import ComponentesPage from '../pages/examplee-components/ComponentesPage.jsx'
import Login from '../pages/auth/login/components/Login.jsx'
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx'
import RedirectAuthenticatedUser from '../components/auth/RedirectAuthenticatedUser.jsx'

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/info-trabajador"
        element={
          <ProtectedRoute>
            <WorkerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/example-components"
        element={
          <ProtectedRoute>
            <ComponentesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
