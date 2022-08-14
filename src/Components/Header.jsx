import { Link } from "react-router-dom"



const Header =()=>{
    return(
    <>
        <header className="py-10 bg-indigo-600">
            <div
                className="container flex flex-col items-center justify-between mx-auto lg:flex-row"
            >
                <h1 className="font-bold text-center text-indigo-200 text-2x ">
                    Administrador de pacientes  de {''} 
                    <span className="font-black text-white">Veterinaria</span>

                </h1>

                <nav
                    className="flex flex-col items-center gap-4 mt-5 lg:flex-row lg:mt-0"
                    >
                        <Link
                            to="/admin"
                            className="text-sm font-bold text-white uppercase"
                        > Pacientes</Link>


                        <Link
                            to="/admin/perfil"
                            className="text-sm font-bold text-white uppercase"
                        > Perfil</Link>


                        <button
                            type="button"
                            className="text-sm font-bold text-white uppercase"
                            
                        >Cerrar Sesión </button>
                </nav>

            </div>


        </header>
    </>
        )

}

export default Header