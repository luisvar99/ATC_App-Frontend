import React, { useState, useEffect } from 'react'
import './AddCanchas.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RotatingLines } from  'react-loader-spinner'

import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function AddSubTorneo() {
    const [Name, setName] = useState("")
    const [Cantidad_personas, setCantidad_personas] = useState(0)
    const [id_torneo, setStatus] = useState(0)
    const [Categoria, setCategoria]= useState(0)

    const [IsAddingSubTorneo, setIsAddingSubTorneo] = useState(false)
    const [ModalIsOpen, setModalIsOpen] = useState(false);


    const params = useParams();
    
    const AddNewCompetencia = async (e) =>{
        e.preventDefault();
        if(Name==="" || Cantidad_personas===""){
            alert("Por favor, complete todos los campos")
        }else{
            try {
                setIsAddingSubTorneo(true)
                /* await axios.post('http://localhost:4000/api/addSubtorneo',
                {
                    id_torneo: params.idTorneo,
                    nombre: Name,
                    cantidad_personas: Cantidad_personas,
                    categoria: Categoria,
                }) */
                const result = await axios.post('http://localhost:4000/api/addSubtorneo',
                {
                    id_torneo: params.idTorneo,
                    nombre: Name,
                    cantidad_personas: Cantidad_personas,
                    categoria: Categoria,
                })
                if(result.data.success===true){
                    setModalIsOpen(true)
                    setIsAddingSubTorneo(false)
                }else{
                    setIsAddingSubTorneo(false)
                    alert("Ha ocurrido un error")
                }
            } catch (error) {
                setIsAddingSubTorneo(false)
                alert("Ha ocurrido un error")
                alert(error.message);
            }
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

  return (
    <div className="main_addCancha_container">
        <h3>Agregar categoría a {params.nombreTorneo}</h3>
        <div className="Addform_container">
        <Modal
            open={ModalIsOpen}
            onClose={closeModal}
            center
        >
            <h2>La categoria ha sido agregada exitosamente</h2>
            <div className="modal_container">
            <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
            <button onClick={closeModal}>Aceptar</button>
            </div>
        </Modal>
            <form onSubmit={AddNewCompetencia} className="form_add_canchas">
                <div className="name_input_container">
                    <label htmlFor="nameCancha">Nombre</label>
                    <input type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="name_input_container">
                    <label htmlFor="cantPersonas">Cantidad de Personas</label>
                    <input type="number" id="cantPersonas" onChange={(e)=>setCantidad_personas(e.target.value)} required/>
                </div>
                <div className="name_input_container">
                        <label htmlFor="sexo">Categoria</label>
                        <select id="sexo" onChange={(e)=>setCategoria(e.target.value)} required>
                            <option value="">---Seleccione una opcion---</option>
                            <option value="1">Primera</option>
                            <option value="2">Segunda</option>
                            <option value="3">Tercera</option>
                            <option value="4">Cuarta</option>
                            <option value="5">Quinta</option>
                            <option value="6">Sexta</option>
                        </select>
                    </div>
                <div className="btn_addCancha_container">
                {IsAddingSubTorneo && 
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}
                        />
                }
                    <button type="submit">Agregar</button>
                    <button type="submit"><Link to="/admin/manageTorneos" className="link_go_back">Volver</Link></button>
                </div>
            </form>
        </div>
    </div>
  )
}
