import React, { useState, useEffect } from 'react'
import './AddCanchas.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'



export default function AddSubTorneo() {
    const [Name, setName] = useState("")
    const [Cantidad_personas, setCantidad_personas] = useState(0)
    const [id_torneo, setStatus] = useState(0)

    const [Confirmation, setConfirmation] = useState("")


    const params = useParams();
    
    const AddNewCompetencia = async (e) =>{
        e.preventDefault();
        if(Name==="" || Cantidad_personas===""){
            alert("Por favor, complete todos los campos")
        }else{
            setConfirmation("Agregando cancha")
            try {
                await axios.post('http://localhost:4000/api/addSubtorneo',
                {
                    id_torneo: params.idTorneo,
                    nombre: Name,
                    cantidad_personas: Cantidad_personas,
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
        <h3>Agregar competencia a {params.nombreTorneo}</h3>
        <div className="Addform_container">
            <form onSubmit={AddNewCompetencia} className="form_add_canchas">
                <div className="name_input_container">
                    <label htmlFor="nameCancha">Nombre</label>
                    <input type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="name_input_container">
                    <label htmlFor="cantPersonas">Cantidad de Personas</label>
                    <input type="number" id="cantPersonas" onChange={(e)=>setCantidad_personas(e.target.value)} required/>
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
