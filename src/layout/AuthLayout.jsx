import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
        <main className="container gap-10 p-5 mx-auto mt-12 md:grid md:grid-cols-2">
          <Outlet />
        </main>

        <h1>Administrador de pacientes</h1>
    </>
  )
};

export default AuthLayout;