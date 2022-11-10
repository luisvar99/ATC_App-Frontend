import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './CanchaReservation.css'
import Reservation from './Reservation'
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
    <>
    {/* <div className="cancha_reservation_main_container">
      <div className="">
        <select id=""></select>
        <div className="reservation_table_container">
          <table>
            <thead>
                <tr>
                  <td>Socio</td>
                  <td>Hora Inicio</td>
                  <td>Hora Fin</td>
                </tr>
            </thead>
            <tbody>
                  {
                    Reservaciones.map((r, index)=>(
                      <tr>
                        <td >{}</td>
                        <td key={index}>{r.username}</td>
                        <td>{r.inicio}</td>
                        <td>{r.fin}</td>
                      </tr>
                      ))
                    } 
                
            </tbody>
          </table>
          
        </div>
      </div>
    </div> */}

    <div className="cancha_reservation_main_container">
      <div className="">
        <div className="reservation_table_container">
          <table>
            <tbody>
                {
                  Horarios.map((h, index)=>(
                  <tr key={index}>
                  <td>{h.inicio}</td>
                  {
                    Reservaciones.find(r => r.id_horario === h.id_horario) ?
                    <td style={{backgroundColor:"red"}} key={index}><Reservation idHorario={h.id_horario}/></td>
                    :
                    <td style={{backgroundColor:"#0b7037"}} key={index}>Libre</td>
                  }
                  {/* {
                    Reservaciones.map((r, index)=>(
                        parseInt(r.id_horario) === parseInt(h.id_horario) &&
                        <td key={index}>{r.username}</td>
                        
                    ))
                  }  */}
            </tr>
                ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
    </>
  )
}
