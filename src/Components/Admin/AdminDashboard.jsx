import React from 'react'
import './AdminDashboard.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  return (
    
    <div className="main_admin_dashboard_container">
        <div className="options_container">
          <div className="atc_admin_logo_container">
            <img src="https://http2.mlstatic.com/D_NQ_NP_663732-MLV45985217656_052021-C.jpg" alt="" />
          </div>
          <Link className="optionsLinks" to='manageUsuarios'>Gestion de Usuarios
          </Link>
          <Link className="optionsLinks" to='manageCanchas'>Gestion de Canchas</Link>
          <Link className="optionsLinks" to='manageHorarios'>Gestion de Horarios</Link>
          <Link className="optionsLinks" to='manageTorneos'>Gestion de Torneos</Link>   
        </div>
    </div>
    
  )
}
