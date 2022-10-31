import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


export default function NavBar() {
  return (
    <div className="navbar">
        <Link to="/home">Inicio</Link>
        <Link to="/home">Noticias</Link>
        <div className="dropdown">
            <button className="dropbtn">Juegos 
                <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
                <Link to="/">Reservas</Link>
                <Link to="/torneos">Torneos</Link>
            </div>
        </div> 
    </div>
  )
}
