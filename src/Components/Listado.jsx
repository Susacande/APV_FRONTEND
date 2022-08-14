import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente";

const Listado = () => {
  const {pacientes} = usePacientes();


  return (
   <>
   {pacientes? (
      <>
          <h2 className="text-3xl font-black text-center">Listado pacientes</h2>

          <p className="mt-5 mb-10 text-xl text-center">
            Administra tus {''}
            <span className="font-bold text-indigo-600 ">pacientes y citas</span>
          </p>

          
          {pacientes.map( paciente =>(

            
          <Paciente 
            key={paciente._id}
            paciente = { paciente } >
              
            </Paciente>
            
        ))

          }
      </>

   ) :
   
    <>
      <h2 className="text-3xl font-black text-center">No hay pacientes</h2>

      <p className="mt-5 mb-10 text-xl text-center">
        Comienza agregando pacientes {''}
      </p>
    </>

   }
   </>
  )
}

export default Listado