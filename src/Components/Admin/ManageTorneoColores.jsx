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
    const [NombreGrupo, setNombreGrupo] = useState("")

    const [IsCreatingGrupo, setIsCreatingGrupo] = useState(false)

    const getCurrentTorneoColores = async ()=> {
        try {
            const result = await axios.get('http://localhost:4000/api/getTorneoColores');
            setTorneoColores(result.data);
            console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }

    const CreateGrupo = async (e)=> {
        e.preventDefault();
        setIsCreatingGrupo(true)
        try {
            const result = await axios.post('http://localhost:4000/api/CreateColoresGrupo',
            {
                id_torneo: TorneoColores.id_torneo,
                nombre_bombo: NombreGrupo
            });
            
            console.log("result.data: " + JSON.stringify(result.data));
            setIsCreatingGrupo(false)
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
        
        <h3>Parejas Inscritas</h3>
        <div className="coloresParticipantsContainer">
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>Nombre Jugador</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                    <tr>
                        <td>494 - Luis Eduardo Vargas Perez</td>
                    </tr>
                </tbody>
            </table>
           
        </div>

        <hr class="new1"/> 
        
        <div className='createGruposColoresFormContainer'>
            <form className="createGrupoColoresForm" onSubmit={CreateGrupo}>
                <div className="nombre_bombo_container">
                    <label htmlFor="nombre_bombo">Nombre del Grupo</label>
                    <input type="text" id="nombre_bombo" onChange={(e)=> setNombreGrupo(e.target.value)}/>
                </div>
                <div className="btnCreateGrupoColores">
                    <button>Crear Grupo</button>
                    { IsCreatingGrupo && 
                        <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}
                    />}
                </div>
            </form>
        </div>

        <hr class="new1"/> 

        <div className='createEquipoColoresFormContainer'>
            <form action="createEquipoColoresForm">
                <div>
                    
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}
