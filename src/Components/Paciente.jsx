import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente})=>{

    const {eliminarPaciente, editarPaciente} = usePacientes();

    const {email, fecha, nombre, propietario, sintomas, _id}= paciente;


    const formatearFecha= (fecha)=>{
        try{
        
            const nuevaFecha = new Date(fecha);
            
            return new Intl.DateTimeFormat('es-Mx', {dateStyle: 'long' }). format(nuevaFecha);
        }
        catch(error){
            return fecha;
        }
    }


    return(
        <>
            <div key={_id}  className="px-5 py-10 mx-5 my-10 bg-white shadow-md rounded-xl">
                <p className="font-bold text-gray-500 uppercase"> Nombre: {''}
                    <span className="font-normal text-black normal-case ">{nombre}</span>

                </p>
                <p className="font-bold text-gray-500 uppercase"> Fecha: {''}
                    <span className="font-normal text-black normal-case ">{formatearFecha(fecha)}</span>

                </p>
                <p className="font-bold text-gray-500 uppercase"> Sintomas: {''}
                    <span className="font-normal text-black normal-case ">{sintomas}</span>

                </p>

                <div className="flex justify-between my-5">
                    <button
                        type="button"
                        className="px-10 py-2 text-white uppercase bg-indigo-500 rounded-md hover:bg-indigo-700"
                        onClick={()=>{editarPaciente(paciente)}}
                    >Editar</button>

                    <button
                        type="button"
                        className="px-10 py-2 text-white uppercase bg-red-500 rounded-md hover:bg-red-700"
                        onClick={()=> eliminarPaciente(paciente._id)}
                    >Borrar</button>

                </div>

            </div>
            
        </>
        );

};

export default Paciente;