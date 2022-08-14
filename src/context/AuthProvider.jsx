import { daysToWeeks } from "date-fns";
import { createContext,useState, useEffect } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext();

const AuthProvider =  ({children}) =>{


    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect( () => {

        const authenticateUser = async ()=>{
            const token = localStorage.getItem("token");
            
            if(!token){
                setCargando(false);
                return;
            }

            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try{
                const {data} = await axiosClient("/veterinarios/perfil", config);
                setAuth(data);

            }
            catch(error){
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false);

        };

        authenticateUser();


       


    }



    ,[]);





    const UpdatePassword = async(datos) =>{
        const token = localStorage.getItem("token");

        
        if(!token){
            setCargando(false);
            return ;
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{
            const url= "/veterinarios/actualizar-password"

            const {data} =await  axiosClient.put(url,datos,config);

            return {msg : data.msg};

        }
        catch(error){

            
            return {msg : error.response.data.msg, error:true};
        }


    }


    

    const UpdatePerfil = async (datos)=>{


        const token = localStorage.getItem("token");
            
        if(!token){
            setCargando(false);
            return;
        }

        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{
            const url= `/veterinarios/perfil/${datos._id}`
            const {data} = await axiosClient.put(url, datos, config);
            console.log(data);

            return {
                msg: "Resgistro actualizado correctamente.",
                error:false
               }

        }
        catch(error){
           return {
            msg: error.response.data.msg,
            error:true
           }
        }
    }
    
    return(
        <AuthContext.Provider value={{auth, setAuth, cargando, UpdatePerfil, UpdatePassword}} >
            {children}
        </AuthContext.Provider>     

    )
}


export {AuthProvider}

export default AuthContext;