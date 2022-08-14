import { Link } from "react-router-dom"
import{useState} from "react"
import axiosClient from "../config/axios.jsx"
import Alerta from "../Components/Alert.jsx"



const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const[alerta, setAlerta] = useState({});


  const handleSubmit= async (e)=>{
    e.preventDefault();

    if(email ==='' ){
      setAlerta({msg:'Para continuar ingrese su correo.', error:true})
      return;
    }

    
    try{
      const {data}= await axiosClient.post("/veterinarios/recoveryPassword", {email});
      setAlerta({msg:data.msg, error:false})

    }
    catch(error){
      setAlerta({msg: error.response.data.msg, error:true})
    }

  }


  return (
    <>
        <h1 className="text-6xl font-black text-indigo-600">
          Recupera tu password y no pierdas {""}
          <span className="text-black"> tus pacientes</span>
        </h1>

        <div className="px-5 py-10 my-20 mt-5 bg-white shadow-lg md: rounded-xl">
          <Alerta alert= {alerta}></Alerta>
          <form onSubmit={handleSubmit}>

              <div>
                <label className="text-xl font-bold uppercase black text-gra-600">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" 
                placeholder="Email de registro"
                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                ></input>
              </div>


              <input
                type="submit"
                value="Reset password"
                className="w-full px-10 py-3 mt-5 font-bold text-white uppercase bg-indigo-700 md:w-auto rounded-xl hover:cursor-pointer hover:bg-inidigo-800" 
                >
              </input>

          </form>
        


        <nav className="mt-10 lg:justify-between lg:flex">
            <Link
            className="block my-5 text-center tex-gray-500" 
            to="/"> 
            Ya tengo cuenta, iniciar sesión.</Link>
            <Link 
            className="block my-5 text-center text-gray-500 " 
            to="/registrar"> 
            No tengo cuenta. Regístrate</Link>

        </nav>

        </div>
    </>
  )
}

export default OlvidePassword