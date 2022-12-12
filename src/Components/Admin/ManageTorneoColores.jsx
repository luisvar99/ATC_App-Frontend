import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ManageTorneoColores.css'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'



export default function ManageTorneoColores() {

    const [TorneoColores, setTorneoColores] = useState({})
    const [NombreTorneo, setNombreTorneo] = useState("")
    const [FechaInicio, setFechaInicio] = useState("")
    const [FechaFin, setFechaFin] = useState("")
    const [InicioInscripcion, setInicioInscripcion] = useState({})
    const [FinInscripcion, setFinInscripcion] = useState({})
    const [Descripcion, setDescripcion] = useState({})

    const getCurrentTorneoColores = async ()=> {
        try {
            const result = await axios.get('http://localhost:4000/api/getTorneoColores');
            setTorneoColores(result.data);
            console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
}
    }

    useEffect(() => {
        getCurrentTorneoColores();
    }, [])
    

  return (
    
    <div className="manageColoresMainContainer">
        <div className="manageColoresSubContainer">
            <div className="manageColoresFormContainer">
                <h3 style={{textAlign:"center"}}>Informacion General</h3>
                <form className="manageColoresForm"> 
                    <div className="manageColoresLeftSideContainer">

                        <div className="nombre_torneo_container">
                            <label htmlFor="nombre_torneo">Nombre</label>
                            <input value={TorneoColores.nombre_torneo} type="text" id='nombre_torneo' onChange={(e)=> setNombreTorneo(e.target.value)}/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_inicio">Fecha Inicio</label>
                            <input value={moment(TorneoColores.fecha_inicio).format('YYYY-MM-DD')} type="date" id="fecha_inicio"/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_fin">Fecha Finalizacion</label>
                            <input value={moment(TorneoColores.fecha_fin).format('YYYY-MM-DD')} type="date" id="fecha_fin"/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="descripcion">Descripcion</label>
                            <textarea value={TorneoColores.descripcion} type="text" cols="30" rows="5" id="descripcion"/>
                        </div>
                    </div>


                    <div className="manageColoresRightSideContainer">

                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_inicio_inscripcion">Inicio Inscripcion</label>
                            <input value={moment(TorneoColores.fecha_inicio_inscripcion).format('YYYY-MM-DD')} type="date" id="fecha_inicio_inscripcion"/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_fin_inscripcion">Fin Inscripcion</label>
                            <input value={moment(TorneoColores.fecha_fin_inscripcion).format('YYYY-MM-DD')} type="date" id="fecha_fin_inscripcion"/>
                        </div>
                        
                    </div>
                </form>
                <div className="btnUpdateColores">
                    <button>Acualizar Datos</button>
                </div>
            </div>
        <hr class="new1"/> 
        
        <div className="coloresParticipantsContainer">
            <h3>Participantes</h3>
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Luis Vargas</td>
                    </tr>
                </tbody>
            </table>
        </div>

        </div>
    </div>
  )
}
