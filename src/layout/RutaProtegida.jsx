import { Navigate, Outlet } from "react-router-dom"
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import useAuth from "../hooks/useAuth"

const RutaProtegida =  () => {

  const {auth,cargando} = useAuth();


  if(cargando) return "... cargando"

  return (
    <>
            <Header />
            { auth?._id? <Outlet />: <Navigate to="/" />}
            <Footer />
    </>
  )
}

export default RutaProtegida