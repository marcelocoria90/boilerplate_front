import EjemploCard from "./components/EjemploCard"
import EmailManager from "./components/EmailManager"


const AgendarCertificadoPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <div>⚡ AgendarCertificadoPage ⚡</div>
      </div>
      <div className="flex flex-row justify-center items-center mt-4">
        <EmailManager />
      </div>
      <div className="flex flex-row justify-center items-center mt-4">
        <EjemploCard />
      </div>
      <div>
        <p className="text-center mt-4">
          Esta página es un ejemplo de cómo se pueden integrar componentes personalizados
          y manejar la lógica de envío de correos electrónicos en una aplicación React.
        </p>
      </div>
    </>
  )
}


export default AgendarCertificadoPage