import './ManageRondas.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function ManageRondas() {

    const [Rondas, setRondas] = useState([])
    const [NombreRonda, setNombreRonda] = useState("")


    const GetRondas = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getRondas`)
            setRondas(result.data);
            console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const DeleteRonda = async (id_ronda) =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteRonda/${id_ronda}`)
            const filter = Rondas.filter(r => r.id_ronda !== id_ronda )
            //console.log(result.data);
            setRondas(filter);
            console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const CreateRonda = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.post(`http://localhost:4000/api/addRondas`,{
                nombre_ronda: NombreRonda
            })
            setRondas(result.data);
            console.log("Rondas: " + JSON.stringify(result.data));
            window.location.reload()
        } catch (error) {
            alert(error.message)
        }
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
                <form onSubmit={CreateRonda} className="manageRondasForm">
                    <div className='manageRondasNombreContainer'>
                        <h3 style={{margin:"1rem 0rem"}}>Agregar nueva ronda</h3>
                        <label htmlFor="nombreRonda">Nombre</label>
                        <input type="text" id="nombreRonda" onChange={(e)=> setNombreRonda(e.target.value)} required/>
                        <div className="manageRondasBtnContainer">
                            <button type="submit">Crear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
