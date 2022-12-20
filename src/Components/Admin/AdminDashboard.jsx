import React, { useState, useEffect } from 'react'
import './AdminDashboard.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'



export default function Dashboard() {

  const [TorneoColores, setTorneoColores] = useState({})

  const [IsLoadingColores, setIsLoadingColores] = useState(false)

  const getCurrentTorneoColores = async ()=> {
    setIsLoadingColores(true)
      try {
          const result = await axios.get('http://localhost:4000/api/getTorneoColores');
          setTorneoColores(result.data);
          console.log("result.data TorneoColores: " + JSON.stringify(result.data));
          setIsLoadingColores(false)
      }catch (error) {
      alert(error.message)
  
      }
  }

  useEffect(() => {
    getCurrentTorneoColores();
  },[])

  return (
    
    <div className="main_admin_dashboard_container">
        {
           IsLoadingColores ? 
            
              <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.75"
              width="35"
              visible={true}
              />
              :
            <div className="options_container">
              <div className="atc_admin_logo_container">
                <img src="https://http2.mlstatic.com/D_NQ_NP_663732-MLV45985217656_052021-C.jpg" alt="" />
              </div>
              <div className="LinksContainer">
                <Link className="optionsLinks" to='manageUsuarios'>Gestion de Usuarios</Link>
                <Link className="optionsLinks" to='manageCanchas'>Gestion de Canchas</Link>
                <Link className="optionsLinks" to='manageHorarios'>Gestion de Horarios</Link>
                <Link className="optionsLinks" to='manageTorneos'>Gestion de Torneos</Link>   
                <Link className="optionsLinks" to={`torneosColores/${TorneoColores.id_torneo}`}>Gestion Torneo Colores</Link>   
                <Link className="optionsLinks" to="manageRondas">Gestion Rondas</Link>   
              </div>
            </div>
          
        }
    </div>
    
  )
}
