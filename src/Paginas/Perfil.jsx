import { useEffect, useState } from "react";
import AdminNav from "../Components/AdminNav.jsx";
import useAuth from "../hooks/useAuth.jsx"
import Alert from "../Components/Alert.jsx"
import { PacientesProvider } from "../context/PacientesProvider.jsx";
 
const Perfil = () => {

    const {auth} = useAuth();
    const {UpdatePerfil} = useAuth();
    
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta]= useState({});

    useEffect( ()=>{

        setPerfil(auth);



    }
        ,[auth])


        const handleSubmit = async e =>{
            e.preventDefault();

            const {nombre, email} =  perfil;


            if([nombre,email]. includes('')){
                setAlerta({ msg : "Proporcione el nombre y el email para continuar.",
                            error:true})

                            return;
            }

            const resultado = await UpdatePerfil(perfil);

            setAlerta(resultado);
            


        }

        const {msg} = alerta;


  return (
    <>
      <AdminNav/>

      <h2 className="mt-10 text-3xl font-bold text-center"> Perfil</h2>
          <p className="mt-5 mb-10 text-xl text-center">Modifica tu perfil</p>

          <div className="flex justify-center">
            <div className="w-full p-5 bg-white rounded-lg shadow md:w-1/2">
                <form onSubmit={handleSubmit}>
                    {msg && <Alert alert={alerta}></Alert>}
                    <div>
                        <label className="font-bold text-gray-600 uppercase">Nombre</label>
                        <input 
                        type="text" 
                        className="w-full p-2 mt-5 mb-10 border rounded-lg bg-gray-50"
                        name= "nombre" 
                        value={perfil.nombre || '' }  
                        
                        onChange={e=>setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}
                        >
                        </input>
                    </div>
                    <div >
                        <label className="font-bold text-gray-600 uppercase ">Sitio Web</label>
                        <input 
                        type="text" 
                        className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                        name= "web"
                        value={perfil.web || '' }  
                        
                        onChange={e=>setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}                        
                        
                        >
                        </input>
                    </div>
                    <div>
                        <label className="font-bold text-gray-600 uppercase">Telefono</label>
                        <input 
                        type="text" 
                        className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                        name= "telefono"     
                        value={perfil.telefono || '' }  
                        
                        onChange={e=>setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}                     
                        >
                        </input>
                    </div>  
                    <div>
                        <label className="font-bold text-gray-600 uppercase">Email</label>
                        <input 
                        type="text" 
                        className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                        name= "email"
                        value={perfil.email || '' }  
                        
                        onChange={e=>setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}                                                  
                        >
                        </input>
                    </div>   

                    <input 
                        type="submit"
                        value= "Guardar cambios"
                        className= "w-full px-10 py-3 mt-5 font-bold text-white uppercase bg-indigo-500 rounded-lg hover:bg-indigo-700 hover:cursor-pointer "
                    />
                    
                </form>
            </div>
          </div>



      </>
  )
}

export default Perfil;