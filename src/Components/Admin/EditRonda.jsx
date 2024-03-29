import './ManageRondas.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { RotatingLines } from  'react-loader-spinner'

export default function EditRonda() {

    const [NombreRonda, setNombreRonda] = useState("")
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [IsUpdatingRonda, setIsUpdatingRonda] = useState(false)

    const params = useParams()

    const Navigate = useNavigate();

    const GetRondaById = async () =>{
        try {
            const result = await axios.get(`http://localhost:4000/api/getRondaById/${params.id_ronda}`)
            //const result = await axios.get(`http://localhost:4000/api/getRondaById/${params.id_ronda}`)
            setNombreRonda(result.data[0].nombre);
            console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const UpdateRonda = async (e) =>{
        e.preventDefault()
        try {
            setIsUpdatingRonda(true)
            const result = await axios.put(`http://localhost:4000/api/editRonda/${params.id_ronda}`,
            {
                nombre_ronda: NombreRonda
            })
            /* const result = await axios.put(`http://localhost:4000/api/editRonda/${params.id_ronda}`,
            {
                nombre_ronda:NombreRonda
            }) */
            if(result.data.success===true){
                setIsUpdatingRonda(false)
                setModalIsOpen(true)
                
            }
        } catch (error) {
            setIsUpdatingRonda(false)
            alert(error.message)
        }
      }

      function closeModal() {
        setModalIsOpen(false);
        Navigate(-1)
    }

      useEffect(() => {
        GetRondaById()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      

  return (
    <div className="ManageRondas_main_container">
        <div className="manageRondasSubContainer">
            <div className="manageRondasFormContainer">
            <Modal
                open={ModalIsOpen}
                onClose={closeModal}
                center
            >
                <h2>La ronda ha sido actualizada exitosamente</h2>
                <div className="modal_container">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                    <button onClick={closeModal}>Aceptar</button>
                </div>
            </Modal>
                <form onSubmit={UpdateRonda} className="manageRondasForm">
                    <div className='manageRondasNombreContainer'>
                        <h3 style={{margin:"1rem 0rem"}}>Editar Ronda</h3>
                        <label htmlFor="nombreRonda">Nombre</label>
                        <input value={NombreRonda} type="text" id="nombreRonda" onChange={(e)=> setNombreRonda(e.target.value)}/>
                        <div className="manageRondasBtnContainer">
                        {IsUpdatingRonda &&
                            <RotatingLines
                                strokeColor="green"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="35"
                                visible={true}/>
                            }
                            <button type="submit">Guardar Cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
