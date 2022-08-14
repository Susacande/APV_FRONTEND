import { MyInput } from "./MyInput";
import { useState } from "react";
import Alert from "../Components/Alert"
import usePacientes from "../hooks/usePacientes";
import { useEffect } from "react";

const Formulario =()=>{
    const [telefono, setTelefono] = useState("");
    const [fecha, setFecha] = useState("");
    const [propietario, setPropietario] = useState("");
    const [nombre, setNombre] = useState("");
    const [email,setEmail] = useState("");
    const[sintomas, setSintomas]= useState("");
    const[_id, setId]= useState(null);

    const configTel = {id:"telefono", tipo:"text", holder:"Teléfono de contacto", valorState:telefono, functionState: setTelefono}
    const configDate = {id:"fecha", tipo:"date", holder:"Fecha de Alta", valorState:fecha, functionState: setFecha}
    
    const configNombre = {id:"nombre", tipo:"text", holder:"Nombre del paciente", valorState:nombre, functionState: setNombre}

    const configProp = {id:"propietario", tipo:"text", holder:"Nombre del propietario(a)", valorState:propietario, functionState: setPropietario}
    const configEmail= {id:"email", tipo:"text", holder:"Email del propietario(a)", valorState:email, functionState: setEmail}

    const configSintomas= {id:"sintomas", tipo:"textArea", holder:"Sintomas", valorState:sintomas, functionState: setSintomas}

    const [alerta, setAlerta] = useState({});


    const {guardarPaciente, paciente, pacientes} = usePacientes();

    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setEmail(paciente.email);
            setPropietario(paciente.propietario);
            setSintomas(paciente.sintomas);
            setTelefono(paciente.telefono);
            setFecha(paciente.fecha);
            setId(paciente._id);
         
        }
    }, [paciente]);
    

    const submitHandled=(e)=>{
        e.preventDefault();

        if([nombre,fecha,propietario,email,sintomas, telefono].includes('')){
            setAlerta({msg:"Para continuar ingrese todos los campos", error:true})
            
            return;
        }

        setAlerta({});

        guardarPaciente({_id,telefono,nombre,fecha,propietario,email,sintomas});

        clrForm();

         
    }

    const clrForm = ()=>{
        setNombre("");
        setEmail("");
        setPropietario("");
        setSintomas("");
        setTelefono("");
        setFecha("");
        setId("");
        
    }

    const {msg} = alerta;
    return(
        <>
        <p>
            Anade tus pacientes y {''}
            <span className="font-bold text-indigo-600">administralos</span>
        </p>

        <form className="px-5 py-10 mb-10 bg-white shadow-md lg:mb-0" onSubmit={submitHandled}>

            <MyInput config={configTel}></MyInput>            
            <MyInput config={configDate}></MyInput>            
            <MyInput config={configNombre}></MyInput>            
            <MyInput config={configProp}></MyInput>
            <MyInput config={configEmail}></MyInput>
            <MyInput config={configSintomas}></MyInput>

            {
                msg &&<Alert alert={alerta}></Alert>
            }
            <div className="mt-5">
                <input
                    className ="px-5 py-3 text-white bg-indigo-500 rounded-lg hover:cursor-pointer hover:bg-indigo-700"
                type="submit" value="Registrar">
                </input>
            </div>

        </form>

       </>

    );
}

export default Formulario;