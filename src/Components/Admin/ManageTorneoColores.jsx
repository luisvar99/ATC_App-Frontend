import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ManageTorneoColores.css'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import GetColoresParejas from '../Torneos/GetColoresParejas'
import GetColoresTeamsByGroup from '../Torneos/GetColoresTeamsByGroup'
import {Link} from 'react-router-dom'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'



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
    const [Equipo_uno, setEquipo_uno] = useState("")
    const [Equipo_dos, setEquipo_dos] = useState("")
    const [RondaJornada, setRondaJornada] = useState(0)
    const [FechaJornada, setFechaJornada] = useState(new Date().toLocaleDateString("EN-US"))

    const [NombreEquipo, setNombreEquipo] = useState("")
    const [ColorEquipo, setColorEquipo] = useState("")
    const [GrupoEquipo, setGrupoEquipo] = useState("")
    const [UserId_one, setUserId_one] = useState(0)
    const [UserId_two, setUserId_two] = useState(0)

    const [Id_player_one, setId_player_one] = useState(0)
    const [Id_player_two, setId_player_two] = useState(0)
    const [Id_player_three, setId_player_three] = useState(0)
    const [Id_player_four, setId_player_four] = useState(0)

    const [IDHorario, setIDHorario] = useState(0)
    const [IDCancha, setIDCancha] = useState(0)
    const [IdRonda, setIdRonda] = useState(0)
    const [Resultado, setResultado] = useState("")
    const [Fecha, setFecha] = useState(new Date().toLocaleDateString("EN-US"))


    const [IsCreatingGrupo, setIsCreatingGrupo] = useState(false)
    const [IsCreatingEquipo, setIsCreatingEquipo] = useState(false)
    const [IsCreatingMatch, setIsCreatingMatch] = useState(false)
    const [IsCreatingJornada, setIsCreatingJornada] = useState(false)
    const [IsPublishingEquipos, setIsPublishingEquipos] = useState(false)
    const [IsLoadingColoresParejasDropdown, setIsLoadingColoresParejasDropdown] = useState(false)

    const [UpdatingTorneoColores, setIsUpdatingTorneoColores] = useState(false)

    const [modalIsOpen, setIsOpen] = useState(false);

    const [GruposModalIsOpen, setGruposModalIsOpen] = useState(false);
    const [EquiposModalIsOpen, setEquiposModalIsOpen] = useState(false);

    const [PublishGruposEquiposModalIsOpen, setPublishGruposEquiposModalIsOpen] = useState(false);

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
            //const result = await axios.get('http://localhost:4000/api/getTorneoColores');
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
            //const result = await axios.get(`http://localhost:4000/api/GetColoresGrupo/${params.id}`);
            const result = await axios.get(`http://localhost:4000/api/GetColoresGrupo/${params.id}`);
            setColoresGrupos(result.data);
            console.log("setColoresGrupos: " + JSON.stringify(result.data));
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
                id_torneo: params.id,
                nombre_bombo: NombreGrupo
            });
            //console.log("result.data: " + JSON.stringify(result.data));
            if(result.data.success===true){
                //setColoresGrupos([...ColoresGrupos, {id_torneo:params.id, nombre_bombo: NombreGrupo}])
                setIsCreatingGrupo(false)
                setGruposModalIsOpen(true);
            }else{
                setIsCreatingGrupo(false)
                alert("Ha ocurrido un error al agregar el grupo");
            }
        }catch (error) {
            setIsCreatingGrupo(false)
            alert("Ha ocurrido un error creando el grupo")
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
            if(result.data.success===true){
                setIsCreatingEquipo(false);
                setEquiposModalIsOpen(true);
                
            }else{
                setIsCreatingEquipo(false);
                alert("Ha ocurrido un error creando el equipo")
            }
        }catch (error) {
            setIsCreatingEquipo(false);
            alert("Ha ocurrido un error creando el equipo")
        }
    }

    const CreateColoresMatch = async (e)=> {
        e.preventDefault();
        if(Id_player_one===Id_player_two || Id_player_three===Id_player_four){
            alert("Los jugaores seleccionados deben ser diferentes")
        }else if(IdRonda===0){
            alert("Seleccione una ronda")
        }else{
            const reservation = await CreateReservation();
            if(reservation===true) {
                setIsCreatingMatch(true)
                try {

                    const result = await axios.post('http://localhost:4000/api/addColoresMatch',
                    {
                        id_torneo: params.id,
                        player_one: Id_player_one,
                        player_two: Id_player_two,
                        player_three: Id_player_three,
                        player_four: Id_player_four,
                        fecha: Fecha,
                        resultado: Resultado,
                        idRonda: IdRonda,
                        IdHorario: IDHorario,
                        id_cancha: IDCancha
                    });
                    //console.log("result.data: " + JSON.stringify(result.data));

                    if(result.data.success===true){
                        setIsCreatingMatch(false)
                        setIsOpen(true)
                    }else{
                        setIsCreatingMatch(false)
                        alert("Ha ocurrido un error creando el enfrentamiento")  
                    }
                }catch (error) {
                    setIsCreatingMatch(false)
                    alert("Ha ocurrido un error creando el enfrentamiento")
                }
            }
        }

    }
    const CreateColoresJornada = async (e)=> {
        e.preventDefault();
            setIsCreatingJornada(true)
            try {
                const result = await axios.post('http://localhost:4000/api/addJornada',
                {
                    id_torneo: params.id,
                    equipo_uno: Equipo_uno,
                    equipo_dos: Equipo_dos,
                    fecha: FechaJornada,
                    id_ronda: RondaJornada,
                });
                console.log("result.data: " + JSON.stringify(result.data));

                if(result.data.success===true){
                    setIsCreatingJornada(false)
                    setIsOpen(true)
                }else{
                    alert("Ha ocurrido un error creando la jornada")  
                    setIsCreatingJornada(false)
                }
            }catch (error) {
                alert("Ha ocurrido un error creando la jornada")
                setIsCreatingJornada(false)
            }
        

    }
    

    const PublishColoresEquiposAndGroups = async (e)=> {
        e.preventDefault();
        setIsPublishingEquipos(true)
        try {
            const result = await axios.put(`http://localhost:4000/api/PublishColoresTeamsAndGroups/${params.id}`,
            {
                isPublicado: 1
            });
            if(result.data.success===true){
                setPublishGruposEquiposModalIsOpen(true);
                setIsPublishingEquipos(false)
                
            }else{
                alert("Ha ocurrido un error publicando los grupos y equipos")
                setIsPublishingEquipos(false)
            }
        }catch (error) {
            alert("Ha ocurrido un error publicando los grupos y equipos")
            setIsPublishingEquipos(false)
        }
    }

    const GetRondas = async () =>{
        try {
            //const result = await axios.get(`http://localhost:4000/api/getRondas`)
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
          //const result = await axios.get(`http://localhost:4000/api/GetColoresParticipantesMoreInfo/${params.id}`)
          const result = await axios.get(`http://localhost:4000/api/GetColoresParticipantesMoreInfo/${params.id}`)
          //console.log("result.data " + JSON.stringify(result.data));
          let response = result.data;
          response.map((user, index) => {
          return arr.push({label: user.accion + ' - ' + user.nombres + ' ' + user.apellidos + ` (${user.nombre_equipo})`, id_pareja: user.id_pareja, userId: user.id});
        });
          setColoresParejasDropdown(arr)
          setIsLoadingColoresParejasDropdown(false)
        } catch (error) {
          alert(error.message)
        }
      }

      const GetHorarios = async () =>{
        try {
            //const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            setHorarios(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
        } catch (error) {
            
        }
      }

      const CreateReservation = async (e) => {
        console.log("Creando Reservacion");
        try { 
          const result = await axios.post(`http://localhost:4000/api/createReservation`,{
            idCancha: IDCancha,
            idHorario: IDHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: Fecha,
            id_inv_uno: Id_player_one,
            id_inv_dos: Id_player_two,
            descripcion: "Torneo Colores"
          })
          if(result.data.validHorario===false){
            alert("El horario no esta disponible para la fecha y cancha seleccionada")
            return false;
          }else{
            //console.log("CreateReservation-> " + JSON.stringify(result.data));
            return true;
          }
        } catch (error) {
          alert(error.message)
        }
      }

      const GetAllTennisCanchas = async () => {
        try {
            //const result = await axios.get('http://localhost:4000/api/getAllTennisCanchas');
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
            //const result = await axios.get(`http://localhost:4000/api/GetEquiposColores/${params.id}`);
            setColoresEquipos(result.data);
            console.log("setColoresEquipos " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }

    const DeleteColoresGroup = async (id_bombo) => {
        
        try {
            const result = await axios.delete(`http://localhost:4000/api/DeleteColoresGrupo/${id_bombo}`);
            if(result.data.success===true){
                const filter = ColoresGrupos.filter(gr => gr.id_bombo !== id_bombo )
                setColoresGrupos(filter);
                setIsOpen(true)
            }else{
                alert("Ha ocurrido un error eliminando el equipo")
            }
        }catch (error) {
            alert(error.message)
        }
    }

    const DeleteColoresEquipo = async (e, id_equipo) => {
        e.preventDefault();
        try {
            const result = await axios.delete(`http://localhost:4000/api/DeleteColoresEquipo/${id_equipo}`);
            //const result = await axios.delete(`http://localhost:4000/api/DeleteColoresEquipo/${id_equipo}`);
            //console.log("Pareja " + JSON.stringify(result.data));
            if(result.data.success===true){
                const filter = ColoresEquipos.filter(eq => eq.id_equipo !== id_equipo )
                setColoresEquipos(filter);
                setIsOpen(true)
            }else{
                alert("Ha ocurrido un error eliminando el equipo")
            }
        }catch (error) {
            alert(error.message)
        }
    }

    const EditTorneo = async (e) =>{
        e.preventDefault();
            try {
                setIsUpdatingTorneoColores(true)
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
                if(editResult.data.success===true){
                    setIsUpdatingTorneoColores(false)
                    setIsOpen(true)
                    //setConfirmation("Se ha actualizado el torneo correctamente")
                }else{
                    setIsUpdatingTorneoColores(false)
                    alert("Ha ocurrido un error actualizando los datos")
                }
            } catch (error) {
                //setConfirmation("Ha ocurrido un error")
                //alert(error.message);
                setIsUpdatingTorneoColores(false)
                alert("Ha ocurrido un error actualizando los datos")
            }
        
    }

    function closeModal() {
        setIsOpen(false);
    }
    function closeGruposModal() {
        setGruposModalIsOpen(false);
        window.location.reload()
    }
    function closeEquiposModal() {
        setEquiposModalIsOpen(false);
        window.location.reload()
    }
    function closePublishGruposEquiposModal() {
        setPublishGruposEquiposModalIsOpen(false);
        window.location.reload()
    }
    

    useEffect(() => {
        getCurrentTorneoColores();
        getColoresGrupos();
        GetRondas();
        GetColoresParejasDropdown();
        GetHorarios()
        GetAllTennisCanchas();
        GetEquiposColores();
        console.log(IdRonda);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    
    <div className="manageColoresMainContainer">
        <div className="manageColoresSubContainer">
            <div className="manageColoresFormContainer">
                <h3 style={{textAlign:"center"}}>Informacion General</h3>
                <Modal
                    open={modalIsOpen}
                    onClose={closeModal}
                    center
                >
                    <h2>La gestión se realizó exitosamente</h2>
                    <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closeModal}>Aceptar</button>
                    </div>

                </Modal>
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
                    {
                    UpdatingTorneoColores &&

                    <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="35"
                    visible={true}
                    />
                }
                </div>
            </div>
        <hr className="new1"/> 
        
        <Link to={`/coloresParticipantes/${params.id}`} className="goToParejas_inscritas">Participantes</Link>


        <hr className="new1"/> 

        <div className="manageColoresGrupsTeamsContainer">
            <div className='createGruposColoresFormContainer'>
            <Modal
                    open={GruposModalIsOpen}
                    onClose={closeGruposModal}
                    center
                >
                    <h2>Grupo creado exitosamente</h2>
                    <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closeGruposModal}>Aceptar</button>
                    </div>

                </Modal>
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
            <Modal
                    open={EquiposModalIsOpen}
                    onClose={closeEquiposModal}
                    center
                >
                    <h2>Equipo creado exitosamente</h2>
                    <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closeEquiposModal}>Aceptar</button>
                    </div>

                </Modal>
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
                       {
                            ColoresGrupos.map((grupo, index)=> (
                                <tr key={index}>
                                    <td>{grupo.nombre_bombo}</td>
                                    <td><Link to={`editGrupo/${grupo.id_bombo}`}> <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{color: "#515151"}}/> </Link></td>
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
                        {
                            ColoresEquipos.map((eq, index)=>(
                                <tr key={index}>
                                    <td>{eq.nombre_equipo}</td>
                                    <td><Link to={`editEquipo/${eq.id_equipo}`}> <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{color: "#515151"}}/> </Link></td>
                                    <td><FontAwesomeIcon icon={faTrash} size="xl" className="deleteIcon" onClick={(e) => DeleteColoresEquipo(e, eq.id_equipo)} style={{cursor: "pointer", color:"#515151"}}/></td>                            
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <hr className="new1"/> 

            <div className='Grupos_equipos_players_container'>
                <div style={{display: "flex"}}>
                <Modal
                    open={PublishGruposEquiposModalIsOpen}
                    onClose={closePublishGruposEquiposModal}
                    center
                >
                    <h2>Grupos y Equipos publicados exitosamente</h2>
                    <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closePublishGruposEquiposModal}>Aceptar</button>
                    </div>

                </Modal>
                    <button className="publicarColoresEquiposBtn" onClick={PublishColoresEquiposAndGroups}>Publicar Grupos y Equipos</button>
                    { IsPublishingEquipos && 
                        <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}
                    />}
                </div>
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
                            <Link to="jornadas">Ver Jornadas</Link>
                        </div>
                    </div>
                    <Modal
                    open={modalIsOpen}
                    onClose={closeModal}
                    center
                >
                    <h2>La gestión se realizó exitosamente</h2>
                    <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closeModal}>Aceptar</button>
                    </div>

                </Modal>
                    <form className="createColoresMatchForm" onSubmit={CreateColoresJornada}>
                        <h3 style={{ margin:"0", textAlign:"center" }}>Jornadas</h3>
                        <div className="coloresmatchrightleftside">

                        
                            <div className='parejas_dropdown_container'>
                                <label htmlFor="equipo" style={{margin:"0"}}>Equipo 1</label>
                                <div>
                                    <select id="equipo" style={{marginBottom:"1rem"}} onChange={(e)=> setEquipo_uno(e.target.value)} required>
                                        <option value="">---Seleccione una opcion---</option>
                                        {
                                        ColoresEquipos.map((eq, index)=>(
                                            <option key={index} value={eq.nombre_equipo}>{eq.nombre_equipo}</option>
                                            ))
                                        }
                                        <option value="1ero grupo A">1ero grupo A</option>
                                        <option value="1ero grupo B">1ero grupo B</option>
                                        <option value="2do grupo A">2do grupo A</option>
                                        <option value="2do grupo B">2do grupo B</option>
                                        <option value="Ganador S1">Ganador S1</option>
                                        <option value="Ganador S2">Ganador S2</option>
                                    </select>

                                </div>

                                <label htmlFor="equipo" style={{marginTop:"1rem"}}>Equipo 2</label>
                                <div>
                                    <select id="equipo" onChange={(e)=> setEquipo_dos(e.target.value)} required>
                                        <option value="">---Seleccione una opcion---</option>
                                    {
                                        ColoresEquipos.map((eq, index)=>(
                                            <option key={index} value={eq.nombre_equipo}>{eq.nombre_equipo}</option>
                                            
                                            ))
                                        }
                                        <option value="1ero grupo A">1ero grupo A</option>
                                        <option value="1ero grupo B">1ero grupo B</option>
                                        <option value="2do grupo A">2do grupo A</option>
                                        <option value="2do grupo B">2do grupo B</option>
                                        <option value="Ganador S1">Ganador S1</option>
                                        <option value="Ganador S2">Ganador S2</option>
                                    </select>
                                </div>
                               
                                
                            </div>
                            <div className="coloresMatchRightSide">
                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchDate">Fecha</label>
                                    <input type="date" id="matchDate" onChange={(e)=>setFechaJornada(e.target.value)} required/>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="ColoresMatchRonda">Ronda</label>
                                    <select id="ColoresMatchRondaInput" className='ColoresMatchRondaInput' onChange={(e)=>setRondaJornada(e.target.value)} required>
                                    <option value="">-----Seleccione una opcion-----</option>
                                        {
                                            Rondas.map((rond, index)=>(
                                                <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className='btnCreateColoresMatchContainer'>
                            <button type="submit">Crear</button>
                            {IsCreatingJornada &&

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

            <hr className="new1"/> 
            
            <div className="createColoresMatchContainer">
                <div className="createColoresMatchFormContainer">
                    <div className="coloresMatchFormTitle">
                        <div className='goToColoresMatches'>
                            <Link to="enfrentamientos">Ver Enfrentamientos</Link>
                        </div>
                    </div>
                    <form className="createColoresMatchForm" onSubmit={CreateColoresMatch}>
                        <h3 style={{ margin:"0", textAlign:"center" }}>Enfrentamiento Detallado</h3>
                        <div className="coloresmatchrightleftside">

                        
                            <div className='parejas_dropdown_container'>
                                <p style={{margin:"0"}}>Jugador 1</p>
                                <Select 
                                    /* value={Users} */
                                    onChange={(item) => {
                                        console.log("userId: "+ JSON.stringify(item.userId));
                                        setId_player_one(item.userId);
                                        setUserId_one(item.id)
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                />
                                <p style={{margin:"0.3rem 0"}}>Jugador 2</p>
                                <Select 
                                    /* value={Users} */
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.userId));
                                        setId_player_two(item.userId);
                                        setUserId_two(item.id)
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                />
                                <p style={{margin:"0.3rem 0"}}>Jugador 3</p>
                                <Select 
                                    /* value={Users} */
                                    onChange={(item) => {
                                        console.log("userId: "+ JSON.stringify(item.userId));
                                        setId_player_three(item.userId);
                                        setUserId_one(item.id)
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                />
                                <p style={{margin:"0.3rem 0"}}>Jugador 4</p>
                                <Select 
                                    /* value={Users} */
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.userId));
                                        setId_player_four(item.userId);
                                        setUserId_two(item.id)
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                />
                                
                            </div>
                            <div className="coloresMatchRightSide">
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
                                    <select id="ColoresMatchRondaInput" className='ColoresMatchRondaInput' onChange={(e)=>setIdRonda(e.target.value)} required>
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
