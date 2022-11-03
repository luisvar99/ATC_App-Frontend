import React, { useState, useEffect } from 'react'
import './TorneosDashboard.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'



export default function TorneosDashboard() {

    const [Torneos, setTorneos] = useState([])
    const [IsLoading, setIsLoading] = useState(false)

    const GetTorneos = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("https://atcbackend.herokuapp.com/api/getAllTorneos") 
            console.log(response.data);
            setTorneos(response.data)
            setIsLoading(false)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        GetTorneos();
        //console.log("");
    }, [])
    

  return (
    <>
    <div className='dashboard_full_page_container'>
        <div className="dashboard_main_container">
            <div className="torneos_cards_container">
        {
          IsLoading ? 
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}/> 
            :
                
                    Torneos.length>0 ?
                    Torneos.map((torneo, index)=>(
                        <Link key={index} className="link_to_torneo" to={`/torneos/${torneo.nombre_torneo}/id=${torneo.id_torneo}`}>
                        <div className="torneo_card">
                        <div className="torneo_card_header">
                            <p>{torneo.nombre_torneo}</p>
                        </div>
                            <div className="torneo_card_info">
                                <p>Inscripcion: {new Date(torneo.fecha_inicio_inscripcion).toLocaleDateString('es-MX')} hasta {new Date(torneo.fecha_fin_inscripcion).toLocaleDateString('es-MX')}</p>
                                <p>Fecha Inicio: {new Date(torneo.fecha_inicio).toLocaleDateString('es-MX')}</p>
                                <p>Fecha Fin: {new Date(torneo.fecha_fin).toLocaleDateString('es-MX')}</p>
                                <p>Modalidad: {torneo.modalidad}</p>
                            </div>
                    </div>
                        </Link>
                    ))
                    : <p className="no_torneos_disponibles">No hay torneos disponibles en estos momentos</p>
                }
                
            </div>
        </div>
    </div>
    </>
  )
}
