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

export default function ColoresEnfrentamientos({isAdmin}) {

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

    const DeleteColoresEnfrentamiento = async ( ev ,id_partido)=> {
        ev.preventDefault();
        try {
            const result = await axios.delete(`http://localhost:4000/api/DeleteColoresEnfrentamiento/${id_partido}`);
            const filter = Enfrentamientos.filter(p => p.id_partido !== id_partido )
            console.log("filter: "+filter);
            setEnfrentamientos(filter);
        }catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getColoresEnfrentamientos();
    }, [])
        
  return (
    <>
    
    <div className='ColoresEnfrentamientos_main_container'>
        <div className='ColoresEnfrentamientos_sub_container'>
            {
                Enfrentamientos.length===0 ?
                <p>En este momento no hay enfrentamientos creados</p>
                :
                Enfrentamientos.map((e, index)=>(
                    <div key={index}>
                        <GetColoresEnfretamientosPlayers id_partido={e.id_partido} id_torneo={params.id}/>
                        <div className='delete_edit_colores_match_container'>
                            {isAdmin!==false &&
                                <>
                                    <button className='delete_colores_match' onClick={(ev)=>DeleteColoresEnfrentamiento(ev, e.id_partido)}>Eliminar</button>
                                    <button className='edit_colores_match'><Link to={`id_partido=${e.id_partido}`}>Editar</Link></button>
                                </>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}
