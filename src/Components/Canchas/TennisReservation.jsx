import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './TennisReservation.css'
import Reservation from './Reservation'
import { RotatingLines } from  'react-loader-spinner'

export default function CanchaReservation() {

  const params = useParams();
  const navigate = useNavigate();

  const [Horarios, setHorarios] = useState([])
  const [Reservaciones, setReservaciones] = useState([])
  const [Fecha, setFecha] = useState(params.mes+'/'+params.dia+'/'+params.ano)


  const [IdReserva, setIdReserva] = useState(0)

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
        const dia = params.dia;
        const mes = params.mes;
        const ano = params.ano;
        const fecha = ano+'-'+mes+'-'+dia;

        const result = await axios.get(`http://localhost:4000/api/GetCanchaReservaciones/${params.idCancha}/${fecha}`);
        setReservaciones(result.data);
        //console.log("result.data: " + JSON.stringify(result.data));
    } catch (error) {
        alert(error.message)
    }
}

  const HandleReservation = async (idHorario) => {
    const dia = params.dia;
    const mes = params.mes;
    const ano = params.ano;
    const fecha = ano+'-'+mes+'-'+dia;
  navigate(`/MakeReservation/idCancha=${params.idCancha}/idHorario=${idHorario}/${fecha}/categoriaCancha=${params.categoriaCancha}`)

}

const HandleCanlendarChange = async (e) => {
  navigate(`/Reservaciones/tennis/idCancha=${params.idCancha}/${e.target.value}`);
  window.location.reload();
}


useEffect(() => {
  GetHorarios();
  GetCanchaReservaciones();
  /* console.log("==========================================");  
  console.log(new Date().toLocaleString('en-US') + ' -- ' + new Date(Fecha + ', ' + new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()).toLocaleString('en-US'));
  console.log( (new Date() - new Date(Fecha+' , '+ new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds())) / (1000 * 60 * 60) );
   console.log(((new Date() - new Date(Fecha + ', 13:00:00')) / (1000 * 60 * 60)<= -24));

 console.log(new Date().toLocaleString('en-US') + ' -- ' + new Date(Fecha + ', 13:00 ').toLocaleString());
  console.log( (new Date() - new Date(Fecha+' ,  20:55') ) / (1000 * 60 * 60) ); */
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
    

    <div className="cancha_reservation_main_container">
      <div className="Calendar_table_container">
          <p>Fecha: {params.dia}-{params.mes}-{params.ano}</p>
        <div className="reservation_calendar">
            <label htmlFor="calendar">Cambiar fecha</label>
            <input type="date" id="calendar" onChange={(e)=>HandleCanlendarChange(e)}/>
        </div>
        <div className="reservation_table_container">
          <table className="reservation_table">
            <thead>
              <tr>
                <td>Hora</td>
                <td>Descripcion</td>
              </tr>
            </thead>
            <tbody>
                {
                  Horarios.map((h, index)=>(
                  <tr key={index}>
                  <td>{h.inicio}</td>
                  {
                    Reservaciones.find(r => r.id_horario === h.id_horario)!== undefined ?
                    <td style={{backgroundColor:"yellow"}} key={index}><Reservation idHorario={h.id_horario}/></td>
                    :
                      ((((new Date() - new Date(Fecha + ', ' + h.hora_inicio)) / (1000 * 60 * 60)>=0)) || (((new Date() - new Date(Fecha + ', ' + h.hora_inicio)) / (1000 * 60 * 60)<= -48)) ) ?
                      <td style={{backgroundColor:"#0b7037", cursor:"not-allowed"}} key={index}><strong>No Disponible</strong></td>
                    :
                      <td style={{backgroundColor:"#0b7037"}} key={index} onClick={()=>HandleReservation(h.id_horario)}><strong>Libre</strong></td>

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
