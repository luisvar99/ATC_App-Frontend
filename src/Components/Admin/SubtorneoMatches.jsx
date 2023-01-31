import React, { useState, useEffect } from 'react'
import './SubtorneoMatches.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'
import { RotatingLines } from  'react-loader-spinner'
import MatchInfo from '../Torneos/MatchInfo'
import TennisReservation from '../Canchas/TennisReservation'

export default function SubtorneoMatches() {

    const [GroupsMembers, setGroupsMembers] = useState([])
    const [Matches, setMatches] = useState([])
    const [Id_player_uno, setId_player_uno] = useState(0)
    const [Id_player_dos, setId_player_dos] = useState(0)
    const [Id_player_tres, setId_player_tres] = useState(0)
    const [Id_player_cuatro, setId_player_cuatro] = useState(0)
    const [Fecha, setFecha] = useState(new Date().toLocaleDateString("EN-US"))
    const [IDHorario, setIDHorario] = useState(0)
    const [Resultado, setResultado] = useState("")
    const [RondaString, setRondaString] = useState(0)
    const [Rondas, setRondas] = useState([])
    const [Horarios, setHorarios] = useState([])
    const [Canchas, setCanchas] = useState([])
    const [IDCancha, setIDCancha] = useState([])

    const [IsLoadingMatches, setIsLoadingMatches] = useState(false)
    const [IsAddingMatch, setIsAddingMatch] = useState(false)


    const params = useParams();

    const GetGruposMembers = async () =>{
        try {
            //setIsAddingMatch(true)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/getGruposMembers/${params.idSubtorneo}`)
            //const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.idSubtorneo}`)
            setGroupsMembers(result.data);
            //console.log("GroupsMembers: " + JSON.stringify(result.data));
            //setIsAddingMatch(false)
        } catch (error) {
            alert(error.message)
        }
      }
    const GetSubtorneoMatches = async () =>{
        try {
            setIsLoadingMatches(true)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetSubtorneoMatches/${params.idSubtorneo}`)
            //const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatches/${params.idSubtorneo}`)
            setMatches(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            alert(error.message)
        }
      }
    const GetRondas = async () =>{
        try {
            setIsLoadingMatches(true)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/getRondas`)
            //const result = await axios.get(`http://localhost:4000/api/getRondas`)
            setRondas(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            alert(error.message)
        }
      }
    const GetHorarios = async () =>{
        try {
            setIsLoadingMatches(true)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetAllHorarios`)
            //const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            setHorarios(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            alert(error.message)
        }
      }

      const GetAllCanchas = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getAllCanchas');
            //const result = await axios.get('https://atcapp-backend-production.up.railway.app/api/getAllCanchas');
            setCanchas(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }
    
    const CreateSubtorneoMatch = async (e) =>{
        e.preventDefault()
        try {
            const reservation = await CreateReservation();
            if(reservation===true){

                setIsAddingMatch(true)
                const result = await axios.post(`https://atcapp-backend-production.up.railway.app/api/createSubtorneoMatch`, {
                    idSubtorneo: params.idSubtorneo,
                    id_player_uno: Id_player_uno,
                    id_player_dos: Id_player_dos,
                    id_player_tres: Id_player_tres,
                    id_player_cuatro: Id_player_cuatro,
                    resultado: Resultado,
                    fecha: Fecha,
                    hora: IDHorario,
                    ronda: RondaString,
                    id_cancha: IDCancha
                })
                /* const result = await axios.post(`http://localhost:4000/api/createSubtorneoMatch`, {
                    idSubtorneo: params.idSubtorneo,
                    id_player_uno: Id_player_uno,
                    id_player_dos: Id_player_dos,
                    id_player_tres: Id_player_tres,
                    id_player_cuatro: Id_player_cuatro,
                    resultado: Resultado,
                    fecha: Fecha,
                    hora: IDHorario,
                    ronda: RondaString,
                    id_cancha: IDCancha
                }) */
                setIsAddingMatch(false)
                
                if(result.data.success===true){
                    window.location.reload();
                }else{
                    alert("Ha ocurrido un error creando el enfrentamiento")  
                }
            }
        } catch (error) {
            alert(error.message)
            setIsAddingMatch(false)
        }
      }

      const CreateReservation = async (e) => {
        //alert("Creando Reservacion");
        try { 
          const result = await axios.post(`https://atcapp-backend-production.up.railway.app/api/createReservation`,{
            idCancha: IDCancha,
            idHorario: IDHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: Fecha,
            id_inv_uno: Id_player_uno,
            id_inv_dos: Id_player_dos,
            descripcion: "Torneo Regular"
          })
          /* const result = await axios.post(`http://localhost:4000/api/createReservation`,{
            idCancha: IDCancha,
            idHorario: IDHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: Fecha,
            id_inv_uno: Id_player_uno,
            id_inv_dos: Id_player_dos,
            descripcion: "Torneo Regular"
          }) */
          if(result.data.validHorario===false){
            alert("El horario no esta disponible para la fecha y cancha seleccionada")
            return false;
          }else{
            //console.log("CreateReservation-> " + JSON.stringify(result.data));
            return true;
          }
        } catch (error) {
          alert(error.message)
          return false;
        }
      }

      const DeleteSubtorneoMatches = async (idMatch) =>{
        try {
            const result = await axios.delete(`https://atcapp-backend-production.up.railway.app/api/DeleteMatch/${idMatch}`)
            //const result = await axios.delete(`http://localhost:4000/api/DeleteMatch/${idMatch}`)
            window.location.reload()            
        } catch (error) {
            alert(error.message)
        }
    }

      useEffect(() => {
        GetGruposMembers();
        GetSubtorneoMatches();
        GetRondas();
        GetHorarios();
        GetAllCanchas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    /* useEffect(() => {
        console.log(new Date(Fecha).toLocaleDateString("es-MX"));
        console.log(Fecha);

    }, [Fecha]) */
    
     

  return (
    <div className="createMatch_main_container">
        <div className="addMatch_form_container">
                <h3>Agregar enfrentamiento</h3>
                <form onSubmit={CreateSubtorneoMatch} className="form_add_matches" >
                    <div className="add_matches_left_right_side">
                    
                    <div className="add_matches_left_side">
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No. 1</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_uno(e.target.value)} required>
                            <option value="">-----Seleccione una opcion-----</option>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos} - Grupo {gm.numero_grupo}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No.2</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_dos(e.target.value)} required>
                            <option value="">-----Seleccione una opcion-----</option>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos} - Grupo {gm.numero_grupo}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No.3</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_tres(e.target.value)} required>
                            <option value="">-----Seleccione una opcion-----</option>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos} - Grupo {gm.numero_grupo}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No.4</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_cuatro(e.target.value)} required>
                            <option value="">-----Seleccione una opcion-----</option>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos} - Grupo {gm.numero_grupo}</option>
                                    ))
                                }
                            </select>
                        </div>
                        
                    </div>

                    <div className="add_matches_right_side">
                    <div className="inputs_container">
                            <label htmlFor="cantPersonas">Cancha</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setIDCancha(e.target.value)} required>
                                <option value="">-----Seleccione una opcion-----</option>
                                {
                                    Canchas.map((can, index)=>(
                                        <option key={index} value={can.id_cancha}>{can.nombre_cancha}</option>
                                    ))
                                }
                            </select>
                        </div>
                        
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Fecha</label>
                            <input type="date" id="cantPersonas" onChange={(e)=>setFecha(e.target.value)} required/>
                        </div>
                        <div className="inputs_container">
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
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Ronda</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setRondaString(e.target.value)} required>
                            <option value="">-----Seleccione una opcion-----</option>
                                {
                                    Rondas.map((rond, index)=>(
                                        <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Resultado</label>
                            <input type="text" id="cantPersonas" onChange={(e)=>setResultado(e.target.value)}/>
                        </div>
                    </div>
                    </div>


                    <div className="btn_addCancha_container">
                        <button type="submit">Aceptar</button>
                        {IsAddingMatch &&
                        <>
                            <RotatingLines
                                strokeColor="green"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="35"
                                visible={true}/>
                        </>}
                    </div>
                </form>
            </div>
            <div className="matches_container">
                            <div className="table_matches_container"> 
                            
                            {
                                Matches.map((match,index)=>(
                                <div className="matches_container_aux" key={index}>
                                    <MatchInfo idPartido={match.id_partido} IsAdmin={true}/>
                                    <div className='SubtorneoMatchButtons' style={{display: "flex"}}>
                                        <button className="editSubtorneoMatchBtn"><Link to={`/EditSubtorneoMatch/${params.idSubtorneo}/${match.id_partido}`} className='editSubtorneoMatchLink' >Editar</Link></button>
                                        <button onClick={(e)=>DeleteSubtorneoMatches(match.id_partido)}>Eliminar</button>
                                    </div>
                                </div>
                                
                                
                            ))}
                            </div>
            </div>
    </div>
  )
}
