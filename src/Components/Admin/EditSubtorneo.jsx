import React, { useState, useEffect } from 'react'
import './AddCanchas.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'


export default function EditSubtorneo() {
    const [Name, setName] = useState("")
    const [Cantidad_personas, setCantidad_personas] = useState(0)
    const [Id_torneo, setId_torneo] = useState(0)
    const [Participants, setParticipants] = useState([])


    const [Confirmation, setConfirmation] = useState("")


    const params = useParams();

    const GetSubtorneoById = async (e) =>{
        try {
            const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubtorneo}`)
            setName(result.data[0].nombre)
            setCantidad_personas(result.data[0].cantidad_personas)
            setId_torneo(result.data[0].id_torneo)
            //console.log("RESULT: " + JSON.stringify(result.data));
            
        } catch (error) {
            alert("ERROR: " + error.message);
        }
    }
    
    const UpdateCompetencia = async (e) =>{
        e.preventDefault();
        if(Name==="" || Cantidad_personas===""){
            alert("Por favor, complete todos los campos")
        }else{
            setConfirmation("Editando competencia")
            try {
                await axios.put(`https://atcbackend.herokuapp.com/api/editSubTorneo/${params.idSubtorneo}`,
                {
                    id_torneo: params.idTorneo,
                    nombre: Name,
                    cantidad_personas: Cantidad_personas,
                })
                setConfirmation("Se ha editado la competencia correctamente")
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
        }
    }

    const getSubTournamentParticipants = async () => {

        const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSubTorneosParticipants/${params.idSubtorneo}`)
        setParticipants(result.data);
        //console.log(result.data);
      }

      const DeleteSubTorneoParticipant = async (id_subtorneo, user_id)=>{
        try {
            const result = await axios.delete(`https://atcbackend.herokuapp.com/api/deleteSubTorneoParticipant/user=${user_id}/${id_subtorneo}`);
            const filter = Participants.filter(p => p.id !== user_id )
            console.log(result.data);
            setParticipants(filter);
        } catch (error) {
            alert(error.message)
        }
      }

    useEffect(() => {
        GetSubtorneoById();
        getSubTournamentParticipants();
        console.log(Participants);
    },[])


  return (
    <div className="main_editTorneo_container">
        <div className="EditTorneo_form_container">
            <h3>Editar competencia</h3>
            <form onSubmit={UpdateCompetencia} className="form_add_canchas">
                <div className="name_input_container">
                    <label htmlFor="nameCancha">Nombre</label>
                    <input value={Name} type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="name_input_container">
                    <label htmlFor="cantPersonas">Cantidad de Personas</label>
                    <input value={Cantidad_personas} type="number" id="cantPersonas" onChange={(e)=>setCantidad_personas(e.target.value)} required/>
                </div>
                <p style={{fontSize:"14px"}}>{Confirmation}</p>
                <div className="btn_addCancha_container">
                    <button type="submit">Agregar</button>
                    <button type="submit"><Link to={`/admin/manageTorneos/editTorneo/id=${Id_torneo}`} className="link_go_back">Volver</Link></button>
                </div>
            </form>
        </div>
        <div className="subtorneo_details_table_container">
            <table className="subtorneo_details_table">
                <thead>
                    <tr className="table_headers">
                        <th>Participantes</th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            Participants.map((participant, index)=>(
                                <tr key={index}>
                                <td>{participant.username}</td>
                                <td><button onClick={()=> DeleteSubTorneoParticipant(participant.id_subtorneo, participant.id)} className="editTorneoDeleteParticipant">Eliminar</button></td>
                            </tr>
                            ))
                        }
                    </tbody>
            </table>
        </div>
    </div>
  )
}
