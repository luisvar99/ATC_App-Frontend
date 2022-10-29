import React, { useState, useEffect } from 'react'
import './AddCanchas.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'


export default function AddCanchas() {

    const [Name, setName] = useState("")
    const [Category, setCategory] = useState("")
    const [Status, setStatus] = useState("")
    const [Confirmation, setConfirmation] = useState("")

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
            setConfirmation("Agregando cancha")
            try {
                await axios.post('http://localhost:4000/api/addCancha',
                {
                    nombre_cancha: Name,
                    id_categoriacancha: Category,
                    estatus_cancha: Status,
                })
                setConfirmation("Se ha agregado la cancha correctamente")
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
        }
    }

  return (
    <div className="main_addCancha_container">
        <h3>Agregar nueva cancha</h3>
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
                    <button type="submit">Agregar</button>
                    <button type="submit"><Link to="/admin/manageCanchas" className="link_go_back">Volver</Link></button>
                </div>
            </form>
        </div>
    </div>
  )
}
