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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


export default function ManageTorneoColores() {

    const [Rondas, setRondas] = useState([])
    const [ColoresParejasDropdown, setColoresParejasDropdown] = useState([])
    const [Horarios, setHorarios] = useState([])
    const [CanchasTennis, setCanchasTennis] = useState([])
    const [ColoresEquipos, setColoresEquipos] = useState([])


    const [TorneoColores, setTorneoColores] = useState({})

    const [NombreTorneo, setNombreTorneo] = useState("")
    const [FechaInicio, setFechaInicio] = useState("")
    const [FechaFin, setFechaFin] = useState("")
    const [InicioInscripcion, setInicioInscripcion] = useState("")
    const [FinInscripcion, setFinInscripcion] = useState("")
    const [Descripcion, setDescripcion] = useState("")
    const [NombreGrupo, setNombreGrupo] = useState("")

    const [ColoresGrupos, setColoresGrupos] = useState([])

    const [NombreEquipo, setNombreEquipo] = useState("")
    const [ColorEquipo, setColorEquipo] = useState("")
    const [GrupoEquipo, setGrupoEquipo] = useState("")
    const [ParejaId_one, setParejaId_one] = useState(0)
    const [ParejaId_two, setParejaId_two] = useState(0)
    const [IDHorario, setIDHorario] = useState(0)
    const [IDCancha, setIDCancha] = useState(0)
    const [IdRonda, setIdRonda] = useState(0)
    const [Resultado, setResultado] = useState("")
    const [Fecha, setFecha] = useState(new Date().toLocaleDateString("EN-US"))
    const [Confirmation, setConfirmation] = useState("")


    const [IsCreatingGrupo, setIsCreatingGrupo] = useState(false)
    const [IsCreatingEquipo, setIsCreatingEquipo] = useState(false)
    const [IsCreatingMatch, setIsCreatingMatch] = useState(false)
    const [IsPublishingEquipos, setIsPublishingEquipos] = useState(false)
    const [IsLoadingColoresParejasDropdown, setIsLoadingColoresParejasDropdown] = useState(false)

    const params = useParams();

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '2px solid #F8F8F8',
          color: state.isSelected ? 'black' : 'black',
          backgroundColor: state.isSelected ? 'white' : 'white',
          width: "100%",
          fontSize: "0.9rem",
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "2%",
          fontSize: "0.9rem",
        })
      }

    const getCurrentTorneoColores = async ()=> {
        try {
            const result = await axios.get('http://localhost:4000/api/getTorneoColores');
            console.log("result.data TorneoColores: " + JSON.stringify(result.data));
            setNombreTorneo(result.data.nombre_torneo)
            setFechaInicio(result.data.fecha_inicio)
            setFechaFin(result.data.fecha_fin)
            setInicioInscripcion(result.data.fecha_inicio_inscripcion)
            setFinInscripcion(result.data.fecha_fin_inscripcion)
            setDescripcion(result.data.descripcion)
        }catch (error) {
        alert(error.message)
    
        }
    }

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

    const CreateColoresMatch = async (e)=> {
        e.preventDefault();
        if(ParejaId_one===ParejaId_two){
            alert("Las parejas seleccionadas deben ser diferentes")
        }else{
            setIsCreatingMatch(true)
            try {
                const result = await axios.post('http://localhost:4000/api/addColoresMatch',
                {
                    id_torneo: params.id,
                    id_pareja_one: ParejaId_one,
                    id_pareja_two: ParejaId_two,
                    fecha: Fecha,
                    resultado: Resultado,
                    idRonda: IdRonda,
                    IdHorario: IDHorario,
                    id_cancha: IDCancha
                });
                
                console.log("result.data: " + JSON.stringify(result.data));

                if(result.data.success===true){
                    setIsCreatingMatch(false)
                    await CreateReservation();
                    window.location.reload();
                }else{
                    alert("Ha ocurrido un error creando el enfrentamiento")  
                    setIsCreatingMatch(false)
                }
            }catch (error) {
                alert(error.message)
            }

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
            //console.log("Rondas: " + JSON.stringify(result.data));
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
          response.map((user, index) => {
          return arr.push({label: user.id_pareja + ' - ' + user.nombres + ' ' + user.apellidos, id_pareja: user.id_pareja});
        });
          setColoresParejasDropdown(arr)
          setIsLoadingColoresParejasDropdown(false)
        } catch (error) {
          alert(error.message)
        }
      }

      const GetHorarios = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            setHorarios(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
        } catch (error) {
            
        }
      }

      const CreateReservation = async (e) => {
        console.log("Creando Reservacion");
        try { 
          //const result = await axios.post(`https://atcbackend.herokuapp.com/api/createReservation`)
          const result = await axios.post(`http://localhost:4000/api/createReservation`,{
            idCancha: IDCancha,
            idHorario: IDHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: Fecha,
            id_inv_uno: 0,
            id_inv_dos: 0,
            descripcion: "Torneo Colores"
          })
          console.log("CreateReservation-> " + JSON.stringify(result.data));
          
          if(result.data.success === false){
            alert("Ha ocurrido un error al reservar la cancha para el dia y hora establecido")
          }
        } catch (error) {
          alert(error.message)
        }
      }

      const GetAllTennisCanchas = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getAllTennisCanchas');
            setCanchasTennis(result.data);
            //console.log("result.data.tennis: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }
    
    const GetEquiposColores = async () => {
        
        try {
            const result = await axios.get(`http://localhost:4000/api/GetEquiposColores/${params.id}`);
            setColoresEquipos(result.data);
            //console.log("Pareja " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }

    const DeleteColoresGroup = async (id_bombo) => {
        
        try {
            const result = await axios.delete(`http://localhost:4000/api/DeleteColoresGrupo/${id_bombo}`);
            //console.log("Pareja " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }

    const EditTorneo = async (e) =>{
        e.preventDefault();
            setConfirmation("Actualizando Torneo...")
            try {
                //const editResult = await axios.put(`https://atcbackend.herokuapp.com/api/editTorneo/${params.idTorneo}`,
                const editResult = await axios.put(`http://localhost:4000/api/editTorneo/${params.id}`,
                {
                  nombre_torneo: NombreTorneo,
                  fecha_inicio: FechaInicio,
                  fecha_fin: FechaFin,
                  fecha_inicio_inscripcion: InicioInscripcion,
                  fecha_fin_inscripcion: FinInscripcion,
                  id_categoria: 0,
                  descripcion: Descripcion,
                  modalidad: "Dobles",
                  is_colores: true
                })
                console.log(editResult.data);
                setConfirmation("Se ha actualizado el torneo correctamente")
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
        
    }


    useEffect(() => {
        getCurrentTorneoColores();
        getColoresGrupos();
        GetRondas();
        GetColoresParejasDropdown();
        GetHorarios()
        GetAllTennisCanchas();
        GetEquiposColores();
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
                            <input value={NombreTorneo} type="text" id='nombre_torneo' onChange={(e)=> setNombreTorneo(e.target.value)}/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_inicio">Fecha Inicio</label>
                            <input value={moment(FechaInicio).format('YYYY-MM-DD')} type="date" id="fecha_inicio" onChange={(e)=> setFechaInicio(e.target.value)}/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_fin">Fecha Finalizacion</label>
                            <input value={moment(FechaFin).format('YYYY-MM-DD')} type="date" id="fecha_fin" onChange={(e)=> setFechaFin(e.target.value)}/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="descripcion">Descripcion</label>
                            <textarea value={Descripcion} type="text" cols="30" rows="5" id="descripcion" onChange={(e)=> setDescripcion(e.target.value)}/>
                        </div>
                    </div>


                    <div className="manageColoresRightSideContainer">

                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_inicio_inscripcion">Inicio Inscripcion</label>
                            <input value={moment(InicioInscripcion).format('YYYY-MM-DD')} type="date" id="fecha_inicio_inscripcion" onChange={(e)=> setInicioInscripcion(e.target.value)}/>
                        </div>
                        <div className="nombre_torneo_container">
                            <label htmlFor="fecha_fin_inscripcion">Fin Inscripcion</label>
                            <input value={moment(FinInscripcion).format('YYYY-MM-DD')} type="date" id="fecha_fin_inscripcion" onChange={(e)=> setFinInscripcion(e.target.value)}/>
                        </div>
                        
                    </div>
                </form>
                <div className="btnUpdateColores">
                    <button onClick={EditTorneo}>Acualizar Datos</button>
                    <p>{Confirmation}</p>
                </div>
            </div>
        <hr className="new1"/> 
        
        <Link to={`/coloresParejas/${params.id}`} className="goToParejas_inscritas">Ver Parejas Inscritas</Link>


        <hr className="new1"/> 

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
        <div className='see_groups_teams_container'>
            <div className="see_groups_table_container">
                <table>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                       {ColoresGrupos.map((grupo, index)=> (
                           <tr key={index}>
                            <td>{grupo.nombre_bombo}</td>
                            <td><Link to={`editCancha/id=`}> <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{color: "#515151"}}/> </Link></td>
                            <td><FontAwesomeIcon icon={faTrash} size="xl" className="deleteIcon" onClick={(e) => DeleteColoresGroup(grupo.id_bombo)}  style={{cursor: "pointer", color:"#515151"}}/></td>                            
                        </tr>
                           ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="see_teams_table_container">
                <table>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {ColoresEquipos.map((eq, index)=>(
                            <tr key={index}>
                                <td>{eq.nombre_equipo}</td>
                                <td><Link to={`editCancha/id=`}> <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{color: "#515151"}}/> </Link></td>
                                <td><FontAwesomeIcon icon={faTrash} size="xl" className="deleteIcon" /* onClick={(e) => DeleteCancha(cancha.id_cancha)} */ style={{cursor: "pointer", color:"#515151"}}/></td>                            
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <hr className="new1"/> 

            <div className='Grupos_equipos_players_container'>
                <button className="publicarColoresEquiposBtn" onClick={PublishColoresEquipos}>Publicar Equipos</button>
            {
                ColoresGrupos.map((grupo, index)=> (
                    <div key={index}>

                        <p style={{backgroundColor:"grey", padding:"0.4rem", textAlign:"center", color:"white"}}>{grupo.nombre_bombo}</p>
                        <div className='Grupos_equipos_players'>
                            <GetColoresTeamsByGroup id_bombo={grupo.id_bombo}/>
                        </div>
                    </div>
                    
                ))
            }
            </div>

            <hr className="new1"/> 
            
            <div className="createColoresMatchContainer">
                <div className="createColoresMatchFormContainer">
                    <div className="coloresMatchFormTitle">
                        <div className='goToColoresMatches'>
                            <Link to="enfrentamientos">Ver Enfrentamientos</Link>
                        </div>
                    </div>
                    <form className="createColoresMatchForm" onSubmit={CreateColoresMatch}>
                        <h3 style={{ margin:"0", textAlign:"center" }}>Nuevo Enfrentamiento</h3>
                        <div className="coloresmatchrightleftside">

                        
                            <div className='parejas_dropdown_container'>
                                <p style={{margin:"0"}}>Pareja 1</p>
                                <Select 
                                    /* value={Users} */
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.id_pareja));
                                        setParejaId_one(item.id_pareja);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                />
                                <p style={{margin:"0.3rem 0"}}>Pareja 2</p>
                                <Select 
                                    /* value={Users} */
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.id_pareja));
                                        setParejaId_two(item.id_pareja);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                />
                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchDate">Fecha</label>
                                    <input type="date" id="matchDate" onChange={(e)=>setFecha(e.target.value)} required/>
                                </div>

                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchCancha">Cancha</label>
                                    <select type="number" id="matchCancha" onChange={(e)=>setIDCancha(e.target.value)} required>
                                        <option value="">-----Seleccione una opcion-----</option>
                                        {
                                            CanchasTennis.map((can, index)=>(
                                                <option key={index} value={can.id_cancha}>{can.nombre_cancha}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="coloresMatchRightSide">
                                <div className="coloresMatchRonda">
                                <label htmlFor="cantPersonas">Horario</label>
                                <select type="number" id="cantPersonas" onChange={(e)=>setIDHorario(e.target.value)} required>
                                    <option value="">-----Seleccione una opcion-----</option>
                                        {
                                            Horarios.map((h, index)=>(
                                                <option key={index} value={h.id_horario}>{h.hora_inicio}</option>
                                            ))
                                        }
                                </select>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="ColoresMatchRonda">Ronda</label>
                                    <select id="ColoresMatchRondaInput" className='ColoresMatchRondaInput' required>
                                    <option value="">-----Seleccione una opcion-----</option>
                                        {
                                            Rondas.map((rond, index)=>(
                                                <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchResult">Resultado</label>
                                    <input type="Text" id="matchResult" />
                                </div>
                            </div>
                        </div>
                        <div className='btnCreateColoresMatchContainer'>
                            <button type="submit">Crear</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}
