import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'

export default function Reservation({idHorario}) {

    const [Username, setUsername] = useState("")
    const [LoadingReserva, setLoadingReserva] = useState(false)

    const GetReservacionDetails = async () => {
        try {
            setLoadingReserva(true)
            const result = await axios.get(`http://localhost:4000/api/GetReservaDetails/${idHorario}`);
            setUsername(result.data[0].username);
            console.log("result.data: " + JSON.stringify(result.data[0]));
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
          <p style={{padding: "0", margin: "0"}}>Reservado por: {Username}</p> 
        }
    </>
  )
}
