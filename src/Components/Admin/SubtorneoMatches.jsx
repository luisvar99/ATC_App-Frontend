import React, { useState, useEffect } from 'react'
import './AddCanchas.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'
import { RotatingLines } from  'react-loader-spinner'

export default function SubtorneoMatches() {

    const [GroupsMembers, setGroupsMembers] = useState([])
    const [Id_player_uno, setId_player_uno] = useState(0)
    const [Id_player_dos, setId_player_dos] = useState(0)
    const [Id_player_tres, setId_player_tres] = useState(0)
    const [Id_player_cuatro, setId_player_cuatro] = useState(0)
    const [Fecha, setFecha] = useState("")
    const [Hora, setHora] = useState("")
    const [Resultado, setResultado] = useState("")

    const [IsLoadingMembers, setIsLoadingMembers] = useState(false)


    const params = useParams();

    const GetGruposMembers = async () =>{
        try {
            setIsLoadingMembers(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.idSubtorneo}`)
            setGroupsMembers(result.data);
            console.log("GroupsMembers: " + JSON.stringify(result.data));
            setIsLoadingMembers(false)
        } catch (error) {
            
        }
      }
    const CreateSubtorneoMatch = async (e) =>{
        e.preventDefault()
        try {
            setIsLoadingMembers(true)
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
            })
            setIsLoadingMembers(false)
        } catch (error) {
            
        }
      }

      useEffect(() => {
        GetGruposMembers();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
      useEffect(() => {
        console.log(Id_player_uno);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Id_player_uno])

  return (
    <div className="createMatch_main_container">
        <div className="EditTorneo_form_container">
                <h3>Agregar enfrentamiento</h3>
                <form onSubmit={CreateSubtorneoMatch} className="form_add_canchas">
                    <div className="name_input_container">
                        <label htmlFor="cantPersonas">Jugador No. 1</label>
                        <select type="number" id="cantPersonas" onChange={(e)=>setId_player_uno(e.target.value)} required>
                            {
                                GroupsMembers.map((gm, index)=>(
                                    <option key={index} value={gm.id}>{gm.accion} - {gm.nombres}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="name_input_container">
                        <label htmlFor="cantPersonas">Jugador No.2</label>
                        <select type="number" id="cantPersonas" onChange={(e)=>setId_player_dos(e.target.value)} required>
                            {
                                GroupsMembers.map((gm, index)=>(
                                    <option key={index} value={gm.id}>{gm.accion} - {gm.nombres}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="cantPersonas">Jugador No.3</label>
                        <select type="number" id="cantPersonas" onChange={(e)=>setId_player_tres(e.target.value)} required>
                            {
                                GroupsMembers.map((gm, index)=>(
                                    <option key={index} value={gm.id}>{gm.accion} - {gm.nombres}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="cantPersonas">Jugador No.4</label>
                        <select type="number" id="cantPersonas" onChange={(e)=>setId_player_cuatro(e.target.value)} required>
                            {
                                GroupsMembers.map((gm, index)=>(
                                    <option key={index} value={gm.id}>{gm.accion} - {gm.nombres}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="cantPersonas">Fecha</label>
                        <input type="date" id="cantPersonas" onChange={(e)=>setFecha(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="cantPersonas">Hora</label>
                        <input type="time" id="cantPersonas" onChange={(e)=>setHora(e.target.value)} required/>
                    </div>
                    
                    <div className="btn_addCancha_container">
                        <button type="submit">Aceptar</button>
                        {IsLoadingMembers &&
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
    </div>
  )
}
