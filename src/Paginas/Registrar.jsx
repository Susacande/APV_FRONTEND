import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../Components/Alert";
import axiosClient from "../config/axios";


const Registrar =  () => {

  const [nombre,setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alerta, SetAlerta] = useState({});

  const handleSubmit = async e=>{
    e.preventDefault();



    if([nombre, email, password, password2].includes('')){
      SetAlerta({msg:"Hay campos vacios", error:true});
      
      return;
    }


    if(password !== password2)
    {
      SetAlerta({msg:"Los passwords no coinciden.", error:true});
      return;
    }


    if(password.length <6)
    {
      SetAlerta({msg:"El password debe ser de al menos 6 caracteres.", error:true});
      
      return;
    }

    SetAlerta({});

    try{
        await axiosClient.post("/veterinarios",{nombre,email,password});

        SetAlerta({msg: "Creado correctamente, revisa tu email.", error:false})


    }
    catch(error){
      SetAlerta({msg: error.response.data.msg, error:true})
    }
    

  }
  
  const {msg} = alerta;

  return (
    <>
        <div>
          <h1 className="text-6xl font-black text-indigo-600">Crea tu Cuenta y Administra tus Pacientes.</h1>
        </div>


        <div className="px-5 py-10 mt-20 bg-white shadow rounded-xl md:mt-5">

            { msg && <Alert alert={alerta}/>}


            <form
            onSubmit = {handleSubmit}
  
            >
                    <div>
                      <label className="block text-xl font-bold uppercase text-gra-600" >
                        Nombre
                      </label>
                      <input
                        type = "text"
                        placeholder="Nombre"
                        className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange= { e => setNombre(e.target.value)}
                        >
                      </input>
                    </div>
                    <div>
                      <label className="block text-xl font-bold uppercase text-gra-600" >
                        Email
                      </label>
                      <input
                        type = "text"
                        placeholder="Email"
                        className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        >
                      </input>
                    </div>

                    <div>
                      <label className="block text-xl font-bold uppercase text-gra-600" >
                        Password
                      </label>
                      <input
                        type = "password"
                        placeholder="Password"
                        className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                        value={password}
                        onChange = { e=> setPassword(e.target.value)}
                        >
                      </input>
                    </div>
                    <div>
                      <label className="block text-xl font-bold uppercase text-gra-600" >
                        Repetir password
                      </label>
                      
                      <input
                        type = "password"
                        placeholder="Repetir password"
                        className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                        value= {password2}
                        onChange = { e=> setPassword2(e.target.value)}
                        >
                      </input>
                    </div>

                    <input
                      type="submit"
                      className="w-full px-10 py-3 mt-5 text-white uppercase bg-indigo-700 font-nold md:w-auto rounded-xl hover:cursor-pointer hover:bg-indigo-800"
                      value="Registrar"
                    > 
                    </input>
                    
              </form>
              <nav className="mt-10 lg:justify-between lg:flex">
                <Link 
                  className="block my-5 text-center text-gray-500" 
                  to="/">Ya tengo cuenta.</Link>
                <Link 
                  className="block my-5 text-center text-gray-500" 
                  to="/olvidePassword"> Olvide mi password.</Link>
              </nav>
            
          </div>


        


    </>
  )
}

export default Registrar