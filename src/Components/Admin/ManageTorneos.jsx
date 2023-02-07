import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ManageCanchas.css'
import './ManageTorneos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { RotatingLines } from  'react-loader-spinner'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


export default function ManageTorneos() {

    const [Torneos, setTorneos] = useState([])
    const [LoadingTorneos, setLoadingTorneos] = useState(false)
    const [DeleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const GetAllTorneos = async () => {
        setLoadingTorneos(true)
        try {
            const result = await axios.get('http://localhost:4000/api/getAllTorneos');
            //const result = await axios.get('http://localhost:4000/api/getAllTorneos');
            setTorneos(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
            setLoadingTorneos(false)
        } catch (error) {
            alert(error.message)
        }
    }

    const DeleteTorneo = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:4000/api/deleteTorneo/${id}`);
            //const result = await axios.delete(`http://localhost:4000/api/deleteTorneo/${id}`);
            if(result.data.success === true){
                const filter = Torneos.filter(e => e.id_torneo !== id)
                setTorneos(filter);
                setDeleteModalIsOpen(true)
            }else{
                alert("Ha ocurrido un error al eliminar al horario")
            }
        } catch (error) {
            alert(error.message)
        }
    }

    function closeDeleteModal() {
        setDeleteModalIsOpen(false);
        window.location.reload()
    }

    useEffect(() => {
        GetAllTorneos();
        console.log("Torneos UseEffect: " + Torneos);
    },[] )

  return (
    <>
    <div className="mge_canchas_container">
        <div className="mge_torneos_second_container">
            <div style={{ marginBottom:"1.5rem"}}>  
                <h3>Listado de Torneos</h3>
                <Link to='addTorneo' className="linkAddCancha">Agregar nuevo torneo</Link>
            </div>
            <Modal
                open={DeleteModalIsOpen}
                onClose={closeDeleteModal}
                center
                >
                <h2>El torneo ha sido eliminado exitosamente</h2>
                <div className="modal_container">
                <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                <button onClick={closeDeleteModal}>Aceptar</button>
                </div>
            </Modal>
            {
            LoadingTorneos ?
            <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
                />
                :
            <table className="chanchasAdmin_table">
                <thead>
                    <tr className="table_headers">
                        <th style={{width:"200px"}}>Nombre</th>
                        <th>Categoria</th>
                        <th>Inicio Inscripcion</th>
                        <th>Fin Inscripcion</th>
                        <th>Inicio Torneo</th>
                        <th>Fin Torneo</th>
                        <th>Modalidad</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            Torneos.map((torneo, index)=>(
                            <tr key={index}>
                                <td>{torneo.nombre_torneo}</td>
                                <td>{torneo.id_categoria ==='0' ? 'Tennis' : 'Padel'}</td>
                                <td>{new Date(torneo.fecha_inicio_inscripcion).toLocaleDateString('es-MX')}</td>
                                <td>{new Date(torneo.fecha_fin_inscripcion).toLocaleDateString('es-MX')}</td>
                                <td>{new Date(torneo.fecha_inicio).toLocaleDateString('es-MX')}</td>
                                <td>{new Date(torneo.fecha_fin).toLocaleDateString('es-MX')}</td>
                                <td>{torneo.modalidad}</td>
                                {/* <td><button className="editCanchaBtn"><Link to={`editTorneo/id=${torneo.id_torneo}`}>Detalles</Link></button></td> */}
                                {/* <td><button className="deleteCanchaBtn" onClick={(e) => DeleteTorneo(torneo.id_torneo)}>Eliminar</button></td> */}
                                <td><Link to={`editTorneo/id=${torneo.id_torneo}`}> <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "#545353"}}/> </Link></td>
                                <td><FontAwesomeIcon icon={faTrash} size="2x" onClick={(e) => DeleteTorneo(torneo.id_torneo)} style={{cursor: "pointer", color: "#545353"}}/></td>
                            </tr>
                            )) 
                        }
                    </tbody>
            </table>
            }
        </div>
    </div>
    </>

  )
}
