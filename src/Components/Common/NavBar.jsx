import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default function NavBar() {

  
  const [CurrentColores, setCurrentColores] = useState([])

  const getCurrentTorneoColores = async ()=> {
    try {
        const result = await axios.get('http://localhost:4000/api/getTorneoColores');
        setCurrentColores(result.data);
        console.log("result.data: " + JSON.stringify(result.data));
    }catch (error) {
    alert(error.message)

    }
}

useEffect(() => {
  getCurrentTorneoColores();
},[])

  const Logout = () => {

  }
  
  return (
    <div className='navbar'>
      <div>
        <Link to="/home">Inicio</Link>
        <Link to="/home">Noticias</Link>
        { sessionStorage.getItem('userRole')==="ADMIN" &&
          
          <Link to="/admin">Admin Panel</Link>
        
        }
        <div className="dropdown">
          <button className="dropbtn">Juegos 
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
              <Link to="/Reservaciones">Reservas</Link>
              <Link to="/torneos">Torneos Regulares</Link>
              <Link to={`/torneoColores/${CurrentColores.id_torneo}`}>Torneo Colores</Link>
          </div>
        </div> 
      </div>
      <div className="logout_btn_container">
        <button className="logout_btn" onClick={Logout}>Cerrar Sesión</button>
      </div>
    </div>
  )
}
