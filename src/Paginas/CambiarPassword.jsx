import AdminNav from "../Components/AdminNav";
import { useEffect, useState } from "react";
import Alert from "../Components/Alert";
import useAuth from "../hooks/useAuth";

const CambiarPassword = ()=>{

  const [alerta,setAlerta]= useState({});
  const {UpdatePassword} = useAuth();

  const [password, setPassword]= useState({
    pw_actual:'',
    pw_nuevo:''

  });

  
    const submitHandled = async(e)=>{
      e.preventDefault();

      if(Object.values(password).some(campo => campo === '')){
          setAlerta({
            msg: "Llene el formulario para continuar.",
            error:true
          })
          return;

      }

      if(password.pw_nuevo.length <6){
        setAlerta({
          msg: "El password debe tener al menos 6 caracteres.",
          error:true
        })
        return;
      }
      setAlerta({
      })

      const respuesta= await UpdatePassword(password);

      setAlerta(respuesta);

      
    }

    const {msg} = alerta; 

    return (
        <>
          <AdminNav/>
          {msg && <Alert alert={alerta} ></Alert>}

          <h2 className="mt-10 text-3xl font-bold text-center">Password</h2>
          <p className="mt-5 mb-10 text-xl text-center">Actualiza tu password</p>

          <div className="flex justify-center">
            <div className="w-full p-5 bg-white shadow rounder-lg md:w-1/2">
              <form onSubmit={submitHandled}>
                <div>
                  <label className="font-bold text-gray-600 uppercase">Password Actual</label>
                  <input 
                    className="w-full p-2 mt-1 mb-5 border rounded-lg bg-gray-50"
                    type="password" 
                    placeholder="Ingresa tu password actual"

                    name="pw_actual"

                    onChange={ e=>setPassword({
                      ...password,
                      [e.target.name]: e.target.value

                    })}

                    ></input>

                </div>

                <div>
                  <label className="font-bold text-gray-600 uppercase"> Nuevo Password</label>
                  <input
                    type="password"
                    className="w-full p-2 mt-1 mb-5 border rounded-lg bg-gray-50"
                    name= "pw_nuevo"
                    onChange={ e=> setPassword({
                      ...password,
                      [e.target.name]: e.target.value
                    })

                    }

                  ></input>
                </div>

               <input
                className="w-full px-10 py-3 text-white uppercase bg-indigo-500 fontbold rounded-xl hover:bg-indigo-700 hover:cursor-pointer" 
                type="submit" 
                value="Actualizar password" 
                
                
                />


            </form>

            </div>
          </div>



        </>

      )
}

export default CambiarPassword;