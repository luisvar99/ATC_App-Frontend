import React, { useState, useEffect } from 'react'
import './AddTorneo.css'
import {Link, useNavigate} from 'react-router-dom'



import axios from 'axios'


export default function AddTorneo() {

    const [Name, setName] = useState("")
    const [Inicio_inscripcion, setInicio_inscripcion] = useState(Date.now)
    const [Fin_inscripcion, setFin_inscripcion] = useState(Date.now)
    const [Inicio_torneo, setInicio_torneo] = useState(Date.now)
    const [Fin_torneo, setFin_torneo] = useState(Date.now)
    const [Description, setDescription] = useState("")
    const [Category, setCategory] = useState(0)
    const [Modalidad, setModalidad] = useState("")
    const [IsTorneoColores, setIsTorneoColores] = useState(false)

    const [Confirmation, setConfirmation] = useState("")

    useEffect(() => {
        console.log(IsTorneoColores);
    }, [IsTorneoColores])
    
    const AddNewTorneo = async (e) =>{
        e.preventDefault();
        if(Category==="" || Modalidad===""){
            alert("Por favor, complete todos los campos")
        }else{
            setConfirmation("Creando Torneo...")
            try {
                //const response = await axios.post('https://atcbackend.herokuapp.com/api/addTorneo',
                const response = await axios.post('http://localhost:4000/api/addTorneo',
                {
                    nombre_torneo: Name,
                    fecha_inicio: Inicio_torneo,
                    fecha_fin: Fin_torneo,
                    fecha_inicio_inscripcion: Inicio_inscripcion,
                    fecha_fin_inscripcion: Fin_inscripcion,
                    id_categoria: Category,
                    descripcion: Description,
                    modalidad: Modalidad
                })
                if(response.data.success===true){
                    setConfirmation("Se ha creado el torneo correctamente");
                }else{
                    setConfirmation("Ha ocurrido un error")
                }
                console.log(response.data);
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
            }
        }
    }

  return (
    <div className="main_addCancha_container">
        <h3 style={{marginTop:"2rem"}}>Agregar nuevo Torneo</h3>
        <div className="AddTorneoform_container">
            <form onSubmit={AddNewTorneo} className="form_add_canchas">
                <div className="name_input_container">
                    <label htmlFor="nameCancha">Nombre del Torneo</label>
                    <input type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="fechas_inicioT_finT">
                    <div className="inicioTorneo">
                        <label htmlFor="inicioT">Inicio del Torneo</label>
                        <input type="date" id="inicioT" onChange={(e)=>setInicio_torneo(e.target.value)} required/>
                    </div>
                    <div className="finTorneo">
                        <label htmlFor="finT">Fin del Torneo</label>
                        <input type="date" id="finT" onChange={(e)=>setFin_torneo(e.target.value)} required/>
                    </div>
                </div>
                <div className="fechas_inicioT_finT">
                    <div className="inicioTorneo">
                        <label htmlFor="inicioIns">Inicio Inscripcion</label>
                        <input type="date" id="inicioIns" onChange={(e)=>setInicio_inscripcion(e.target.value)} required/>
                    </div>
                    <div className="inicioTorneo">
                        <label htmlFor="FinIns">Fin Inscripcion</label>
                        <input type="date" id="FinIns" onChange={(e)=>setFin_inscripcion(e.target.value)} required/>
                    </div>
                </div>
                <div className="category_input_container">
                <label htmlFor="categoryCancha">Categoria</label>
                    <select id="ecategoryCancha" className="" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">---Seleccione una Categoria---</option>
                        <option value="0">Tennis</option>
                        <option value="1">Padel</option>
                    </select>
                </div>
                <div className="category_input_container">
                <label htmlFor="categoryCancha">Modalidad</label>
                    <select id="ecategoryCancha" className="" onChange={(e)=>setModalidad(e.target.value)}>
                        <option value="">---Seleccione una Modalidad---</option>
                        <option value="Singles">Singles</option>
                        <option value="Dobles">Dobles</option>
                    </select>
                </div>
                <div className="name_input_container">
                    <label htmlFor="description">Descripcion</label>
                    <textarea type="text" id="description" onChange={(e)=>setDescription(e.target.value)} rows="5" required/>
                </div>
                <div className="name_input_container">
                    <label htmlFor="ecategoryCancha">Tipo de Torneo</label>
                    <select id="ecategoryCancha" className="" onChange={(e)=>setIsTorneoColores(e.target.value)}>
                        <option value="">---Seleccione una Modalidad---</option>
                        <option value={true}>Colores</option>
                        <option value={false}>Regular</option>
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
