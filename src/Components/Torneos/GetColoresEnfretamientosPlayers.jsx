import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


export default function GetColoresEnfretamientosPlayers({id_partido, id_torneo}) {

    const [Enfrentamiento, setEnfrentamiento] = useState([])
    const [FechaEnfrentamiento, setFechaEnfrentamiento] = useState([])
    const [RondaEnfrentamiento, setRondaEnfrentamientos] = useState([])

    const [IsLoadingEnfrentamientos, setIsLoadingEnfrentamientos] = useState(false)

    const getColoresEnfrentamientosByIdPartido = async ()=> {
        try {
            setIsLoadingEnfrentamientos(true)
            const result = await axios.get(`http://localhost:4000/api/GetColoresEnfretamientosPlayers/${id_torneo}/${id_partido}`);
            setEnfrentamiento(result.data);
            setFechaEnfrentamiento(result.data[0].fecha);
            setRondaEnfrentamientos(result.data[0].nombre);
            setIsLoadingEnfrentamientos(false)
            //console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }

    useEffect(() => {
        getColoresEnfrentamientosByIdPartido();
    }, [])

  return (
    <div className='ColoresEnfrentamientos_table_container' style={{fontSize:"0.9rem"}}>
        {
            IsLoadingEnfrentamientos ?
                <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="35"
                visible={true}
                />
            :
            <>
                <p>Fecha: {new Date(FechaEnfrentamiento).toLocaleDateString('ES-MX')}</p>
                <p>Ronda: {RondaEnfrentamiento}</p>
                <table style={{fontSize:"0.9rem"}}>
                    <thead>
                        <tr>
                            <td>Jugadores</td>
                            <td>Fecha</td>
                            <td>Codigo Pareja</td>
                        </tr>
                    </thead>
                    <tbody >
                        {  Enfrentamiento.map((e, index)=>(
                            <tr key={index}>
                                <td style={{backgroundColor:e.color, color:"white"}}>{e.nombres} {e.apellidos}</td>
                                <td>{new Date(e.fecha).toLocaleDateString('ES-MX')}</td>
                                <td style={{width:"5%"}}>{e.id_pareja}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </>
        }
    </div>
  )
}
