import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ManageJornadas.css'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function ManageJornadas() {

    const [Jornadas, setJornadas] = useState([])
    const [DateOptions, setDateOptions] = useState({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const GetJornadas = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getJornadas')
            console.log("GetJornadas: " + result.data);
            setJornadas(result.data)
        } catch (error) {
            alert(error.message)
        }
    }

    const DeleteJornada = async (id_jornada) => {
        try {
            //await axios.delete(`https://atcbackend.herokuapp.com/api/DeleteJornada/${id}`);
            await axios.delete(`http://localhost:4000/api/DeleteJornada/${id_jornada}`);
            const filter = Jornadas.filter(e => e.id_jornada !== id_jornada)
            setJornadas(filter);
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
      GetJornadas();
    }, [])
    
  return (
    <div className="JornadasContainer">

        <div className='JornadasTableContainer'>
            <table>
                <thead>
                    <tr>
                        <td>Ronda</td>
                        <td>Fecha</td>
                        <td>Equipo 1</td>
                        <td>Equipo 2</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Jornadas.map((j, index)=>(
                            <tr key={index}>
                                <td>{j.nombre}</td>
                                <td>{new Date(j.fecha).toLocaleDateString("es-MX", DateOptions)}</td>
                                <td>{j.equipo_uno}</td>
                                <td>{j.equipo_dos}</td>
                                {
                                    sessionStorage.getItem("userRole")==="ADMIN" &&
                                    <>
                                        <td><Link to={`editJornada/${j.id_jornada}`}><FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "black"}}/></Link></td>
                                        <td><FontAwesomeIcon icon={faTrash} size="2x" className="deleteIcon" onClick={(e) => DeleteJornada(j.id_jornada)} style={{cursor: "pointer"}}/></td>
                                    </>
                                }
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
