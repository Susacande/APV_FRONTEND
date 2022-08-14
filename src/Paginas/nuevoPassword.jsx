import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../Components/Alert.jsx";
import axiosClient from "../config/axios";

const NuevoPassword = () => {

  const [nuevoPassword, setNuevoPassword]= useState('');
  const [alerta,setAlerta] = useState({})
  const [validToken, setValidToken]= useState(false);


  const {token} = useParams();
  

  useEffect( ()=>{

    const validToken = async()=>{
    


      

      try{
        const data =await  axiosClient(`/veterinarios/recoveryPassword/${token}`);

        setAlerta({msg:"Ingrese su nuevo password.", error:false})

        setValidToken(true);
      }
      catch(error){
        setAlerta({msg:"Ocurrio un error, solicite nuevamente el restablecimiento de su password", error:true})
      }
    };

    validToken();

    
  },[])

        
  const handleSubmit = async  (e)=>{
    e.preventDefault();
  

    if(nuevoPassword === ""){
       setAlerta({msg:"Ingrese su nuevo password", error:true});
    }

    try{
      const {data} = await axiosClient.post(`/veterinarios/recoveryPassword/${token}`, {"password":nuevoPassword});
      
      setAlerta({msg: data.msg, error:false});
    }
    catch(error)
    {
      setAlerta({msg: error.msg, error:true})

    }
  }


  const {msg}= alerta;

  return (
    <>

    
    <div className="px-5 py-10 mt-10">

        <h1 className="text-6xl text-indigo-600 ">Actualizar password</h1>
    </div>

    <div className="px-5 py-10 mt-20 bg-white md:mt-5 rounded-xl">


     {msg &&      (<Alert alert={alerta}></Alert>)}
      
        {
        validToken && (
            <form onSubmit={handleSubmit}>
              <label className="block mt-10 text-xl font-bold uppercase">
                Nuevo password:
              </label>
              <input className="w-full p-3 mt-3 text-xl text-gray-600 uppercase border bg-gray-50 rounded-xl bold "
                type="password"
                value={nuevoPassword} 
                onChange = {e=> setNuevoPassword(e.target.value)}
                placeholder ="Nuevo password"
              ></input> 


              <input 
              className="w-full px-3 py-3 mt-10 font-bold text-white uppercase bg-indigo-700 rounded-xl hover:bg-indigo-900"
              type="submit"
              value="Guardar password"
              > 
              </input>

            </form>

        )}
        
    </div>
    
    
    </>
    
  )
}

export default NuevoPassword