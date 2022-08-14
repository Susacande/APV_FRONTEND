import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import Alert from "../Components/Alert.jsx"
import axiosClient from "../config/axios";

const Confirmar = () => {
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(true);
  const [ctaConfirmada, setCtaConfirmada] = useState(false);
  const {token} = useParams();
  


  


  useEffect(  () =>{

    const confirmarCta= async ()=>{

      try{
  
        const url= `/veterinarios/confirmar/${token}`

        const {data} = await axiosClient(url);
  
        setCtaConfirmada(true);
        
        setAlerta({ msg: data.msg, error:false});
  
      }
      catch(error){
        setAlerta({ msg: error.response.data.msg, error:true});
  
      }
  
      setCargando(false);
  };
       confirmarCta();


  },[]);
  
  return (
    <>
    <h1>
      Verificando cuenta
    </h1>

    {!cargando && <Alert alert={alerta}/>}
    


    {ctaConfirmada &&(
      
        <Link
        className="block my-5 text-center text-gray-500" 
        to="/">Iniciar Sesión</Link>
    )

    }
    
    
    </>


    
  )
}

export default Confirmar