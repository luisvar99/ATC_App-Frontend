import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'
import {Link} from 'react-router-dom'


export default function ReservationDescription({idHorario}) {

    const [Description, setDescription] = useState("")
    const [LoadingReserva, setLoadingReserva] = useState(false)

    const GetReservacionDetails = async () => {
        try {
            setLoadingReserva(true)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetReservaOwner/${idHorario}`);
            //const result = await axios.get(`http://localhost:4000/api/GetReservaOwner/${idHorario}`);
            setDescription(result.data[0].descripcion);
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
          <p style={{padding: "0", margin: "0", color: "black"}}>{Description}</p>
        }
    </>
  )
}
