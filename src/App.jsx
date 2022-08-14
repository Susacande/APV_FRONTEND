import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida.jsx'

import Confirmar from './Paginas/Confirmar'
import Login from './Paginas/Login'
import OlvidePassword from './Paginas/OlvidePassword'
import Registrar from './Paginas/Registrar'
import NuevoPassword from './Paginas/nuevoPassword.jsx'
import AdministrarPacientes from './Paginas/AdministrarPacientes'


import {AuthProvider} from './context/AuthProvider'
import {PacientesProvider} from './context/PacientesProvider'
import Perfil from './Paginas/Perfil'
import CambiarPassword from './Paginas/CambiarPassword'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path="registrar" element = {<Registrar />}/>
                  <Route path='confirmar/:token' element = {<Confirmar/>}/>
                  <Route path='olvidePassword' element={<OlvidePassword/>}/>
                  <Route path='olvidepassword/:token' element={<NuevoPassword/>}/>
              </Route>
              <Route path="/admin" element={<RutaProtegida/>}>
                  <Route index element ={<AdministrarPacientes/>} />

                  <Route path='perfil' element ={<Perfil/>} />
                  <Route path='cambiarpasword' element ={<CambiarPassword/>} />

              </Route>


            </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
