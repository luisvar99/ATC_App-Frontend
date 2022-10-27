import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ManageCanchas.css'

export default function ManageTorneos() {

    const [Torneos, setCanchas] = useState([])

    useEffect(() => {
        GetAllTorneos();
        console.log("Torneos UseEffect: " + Torneos);
    },[] )
    
    const GetAllTorneos = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getAllTorneos');
            setCanchas(result.data);
            console.log("result.data: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }

    const DeleteTorneo = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/deleteTorneo/${id}`);
            const filter = Torneos.filter(e => e.id_cancha !== id)
            setCanchas(filter);
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
                        <th>Descripcion</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            Torneos.map((torneo)=>(
                            <tr key={torneo.id_cancha}>
                                <td>{torneo.nombre_torneo}</td>
                                <td>{torneo.id_categoria ==='0' ? 'Tennis' : 'Padel'}</td>
                                <td>{new Date(torneo.fecha_inicio_inscripcion).toLocaleDateString('es-MX')}</td>
                                <td>{new Date(torneo.fecha_fin_inscripcion).toLocaleDateString('es-MX')}</td>
                                <td>{new Date(torneo.fecha_inicio).toLocaleDateString('es-MX')}</td>
                                <td>{new Date(torneo.fecha_fin).toLocaleDateString('es-MX')}</td>
                                <td>{torneo.descripcion}</td>
                                <td><button className="editCanchaBtn"><Link to={`editTorneo/id=${torneo.id_torneo}`}>Editar</Link></button></td>
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
