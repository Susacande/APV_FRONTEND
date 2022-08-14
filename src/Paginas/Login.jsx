import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axiosClient from "../config/axios";
import Alert from "../Components/Alert";
import useAuth from "../hooks/useAuth";
import { Chart } from "react-google-charts";


const Login = () => {


  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('')
  const [alerta, setAlerta]= useState({});

  const {setAuth} = useAuth();
   const navigate = useNavigate();


  const handleSubmit= async (e)=>{
      e.preventDefault();

      if(email ==="")
      {
        setAlerta({msg:"Para continuar ingrese su email.", error:true});
        return;
      }

      if(password ==="")
      {
        setAlerta({msg:"Para continuar ingrese su password.", error:true});
        return;
      }


    try{

      const {data} = await axiosClient.post("/veterinarios/login", {email,password}) 
      
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin')

      setAlerta({});

    }
    catch(error){
      console.log(error);
      setAlerta({msg:error.response.data.msg, error:true});
    }

  };

  const {msg}=alerta;
  return (
    <>
      
        <div>


<Chart
  chartType="ScatterChart"
  data={[["Age", "Weight"], [4, 5], [8, 12]]}
  width="100%"
  height="400px"
  legendToggle
/>


          <h1 className="text-6xl font-black text-indigo-600">Inicia Sesion y Administra tus Pacientes</h1>
        </div>
        
        <div  className="px-5 py-10 mt-20 bg-white shadow rounded-xl md:mt-5">
            <form onSubmit={handleSubmit}>
                
                {
                  msg && <Alert alert={alerta}>

                </Alert>
                }

                <div>
                  <label className="block text-xl font-bold uppercase text-gra-600" >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    type = "text"
                    placeholder="Email de Registro"
                    className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                    >
                  </input>
                </div>
                <div>
                  <label
                    className = "block mt-5 text-xl font-bold text-gray-600 uppercase"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={ e=> setPassword(e.target.value)}
                    type= "password"
                    placeholder="Tu password"
                    className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                  >
                  </input>


                </div>

                <input
                  type="submit"
                  value= "Iniciar Sesión"
                  className="w-full px-10 py-3 mt-5 font-bold text-white uppercase bg-indigo-700 md:w-auto rounded-xl hover:cursor-pointer hover:bg-indigo-800"

                >
                </input>

            </form>

            <nav className="mt-10 lg:justify-between lg:flex ">
              <Link
                  className="block my-5 text-center text-gray-500" 
                  to="/registrar">No tienes una cuenta? Registrate.</Link>
              <Link
                   className="block my-5 text-center text-gray-500" 
                  to="/olvidePassword">He olvidado mi password</Link>
            </nav>

        </div>
        
    </>
  )
}

export default Login