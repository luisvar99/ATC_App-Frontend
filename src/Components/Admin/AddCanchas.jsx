import React, { useState, useEffect } from 'react'
import './AddCanchas.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

import { RotatingLines } from  'react-loader-spinner'
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function AddCanchas() {

    const [Name, setName] = useState("")
    const [Category, setCategory] = useState("")
    const [Status, setStatus] = useState("")
    const [Confirmation, setConfirmation] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const [AddingCancha, setAddingCancha] = useState(false);

    useEffect(() => {
      console.log("Name:" + Name);
      console.log("Category: " + Category);
      console.log("Status: " + Status);
    }, [Name, Category, Status])
    
    const AddNewCancha = async (e) =>{
        e.preventDefault();
        if(Category==="" || Status===""){
            alert("Por favor, complete todos los campos")
        }else{
            try {
                setAddingCancha(true)
                /* await axios.post('http://localhost:4000/api/addCancha',
                {
                    nombre_cancha: Name,
                    id_categoriacancha: Category,
                    estatus_cancha: Status,
                }) */
                const result = await axios.post('http://localhost:4000/api/addCancha',
                {
                    nombre_cancha: Name,
                    id_categoriacancha: Category,
                    estatus_cancha: Status,
                })
                if(result.data.success===true){
                    setAddingCancha(false)
                    setIsOpen(true);
                }else{
                    setAddingCancha(false)
                    setConfirmation("Ha ocurrido un error")
                }
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                setAddingCancha(false)
                alert(error.message);
            }
        }
    }

    function closeModal() {
        setIsOpen(false);
      }


  return (
    <div className="main_addCancha_container">
        <h3>Agregar nueva cancha</h3>
        <Modal
            open={modalIsOpen}
            onClose={closeModal}
            center
          >
            <h2>La cancha ha sido agregada exitosamente</h2>
            <div className="modal_container">
              <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
              <button onClick={closeModal}>Aceptar</button>
            </div>

          </Modal>
        <div className="Addform_container">
            <form onSubmit={AddNewCancha} className="form_add_canchas">
                <div className="name_input_container">
                    <label htmlFor="nameCancha">Nombre</label>
                    <input type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="category_input_container">
                <label htmlFor="categoryCancha">Categoria</label>
                    <select id="ecategoryCancha" className="" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">---Seleccione una Categoria---</option>
                        <option value="0">Tennis</option>
                        <option value="1">Padel</option>
                    </select>
                </div>
                <div className="status_input_container">
                    <label htmlFor="estatusCancha">Estatus</label>
                    <select id="estatusCancha" className="" onChange={(e)=>setStatus(e.target.value)}>
                        <option value="">---Seleccione un Estatus---</option>
                        <option value="1">Abierta</option>
                        <option value="0">Cerrada</option>
                    </select>
                </div>
                <p style={{fontSize:"14px"}}>{Confirmation}</p>
                <div className="btn_addCancha_container">
                    {
                        AddingCancha &&

                        <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}
                        />
                    }
                    <button type="submit">Agregar</button>
                    <Link to="/admin/manageCanchas" className="link_go_back">Volver</Link>
                </div>
            </form>
        </div>
    </div>
  )
}
