import './ManageRondas.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './ManageHorarios.css'

import { RotatingLines } from  'react-loader-spinner'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function ManageHorarios() {

    const [Horarios, setHorarios] = useState([])
    const [Inicio, setInicio] = useState("")
    const [Fin, setFin] = useState("")
    const [Hora_inicio, setHora_inicio] = useState(new Date())
    const [Estatus, setEstatus] = useState(1)
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [DeleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [IsAddingHorario, setIsAddingHorario] = useState(false);

    const GetHorarios = async () =>{
        try {
            //const result = await axios.get(`http://localhost:4000/api/getAllHorarios`)
            const result = await axios.get(`http://localhost:4000/api/getAllHorarios`)
            setHorarios(result.data);
            //console.log("setHorarios: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const DeleteHorario = async (id_horario) =>{
        try {
            //const result = await axios.delete(`http://localhost:4000/api/deleteHorario/${id_horario}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteHorario/${id_horario}`)
            if(result.data.success === true){
                const filter = Horarios.filter(h => h.id_horario !== id_horario )
                setHorarios(filter);
                setDeleteModalIsOpen(true)
            }else{
                alert("Ha ocurrido un error al eliminar al horario")
            }
            
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
            setIsAddingHorario(true)
            const result = await axios.post(`http://localhost:4000/api/addHorario`,{
                inicio: Inicio,
                fin: (new Date("1970-01-01T" +Inicio).getHours()+1)+":00",
                hora_inicio: new Date("1970-01-01T" + Inicio).getHours()+":00",
                estatus_horario: Estatus
            })
            /* const result = await axios.post(`http://localhost:4000/api/addHorario`,{
                inicio: Inicio,
                fin: (new Date("1970-01-01T" +Inicio).getHours()+1)+":00",
                hora_inicio: new Date("1970-01-01T" + Inicio).getHours()+":00",
                estatus_horario: Estatus
            }) */
            //console.log("Rondas: " + JSON.stringify(result.data));
            if(result.data.success === true){
                setModalIsOpen(true)
                setIsAddingHorario(false)
            }else{
                alert("Ha ocurrido un error al eliminar al horario")
            }
        } catch (error) {
            alert(error.message)
            setIsAddingHorario(false)
        }
      }


    useEffect(() => {
        GetHorarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function closeModal() {
        setModalIsOpen(false);
        window.location.reload()
    }

    function closeDeleteModal() {
        setDeleteModalIsOpen(false);
        window.location.reload()
    }

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
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {Horarios.map((r, index)=>(
                            <tr key={index}>
                                <td style={{padding: "10px 15px"}}>{r.inicio}</td>
                                <td style={{padding: "10px 15px"}}>{r.fin}</td>
                                <td style={{padding: "10px 15px"}}>{parseInt(r.estatus_horario)===1 ? "Disponible" :  "No Disponible"}</td>
                                {/* <td style={{padding: "10px 15px"}}><Link to={`editRonda/${r.id_horario}`}> <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "#515151"}}/> </Link></td> */}
                                <td style={{padding: "10px 15px"}}><FontAwesomeIcon icon={faTrash} size="2x" onClick={(e) => DeleteHorario(r.id_horario)} style={{cursor: "pointer", color: "#515151"}}/></td>                            
                            </tr>

                        ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="manageRondasFormContainer">
                <Modal
                open={ModalIsOpen}
                onClose={closeModal}
                center
                >
                <h2>El horario ha sido agregado exitosamente</h2>
                <div className="modal_container">
                <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                <button onClick={closeModal}>Aceptar</button>
                </div>
            </Modal>

                <Modal
                open={DeleteModalIsOpen}
                onClose={closeDeleteModal}
                center
                >
                <h2>El horario ha sido eliminado exitosamente</h2>
                <div className="modal_container">
                <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                <button onClick={closeModal}>Aceptar</button>
                </div>
            </Modal>
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
                    {IsAddingHorario && 
                        <RotatingLines
                            strokeColor="green"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="35"
                            visible={true}
                        />
                    }
                        <button type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
