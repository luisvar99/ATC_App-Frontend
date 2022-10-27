import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './NavBar.css'

export default function Home() {
  return (
    <div className="main_admin_dashboard_container">
        <div className="options_container">
          <div className="atc_admin_logo_container">
            <img src="https://http2.mlstatic.com/D_NQ_NP_663732-MLV45985217656_052021-C.jpg" alt="" />
          </div>
          <Link className="optionsLinks" to='manageUsuarios'>Reservaciones</Link>
          <Link className="optionsLinks" to='/torneos'>Torneos</Link>
        </div>
    </div>
  )
}
