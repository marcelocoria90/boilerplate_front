import { ThemeSwitcher } from './components/ThemeSwitcher'
import AppRouter from './routes/Router'
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <div className='max-w-4xl mx-auto p-4'>
        <div className="flex flex-col items-end">
          <ThemeSwitcher />
        </div>
        <div className="mt-6">
          <AppRouter />
        </div>
      </div>
    </>
  )
}

export default App