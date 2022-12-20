import './ManageRondas.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function EditRonda() {

    const [NombreRonda, setNombreRonda] = useState("")

    const params = useParams()

    const Navigate = useNavigate();

    const GetRondaById = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getRondaById/${params.id_ronda}`)
            setNombreRonda(result.data[0].nombre);
            console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    const UpdateRonda = async (e) =>{
        e.preventDefault()
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.put(`http://localhost:4000/api/editRonda/${params.id_ronda}`,
            {
                nombre_ronda:NombreRonda
            })
            console.log("Result: " + JSON.stringify(result.data.success));
            if(result.data.success===true){
                Navigate(-1)
            }
        } catch (error) {
            alert(error.message)
        }
      }

      useEffect(() => {
        GetRondaById()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      

  return (
    <div className="ManageRondas_main_container">
        <div className="manageRondasSubContainer">
            <div className="manageRondasFormContainer">
                <form onSubmit={UpdateRonda} className="manageRondasForm">
                    <div className='manageRondasNombreContainer'>
                        <h3 style={{margin:"1rem 0rem"}}>Editar Ronda</h3>
                        <label htmlFor="nombreRonda">Nombre</label>
                        <input value={NombreRonda} type="text" id="nombreRonda" onChange={(e)=> setNombreRonda(e.target.value)}/>
                        <div className="manageRondasBtnContainer">
                            <button type="submit">Guardar Cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
