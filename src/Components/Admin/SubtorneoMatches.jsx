import React, { useState, useEffect } from 'react'
import './SubtorneoMatches.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'
import { RotatingLines } from  'react-loader-spinner'
import MatchInfo from '../Torneos/MatchInfo'

export default function SubtorneoMatches() {

    const [GroupsMembers, setGroupsMembers] = useState([])
    const [Matches, setMatches] = useState([])
    const [Id_player_uno, setId_player_uno] = useState(0)
    const [Id_player_dos, setId_player_dos] = useState(0)
    const [Id_player_tres, setId_player_tres] = useState(0)
    const [Id_player_cuatro, setId_player_cuatro] = useState(0)
    const [Fecha, setFecha] = useState("")
    const [Hora, setHora] = useState("")
    const [Resultado, setResultado] = useState("")
    const [RondaString, setRondaString] = useState(0)
    const [Rondas, setRondas] = useState([])

    const [IsLoadingMatches, setIsLoadingMatches] = useState(false)
    const [IsAddingMatch, setIsAddingMatch] = useState(false)


    const params = useParams();

    const GetGruposMembers = async () =>{
        try {
            //setIsAddingMatch(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.idSubtorneo}`)
            setGroupsMembers(result.data);
            //console.log("GroupsMembers: " + JSON.stringify(result.data));
            //setIsAddingMatch(false)
        } catch (error) {
            
        }
      }
    const GetSubtorneoMatches = async () =>{
        try {
            setIsLoadingMatches(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatches/${params.idSubtorneo}`)
            setMatches(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            
        }
      }
    const GetRondas = async () =>{
        try {
            setIsLoadingMatches(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getRondas`)
            setRondas(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            
        }
      }
    const CreateSubtorneoMatch = async (e) =>{
        e.preventDefault()
        try {
            setIsAddingMatch(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.post(`http://localhost:4000/api/createSubtorneoMatch`, {
                idSubtorneo: params.idSubtorneo,
                id_player_uno: Id_player_uno,
                id_player_dos: Id_player_dos,
                id_player_tres: Id_player_tres,
                id_player_cuatro: Id_player_cuatro,
                resultado: Resultado,
                fecha: Fecha,
                hora: Hora,
                ronda: RondaString
            })
            setIsAddingMatch(false)
            window.location.reload();
        } catch (error) {
            
        }
      }

      const DeleteSubtorneoMatches = async (idMatch) =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.delete(`http://localhost:4000/api/DeleteMatch/${idMatch}`)
            window.location.reload()            
        } catch (error) {
            alert(error.message)
        }
    }

      useEffect(() => {
        GetGruposMembers();
        GetSubtorneoMatches();
        GetRondas();
        console.log("params " + params.idSubtorneo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
     

  return (
    <div className="createMatch_main_container">
        <div className="addMatch_form_container" style={{marginLeft:"2rem", marginTop:"1.5rem"}}>
                <h3>Agregar enfrentamiento</h3>
                <form onSubmit={CreateSubtorneoMatch} className="form_add_matches" >
                    <div className="add_matches_left_right_side">
                    
                    <div className="add_matches_left_side">
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No. 1</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_uno(e.target.value)} required>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No.2</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_dos(e.target.value)} required>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No.3</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_tres(e.target.value)} required>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="add_matches_right_side">
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Jugador No.4</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setId_player_cuatro(e.target.value)} required>
                                {
                                    GroupsMembers.map((gm, index)=>(
                                        <option key={index} value={gm.id}>{gm.id_pareja} - {gm.nombres} {gm.apellidos}</option>
                                    ))
                                }
                            </select>
                        </div>
                        
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Fecha</label>
                            <input type="date" id="cantPersonas" onChange={(e)=>setFecha(e.target.value)} required/>
                        </div>
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Hora</label>
                            <input type="time" id="cantPersonas" onChange={(e)=>setHora(e.target.value)} required/>
                        </div>
                        <div className="inputs_container">
                            <label htmlFor="cantPersonas">Ronda</label>
                            <select type="number" id="cantPersonas" onChange={(e)=>setRondaString(e.target.value)} required>
                                {
                                    Rondas.map((rond, index)=>(
                                        <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                    ))
                                }
                            </select>
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
                                <div className="matches_container_aux">
                                    <MatchInfo idPartido={match.id_partido} key={index} IsAdmin={true}/>
                                    <button onClick={(e)=>DeleteSubtorneoMatches(match.id_partido)}>Eliminar</button>
                                </div>
                                
                                
                            ))}
                            </div>
            </div>
    </div>
  )
}
