import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


export default function NavBar() {
  return (
    <div class="navbar">
        <Link to="/home">Inicio</Link>
        <Link to="/home">Noticias</Link>
        <div class="dropdown">
            <button class="dropbtn">Juegos 
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <Link to="/">Reservas</Link>
                <Link to="/torneos">Torneos</Link>
            </div>
        </div> 
    </div>
  )
}
