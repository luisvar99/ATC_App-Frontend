import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ManageCanchas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function ManageCanchas() {

    const [Canchas, setCanchas] = useState([])

    useEffect(() => {
        GetAllCanchas();
        console.log("Canchas UseEffect: " + Canchas);
    },[] )
    
    const GetAllCanchas = async () => {
        try {
            //const result = await axios.get('http://localhost:4000/api/getAllCanchas');
            const result = await axios.get('https://atcapp-backend-production.up.railway.app/api/getAllCanchas');
            setCanchas(result.data);
            console.log("result.data: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }

    const DeleteCancha = async (id) => {
        try {
            //await axios.delete(`http://localhost:4000/api/deleteCancha/${id}`);
            await axios.delete(`https://atcapp-backend-production.up.railway.app/api/deleteCancha/${id}`);
            const filter = Canchas.filter(e => e.id_cancha !== id)
            setCanchas(filter);
        } catch (error) {
            alert(error.message)
        }
    }
    

  return (
    <>
    <div className="mge_canchas_container">
        <div className="second_container">
            <div style={{ marginBottom:"1.5rem"}}>  
                <h3>Listado de Canchas</h3>
                <Link to='addCancha' className="linkAddCancha">Agregar nueva cancha</Link>
            </div>
            <table className="chanchasAdmin_table">
                <thead>
                    <tr className="table_headers">
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Estatus</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            Canchas.map((cancha)=>(
                            <tr key={cancha.id_cancha}>
                                <td>{cancha.nombre_cancha}</td>
                                <td>{cancha.id_categoriacancha ==="0" ? 'Tennis' : 'Padel'}</td>
                                <td>{cancha.estatus_cancha ==="0" ? 'Cerrada' : 'Abierta'}</td>
                                {/* <td><button className="editCanchaBtn"><Link to={`editCancha/id=${cancha.id_cancha}`}>Editar</Link></button></td>
                                <td><button className="deleteCanchaBtn" onClick={(e) => DeleteCancha(cancha.id_cancha)}>Eliminar</button></td> */}
                                <td><Link to={`editCancha/id=${cancha.id_cancha}`}> <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "black"}}/> </Link></td>
                                <td><FontAwesomeIcon icon={faTrash} size="2x" className="deleteIcon" onClick={(e) => DeleteCancha(cancha.id_cancha)} style={{cursor: "pointer"}}/></td>                            
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
