import React from 'react'
import {Link} from 'react-router-dom'


export default function NavBar() {

  const Logout = () => {

  }
  
  return (
    <div className='navbar'>
      <div>
        <Link to="/home">Inicio</Link>
        <Link to="/home">Noticias</Link>
        <div className="dropdown">
          <button className="dropbtn">Juegos 
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
              <Link to="/Reservaciones">Reservas</Link>
              <Link to="/torneos">Torneos Regulares</Link>
              <Link to="/torneoColores">Torneo Colores</Link>
          </div>
        </div> 
      </div>
      <div className="logout_btn_container">
        <button className="logout_btn" onClick={Logout}>Cerrar Sesión</button>
      </div>
    </div>
  )
}
