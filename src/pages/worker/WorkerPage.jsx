import { WorkerInfo } from './components/WorkerInfo'
import { WorkerTab } from './components/WorkerTab'


const WorkerPage = () => {

  const workerData = {
    id:12345512,
    CUIT: '30-33586213-5',
    Nombre: 'Lorem ipsum cnjnscj cnsanc  cgdgd asfgdgd cnjnscj cnsanc  cgdgd asfgdgd',
    Contrato: '123456',
    Póliza: '123456',
    Actividad: 'Lorem ipsum ncjncansjcnjasncjanjcnjancja',
    Sector: 'Público',
    Establecimiento: 'Lorem ipsum lorem ',
    Régimen: 'PCP',
  }

  return (
    <>
      <div className='bg-gray-50 max-w-max mx-auto mt-10 p-2 rounded-xl shadow-md'>
        <h2 className='text-xl font-semibold text-blue-950 mb-4'>Datos del Trabajador</h2>
        <WorkerInfo data={workerData} /> 
        <WorkerTab />
      </div>
    </>
  )
}

export default WorkerPage