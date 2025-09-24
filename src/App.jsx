import { ThemeSwitcher } from './components/ThemeSwitcher'
import AppRouter from './routes/Router'
import { Toaster } from 'sonner'
import { useAuthStore } from '../src/auth/authStore.service'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  // Zustand: seleccioná sólo lo que usás
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    try {
      await logout() // limpia cookie/sesión en el back
      navigate('/', { replace: true }) // volvés al login sin recargar
    } catch (e) {
      // opcional: mostrar toast
      // toast.error('No se pudo cerrar sesión')
      console.error(e)
    }
  }

  return (
    <>
      <Toaster richColors closeButton />
      <div className="min-h-screen max-w-4xl mx-auto p-4 flex flex-col">
        <div className="flex flex-col items-end">
          <ThemeSwitcher />
        </div>

        {isAuthenticated && (
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Cerrar sesión
            </button>
          </div>
        )}

        {/* Usá flex-1 en vez de un h-screen anidado para evitar scroll extra */}
        <main className="flex-1">
          <AppRouter />
        </main>
      </div>
    </>
  )
}

export default App
