import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Reservation({idHorario}) {

    const [Username, setUsername] = useState("")

    const GetReservacionDetails = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetReservaDetails/${idHorario}`);
            setUsername(result.data[0].username);
            console.log("result.data: " + JSON.stringify(result.data[0]));
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        GetReservacionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <p>Reservado por: {Username}</p>
  )
}
