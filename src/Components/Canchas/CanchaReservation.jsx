import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './CanchaReservation.css'
/* import { RotatingLines } from  'react-loader-spinner'
import {Link} from 'react-router-dom' */

export default function CanchaReservation() {

  const params = useParams();

  const [Horarios, setHorarios] = useState([])
  const [Reservaciones, setReservaciones] = useState([])

  const GetHorarios = async () => {
    try {
        const result = await axios.get('http://localhost:4000/api/getAllHorarios');
        setHorarios(result.data);
        //console.log("result.data: " + JSON.stringify(result.data));
    } catch (error) {
        alert(error.message)
    }
}
  const GetCanchaReservaciones = async () => {
    try {
        const result = await axios.get(`http://localhost:4000/api/GetCanchaReservaciones/${params.idCancha}`);
        setReservaciones(result.data);
        //console.log("result.data: " + JSON.stringify(result.data));
    } catch (error) {
        alert(error.message)
    }
}

useEffect(() => {
  GetHorarios();
  GetCanchaReservaciones();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
    <div className="cancha_reservation_main_container">
      <div>
        <div className="reservation_table_container">

          <table>
            <tbody>

                {
                  Horarios.map((h, index)=>(
                  <tr key={index}>
                  <td key={index}>{h.inicio}</td>
                
                  {
                    Reservaciones.map((r, index)=>(
                        parseInt(r.id_horario) === parseInt(h.id_horario) &&
                        <td key={index}>{r.id_socio}</td>
                      
                    ))
                  }
                
              
            </tr>
            ))}
            </tbody>
            </table>
          
        </div>
      </div>
    </div>
  )
}
