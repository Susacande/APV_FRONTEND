import { createContext,useState, useEffect } from "react";
import axiosClient from "../config/axios";

import { format } from 'date-fns';


const PacientesContext = createContext();

export const PacientesProvider = ({children}) =>{

    const [pacientes, setPacientes] =useState([]);
    const [paciente, setPaciente] = useState({})

    useEffect(()=>{
        const obtenerPacientes = async ()=>{
    
            try{
                const token = localStorage.getItem('token');
    
    
                if(!token) return 
    
    
                const config = {
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
    
                const {data} = await axiosClient("/pacientes", config);
                
                setPacientes(data);
                
            }
            catch(error){
                console.log(error);
            }
        
        }
    
        obtenerPacientes();
    }, []);
    


    const guardarPaciente =async (paciente)=>{
        const token = localStorage.getItem('token')
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }

        }


        if(paciente._id){
            console.log("editando");
            try{

                const {data} = await axiosClient.put(
                    `/pacientes/${paciente._id}`,paciente, config
                )

                
                const pacientesActualizado =  pacientes.map(pacienteState => pacienteState._id ===  data._id ? data : pacienteState);

                setPacientes(pacientesActualizado);

                setPaciente({});
                    
                
            }
            catch(error){
                console.log(error);
    
            }
            
        }else{

            console.log("nuevo");
           

            try{

                const {data} = await axiosClient.post(
                    '/pacientes',paciente, config
                )
                const {createAt, updateAt, __v, ...pacienteAlmacenado} = data;

               
                setPaciente(pacienteAlmacenado); 
                setPacientes([paciente, ...pacientes])
    
                
               

    
                
            }
            catch(error){
                console.log(error);
    
            }
    


        }





    }


    const editarPaciente = async(paciente)=>{
        let f = new Date(paciente.fecha);
        paciente.fecha =format(f, 'yyyy-MM-dd');
        
        setPaciente(paciente);

        



    }

    const eliminarPaciente =async (id)=>{
        const confirma = confirm("Confirma que desea eliminar?");
        
        
        if(confirma)
        {
            try{

                const token = localStorage.getItem("token");

                const config={
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`                        
                    }
                }



                const {data} = await axiosClient.delete(`/pacientes/${id}`, config);

                const pacientesActualizados = pacientes.filter( pacienteState => pacienteState._id  !==id);

                setPacientes(pacientesActualizados);

            }
            catch(error){
                console.log(error);
            }
        }
    }

    return(
        <PacientesContext.Provider
            value ={{pacientes, guardarPaciente, paciente, editarPaciente, eliminarPaciente}}
        
        >
            {children}

        </PacientesContext.Provider>




    );


} 

export default PacientesContext;