import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './ColoresEnfrentamientos.css'
import GetColoresEnfretamientosPlayers from './GetColoresEnfretamientosPlayers'

export default function ColoresEnfrentamientos() {

    const [Enfrentamientos, setEnfrentamientos] = useState([])


    const params = useParams();

    const getColoresEnfrentamientos = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetColoresMatches/${params.id}`);
            setEnfrentamientos(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }

    useEffect(() => {
        getColoresEnfrentamientos();
    }, [])
        
  return (
    <div className='ColoresEnfrentamientos_main_container'>
        <div className='ColoresEnfrentamientos_sub_container'>
            {
                Enfrentamientos.map((e, index)=>(
                    <div key={index}>
                        <GetColoresEnfretamientosPlayers id_partido={e.id_partido} id_torneo={params.id}/>
                        <div className='delete_edit_colores_match_container'>
                            <button className='delete_colores_match'>Eliminar</button>
                            <button className='edit_colores_match'>Editar</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
