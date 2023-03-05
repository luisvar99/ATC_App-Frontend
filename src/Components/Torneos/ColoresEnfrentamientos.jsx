import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import {Link} from 'react-router-dom'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ColoresEnfrentamientos.css'
import GetColoresEnfretamientosPlayers from './GetColoresEnfrentamientosPlayers'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


export default function ColoresEnfrentamientos({isAdmin}) {

    const [Enfrentamientos, setEnfrentamientos] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);

    const params = useParams();

    const getColoresEnfrentamientos = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetColoresMatches/${params.id}`);
            //const result = await axios.get(`http://localhost:4000/api/GetColoresMatches/${params.id}`);
            setEnfrentamientos(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert("COLORES: " + error.message)
    
        }
    }

    const DeleteColoresEnfrentamiento = async ( ev ,id_partido, id_cancha, id_horario, fecha)=> {
        ev.preventDefault();
        try {
            const result = await axios.delete(`http://localhost:4000/api/DeleteColoresEnfrentamiento/${id_partido}/${id_cancha}/${id_horario}/${fecha}`);
            //const result = await axios.delete(`http://localhost:4000/api/DeleteColoresEnfrentamiento/${id_partido}/${id_cancha}/${id_horario}/${fecha}`);
            if(result.data.success===true){
                setIsOpen(true)
                const filter = Enfrentamientos.filter(p => p.id_partido !== id_partido )
                setEnfrentamientos(filter);
            }else{
                alert("Ha ocurrido un error eliminando el enfrentamiento")
            }
        }catch (error) {
            alert("Ha ocurrido un error eliminando el enfrentamiento")
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        getColoresEnfrentamientos();
    }, [])
        
  return (
    <>
    
    <div className='ColoresEnfrentamientos_main_container'>
                    <Modal
                        open={modalIsOpen}
                        onClose={closeModal}
                        center
                    >
                    <h2>Enfrentamiento eliminado exitosamente</h2>
                    <div className="modal_container">
                        <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                        <button onClick={closeModal}>Aceptar</button>
                    </div>

                </Modal>
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
                                    <button className='delete_colores_match' onClick={(ev)=>DeleteColoresEnfrentamiento(ev, e.id_partido, e.id_cancha, e.id_horario, e.fecha)}>Eliminar</button>
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
