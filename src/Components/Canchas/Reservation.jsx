import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'
import {Link} from 'react-router-dom'


export default function Reservation({idHorario}) {

    const [OwnerName, setOwnerName] = useState("")
    const [OwnerLastName, setOwnerLastName] = useState("")
    const [OwnerAccion, setOwnerAccion] = useState(0)
    const [IdReserva, setIdReserva] = useState(0)
    const [IdCancha, setIdCancha] = useState(0)
    const [Fecha, setFecha] = useState(new Date().toLocaleDateString('en-US'))
    const [LoadingReserva, setLoadingReserva] = useState(false)

    const GetReservacionDetails = async () => {
        try {
            setLoadingReserva(true)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetReservaOwner/${idHorario}`);
            //const result = await axios.get(`http://localhost:4000/api/GetReservaOwner/${idHorario}`);
            setOwnerName(result.data[0].nombres);
            setOwnerLastName(result.data[0].apellidos);
            setIdReserva(result.data[0].id_reserva);
            setOwnerAccion(result.data[0].accion);
            setIdCancha(result.data[0].id_cancha);
            setFecha(result.data[0].fecha);
            console.log("Reserva Owner: " + JSON.stringify(result.data[0]));
            setLoadingReserva(false)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        GetReservacionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


  return (
    <>

      {   LoadingReserva ?
          <RotatingLines
          strokeColor="green"
          strokeWidth="5"
          animationDuration="0.75"
          width="35"
          visible={true}/>
          :
          <Link style={{padding: "0", margin: "0", textDecoration:"none"}} to={`/ReservationDetails/idReserva=${IdReserva}/cancha=${IdCancha}`}><p style={{padding: "0", margin: "0", color: "black"}}>{OwnerAccion} - {OwnerName} {OwnerLastName}</p></Link>
        }
    </>
  )
}
