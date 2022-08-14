import Formulario from "../Components/Formulario"
import Listado from "../Components/Listado"
import {useState} from "react"

const AdministrarPacientes = () => {

  const [mostrarForm, setMostrarForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button 
        type="button"
        className= "p-3 mx-10 mb-10 font-bold text-white uppercase bg-indigo-600 rounded-md md:hidden"
        onClick = {()=>setMostrarForm(!mostrarForm)}
        >{mostrarForm? "Ocultar formulario": "Mostrar formulario"}</button>

      <div  className={`${mostrarForm? 'block': 'hidden'} md:w-1/2 lg:w-2/5 md:block`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <Listado>

        </Listado>
      </div>
    </div>
    
  )
}

export default AdministrarPacientes