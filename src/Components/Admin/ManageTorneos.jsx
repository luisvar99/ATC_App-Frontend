import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ManageCanchas.css'
import { RotatingLines } from  'react-loader-spinner'


export default function ManageTorneos() {

    const [Torneos, setTorneos] = useState([])

    useEffect(() => {
        GetAllTorneos();
        console.log("Torneos UseEffect: " + Torneos);
    },[] )
    
    const GetAllTorneos = async () => {
        try {
            const result = await axios.get('https://atcbackend.herokuapp.com/api/getAllTorneos');
            setTorneos(result.data);
            console.log("result.data: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }

    const DeleteTorneo = async (id) => {
        try {
            const result = await axios.delete(`https://atcbackend.herokuapp.com/api/deleteTorneo/${id}`);
            const filter = Torneos.filter(e => e.id_torneo !== id)
            console.log(result.data);
            setTorneos(filter);
        } catch (error) {
            alert(error.message)
        }
    }

  return (
    <>
    <div className="mge_canchas_container">
        <Link to='addTorneo' className="linkAddCancha">Agregar nuevo torneo</Link>
        <div className="second_container">
            <h3>Listado de Torneos</h3>
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
                                <td><button className="editCanchaBtn"><Link to={`editTorneo/id=${torneo.id_torneo}`}>Detalles</Link></button></td>
                                <td><button className="deleteCanchaBtn" onClick={(e) => DeleteTorneo(torneo.id_torneo)}>Eliminar</button></td>
                            </tr>
                            ))
                        }
                    </tbody>
            </table>
        </div>
    </div>
    </>

  )
}
