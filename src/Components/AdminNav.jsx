import {Link} from 'react-router-dom'


const AdminNav = ()=>{
    return(
        <nav>
            <Link to= "/admin/perfil"
                className="font-bold text-gray-500 uppercase"
            > Perfil</Link>

            <Link
                to="/admin/cambiarpasword" 
                className='font-bold text-gray-500 uppercase'
            >Cambiar Password
            </Link>
        </nav>
    );
}


export default AdminNav;
