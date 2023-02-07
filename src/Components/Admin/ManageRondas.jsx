import './ManageRondas.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { RotatingLines } from  'react-loader-spinner'

export default function ManageRondas() {

    const [Rondas, setRondas] = useState([])
    const [NombreRonda, setNombreRonda] = useState("")
    const [IsAddingRonda, setIsAddingRonda] = useState(false)

    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [DeleteRondaModal, setDeleteRondaModal] = useState(false);


    const GetRondas = async () =>{
        try {
            const result = await axios.get(`http://localhost:4000/api/getRondas`)
            //const result = await axios.get(`http://localhost:4000/api/getRondas`)
            setRondas(result.data);
            console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const DeleteRonda = async (id_ronda) =>{
        try {
            //const result = await axios.delete(`http://localhost:4000/api/deleteRonda/${id_ronda}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteRonda/${id_ronda}`)
            if(result.data.success===true){
                const filter = Rondas.filter(r => r.id_ronda !== id_ronda )
                setRondas(filter);
                setDeleteRondaModal(true)
            }else{
                alert("Ha ocurrido un error")
            }
        } catch (error) {
            alert(error.message)
        }
      }

    const CreateRonda = async (e) =>{
        e.preventDefault()
        try {
            setIsAddingRonda(true)
            const result = await axios.post(`http://localhost:4000/api/addRondas`,{
                nombre_ronda: NombreRonda
            })
            /* const result = await axios.post(`http://localhost:4000/api/addRondas`,{
                nombre_ronda: NombreRonda
            }) */
            if(result.data.success===true) {
                setModalIsOpen(true)
            }else{
                alert("Ha ocurrido un error")
                setIsAddingRonda(false)
            }
        } catch (error) {
            setIsAddingRonda(false)
            alert(error.message)
        }
      }

      function closeModal() {
        setModalIsOpen(false);
        window.location.reload();
    }
      
    function closeDeleteRondaModal() {
        setDeleteRondaModal(false);
    }

    useEffect(() => {
        GetRondas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <div className="ManageRondas_main_container">
        <div className="manageRondasSubContainer">
            <div className="manageRondasTableContainer">
                <table>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {Rondas.map((r, index)=>(
                            <tr key={index}>
                                <td style={{padding: "10px 15px"}}>{r.nombre}</td>
                                <td style={{padding: "10px 15px"}}><Link to={`editRonda/${r.id_ronda}`}> <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "#515151"}}/> </Link></td>
                                <td style={{padding: "10px 15px"}}><FontAwesomeIcon icon={faTrash} size="2x" onClick={(e) => DeleteRonda(r.id_ronda)} style={{cursor: "pointer", color: "#515151"}}/></td>                            
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
                <h2>La ronda ha sido creada exitosamente</h2>
                <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closeModal}>Aceptar</button>
                </div>
            </Modal>

            <Modal
                open={DeleteRondaModal}
                onClose={closeDeleteRondaModal}
                center
            >
                <h2>La ronda ha sido eliminada exitosamente</h2>
                <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closeDeleteRondaModal}>Aceptar</button>
                </div>
            </Modal>
                <form onSubmit={CreateRonda} className="manageRondasForm">
                    <div className='manageRondasNombreContainer'>
                        <h3 style={{margin:"1rem 0rem"}}>Agregar nueva ronda</h3>
                        <label htmlFor="nombreRonda">Nombre</label>
                        <input type="text" id="nombreRonda" onChange={(e)=> setNombreRonda(e.target.value)} required/>
                        <div className="manageRondasBtnContainer">
                        {IsAddingRonda &&
                            <RotatingLines
                                strokeColor="green"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="35"
                                visible={true}/>
                            }
                            <button type="submit">Crear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
