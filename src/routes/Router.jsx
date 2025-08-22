import { Route, Routes } from 'react-router-dom'
import WorkerPage from '../pages/worker/WorkerPage.jsx'
import AgendarCertificadoPage from '../pages/agendar-certificado/AgendarCertificadoPage.jsx'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>Pagina de inicio</h1>} />
      <Route path='/info-trabajador' element={<WorkerPage />} />
      <Route path='/agendar-certificado' element={<AgendarCertificadoPage />} />
    </Routes>
  )
}

export default AppRouter