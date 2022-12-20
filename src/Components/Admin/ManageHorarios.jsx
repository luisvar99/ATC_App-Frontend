import './ManageRondas.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function ManageHorarios() {

    const [Horarios, setHorarios] = useState([])
    const [Inicio, setInicio] = useState("")
    const [Fin, setFin] = useState("")
    const [Hora_inicio, setHora_inicio] = useState(new Date())
    const [Estatus, setEstatus] = useState(1)


    const GetHorarios = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getAllHorarios`)
            setHorarios(result.data);
            //console.log("setHorarios: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const DeleteHorario = async (id_horario) =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteRonda/${id_horario}`)
            const filter = Horarios.filter(h => h.id_horario !== id_horario )
            //console.log(result.data);
            setHorarios(filter);
            //console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const CreateHorario = async (e) =>{
        e.preventDefault();
        setHora_inicio(Inicio)

        console.log("Inicio: " + Inicio);
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.post(`http://localhost:4000/api/addHorario`,{
                inicio: Inicio,
                fin: (new Date("1970-01-01T" +Inicio).getHours()+1)+":00",
                hora_inicio: new Date("1970-01-01T" + Inicio).getHours()+":00",
                estatus_horario: Estatus
            })
            //console.log("Rondas: " + JSON.stringify(result.data));
            window.location.reload()
        } catch (error) {
            alert(error.message)
        }
      }


    useEffect(() => {
        GetHorarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(Inicio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Inicio])


  return (
    <div className="ManageRondas_main_container">
        <div className="manageRondasSubContainer">
            <div className="manageHorariosTableContainer">
                <table>
                    <thead>
                        <tr>
                            <td>Hora de Inicio</td>
                            <td>Hora de Fin</td>
                            <td>Estatus</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {Horarios.map((r, index)=>(
                            <tr key={index}>
                                <td style={{padding: "10px 15px"}}>{r.inicio}</td>
                                <td style={{padding: "10px 15px"}}>{r.fin}</td>
                                <td style={{padding: "10px 15px"}}>{parseInt(r.estatus_horario)===1 ? "Disponible" :  "No Disponible"}</td>
                                <td style={{padding: "10px 15px"}}><Link to={`editRonda/${r.id_horario}`}> <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "#515151"}}/> </Link></td>
                                <td style={{padding: "10px 15px"}}><FontAwesomeIcon icon={faTrash} size="2x" onClick={(e) => DeleteHorario(r.id_horario)} style={{cursor: "pointer", color: "#515151"}}/></td>                            
                            </tr>

                        ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="manageRondasFormContainer">
                <form onSubmit={CreateHorario} className="manageRondasForm">
                    <div className='manageRondasNombreContainer'>
                        <h3 style={{margin:"1rem 0rem"}}>Agregar nuevo Horario</h3>
                        <label htmlFor="nombreRonda">Hora Inicio</label>
                        <select type="text" id="nombreRonda" onChange={(e)=> setInicio(e.target.value)} required>
                            <option value="">--- Seleccione una opcion ---</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                        </select>                        
                    </div>
                    <br />
                    <div className='manageRondasNombreContainer'>
                        <label htmlFor="nombreRonda">Hora Fin</label>
                        <input value={Inicio !== "" ? (new Date("1970-01-01T" +Inicio).getHours()+1)+":00" : ""} type="text" id="nombreRonda" readOnly/>
                    </div>
                    <br />
                    <div className='manageRondasNombreContainer'>
                        <label htmlFor="nombreRonda">Estatus</label>
                        <select type="text" id="nombreRonda" onChange={(e)=> setEstatus(e.target.value)} required>
                            <option value="">--- Seleccione una opcion ---</option>
                            <option value={1}>Abierto</option>
                            <option value={0}>Cerrado</option>
                        </select>
                    </div>
                    <div className="manageRondasBtnContainer">
                        <button type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
