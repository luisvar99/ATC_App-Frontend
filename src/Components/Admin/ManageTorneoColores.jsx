import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ManageTorneoColores.css'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import GetColoresParejas from '../Torneos/GetColoresParejas'
import GetColoresTeamsByGroup from '../Torneos/GetColoresTeamsByGroup'
import {Link} from 'react-router-dom'
import Select from 'react-select';


export default function ManageTorneoColores() {

    const [ColoresParejas, setColoresParejas] = useState([])
    const [Rondas, setRondas] = useState([])
    const [ColoresParejasDropdown, setColoresParejasDropdown] = useState([])

    const [TorneoColores, setTorneoColores] = useState({})
    const [NombreTorneo, setNombreTorneo] = useState("")
    const [FechaInicio, setFechaInicio] = useState("")
    const [FechaFin, setFechaFin] = useState("")
    const [InicioInscripcion, setInicioInscripcion] = useState({})
    const [FinInscripcion, setFinInscripcion] = useState({})
    const [Descripcion, setDescripcion] = useState({})
    const [NombreGrupo, setNombreGrupo] = useState("")
    const [ColoresGrupos, setColoresGrupos] = useState([])

    const [NombreEquipo, setNombreEquipo] = useState("")
    const [ColorEquipo, setColorEquipo] = useState("")
    const [GrupoEquipo, setGrupoEquipo] = useState("")
    const [ParejaId_one, setParejaId_one] = useState(0)
    const [ParejaId_two, setParejaId_two] = useState(0)

    const [IsCreatingGrupo, setIsCreatingGrupo] = useState(false)
    const [IsCreatingEquipo, setIsCreatingEquipo] = useState(false)
    const [IsPublishingEquipos, setIsPublishingEquipos] = useState(false)
    const [IsLoadingColoresParejasDropdown, setIsLoadingColoresParejasDropdown] = useState(false)

    const params = useParams();

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '2px solid #F8F8F8',
          color: state.isSelected ? 'black' : 'black',
          backgroundColor: state.isSelected ? 'white' : 'white',
          width: "100%"
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "2%",
        })
      }

    const getCurrentTorneoColores = async ()=> {
        try {
            const result = await axios.get('http://localhost:4000/api/getTorneoColores');
            setTorneoColores(result.data);
            //console.log("result.data TorneoColores: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }

 /*    const getColoresParejas = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresParejas/${params.id}`);
            setColoresParejas(result.data);
            //console.log("result.data TorneoColores: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    } */

    const getColoresGrupos = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetColoresGrupo/${params.id}`);
            setColoresGrupos(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
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
            window.location.reload()
        }catch (error) {
        alert(error.message)
    
        }
    }

    const CreateEquipo = async (e)=> {
        e.preventDefault();
        setIsCreatingEquipo(true)
        try {
            const result = await axios.post('http://localhost:4000/api/CreateColoresEquipo',
            {
                nombre_equipo: NombreEquipo,
                id_bombo: GrupoEquipo,
                id_torneo: params.id,
                isPublicado:0,
                color: ColorEquipo,
            });
            
            console.log("result.data: " + JSON.stringify(result.data));
            setIsCreatingEquipo(false)
            window.location.reload()
        }catch (error) {
        alert(error.message)
    
        }
    }

    const PublishColoresEquipos = async (e)=> {
        e.preventDefault();
        setIsPublishingEquipos(true)
        try {
            const result = await axios.put(`http://localhost:4000/api/PublishColoresEquipo/${params.id}`,
            {
                isPublicado: 1
            });
            
            //console.log("result.data: " + JSON.stringify(result.data));
            setIsPublishingEquipos(false)
            window.location.reload()
        }catch (error) {
            alert(error.message)
        }
    }

    const GetRondas = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getRondas`)
            setRondas(result.data);
            console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

      const GetColoresParejasDropdown = async () => {
        setIsLoadingColoresParejasDropdown(true)
        try { 
            const arr = [];
          //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
          const result = await axios.get(`http://localhost:4000/api/GetColoresParejasMoreInfo/${params.id}`)
          //console.log("result.data " + JSON.stringify(result.data));
          let response = result.data;
          response.map((user) => {
          return arr.push({label: user.id_pareja + ' - ' + user.nombres + ' ' + user.apellidos, user_id: user.id});
        });
          setColoresParejasDropdown(arr)
          setIsLoadingColoresParejasDropdown(false)
        } catch (error) {
          alert(error.message)
        }
      }

    useEffect(() => {
        getCurrentTorneoColores();
        getColoresGrupos();
        GetRondas();
        GetColoresParejasDropdown();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <hr className="new1"/> 
        
        <Link to={`/coloresParejas/${params.id}`} className="goToParejas_inscritas">Ver Parejas Inscritas</Link>


        <hr class="new1"/> 

        <div className="manageColoresGrupsTeamsContainer">
            <div className='createGruposColoresFormContainer'>
                <form className="createGrupoColoresForm" onSubmit={CreateGrupo}>
                    <div className="nombre_bombo_container">
                        <label htmlFor="nombre_bombo">Nombre del Grupo</label>
                        <input type="text" id="nombre_bombo" onChange={(e)=> setNombreGrupo(e.target.value)} required/>
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
            <div className='createGruposColoresFormContainer'>
                <form className="createGrupoColoresForm" onSubmit={CreateEquipo}>
                    <div className="nombre_bombo_container">
                        <label htmlFor="nombre_bombo">Nombre del Equipo</label>
                        <input type="text" id="nombre_bombo" onChange={(e)=> setNombreEquipo(e.target.value)} required/>
                    </div>
                    <br />
                    <div className="nombre_bombo_container">
                        <label htmlFor="color_equipo">Color del Equipo</label>
                        <input type="color" id="color_equipo" onChange={(e)=> setColorEquipo(e.target.value)} required/>
                        <input value={`Codigo color: ${ColorEquipo}`} type="text" id="color_equipo" disabled/>
                    </div>
                    <br />
                    <div className="nombre_bombo_container">
                        <label htmlFor="grupo_equipo">Grupo del Equipo</label>
                        <select type="color" id="grupo_equipo" onChange={(e)=> setGrupoEquipo(e.target.value)} required>
                            <option value="">--- Seleccione una opcion ---</option>
                            {
                                ColoresGrupos.map((grupo, index)=> (
                                    <option key={index} value={grupo.id_bombo}>{grupo.nombre_bombo}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="btnCreateGrupoColores">
                        <button>Crear Equipo</button>
                        { IsCreatingEquipo && 
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
        </div>

        <hr class="new1"/> 

            <div className='Grupos_equipos_players_container'>
                <button className="publicarColoresEquiposBtn" onClick={PublishColoresEquipos}>Publicar Equipos</button>
            {
                ColoresGrupos.map((grupo, index)=> (
                    <>
                    <p style={{backgroundColor:"grey", padding:"0.4rem", textAlign:"center", color:"white"}}>{grupo.nombre_bombo}</p>
                    <div className='Grupos_equipos_players'  key={index}>
                        <GetColoresTeamsByGroup id_bombo={grupo.id_bombo}/>
                    </div>
                    </>
                ))
            }
            </div>

            <hr class="new1"/> 
            
            <div className="createColoresMatchContainer">
                <div className="createColoresMatchFormContainer">
                    <form className="createColoresMatchForm">
                        <div className='parejas_dropdown_container'>
                            <Select 
                                /* value={Users} */
                                onChange={(item) => {
                                    //console.log("Item: "+ JSON.stringify(item.user_id));
                                    setParejaId_one(item.id_pareja);
                                }}
                                options = {ColoresParejasDropdown}
                                styles = {customStyles}
                                placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                            />
                            <Select 
                                /* value={Users} */
                                onChange={(item) => {
                                    //console.log("Item: "+ JSON.stringify(item.user_id));
                                    setParejaId_two(item.id_pareja);
                                }}
                                options = {ColoresParejasDropdown}
                                styles = {customStyles}
                                
                                placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                            />
                        </div>
                        <div className="coloresMatchRonda">
                            <label htmlFor="ColoresMatchRonda">Ronda</label>
                            <select id="ColoresMatchRonda">
                            <option value="">-----Seleccione una opcion-----</option>
                                {
                                    Rondas.map((rond, index)=>(
                                        <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}
