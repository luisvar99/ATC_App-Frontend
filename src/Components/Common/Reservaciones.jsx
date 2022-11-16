import React, { useState, useEffect } from 'react'
import './Reservaciones.css'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default function Reservaciones() {

    const [Canchas, setCanchas] = useState([])

    useEffect(() => {
        GetAllCanchas();
        console.log("Canchas UseEffect: " + Canchas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] )
    
    const GetAllCanchas = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getAllCanchas');
            setCanchas(result.data);
            console.log("result.data: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }

  return (
    <div className="reservaciones_main_container">
        <div className="reservaciones_tennis_container">
            <h3>Tennis</h3>
            <div className="canchas_container">
                {
                    Canchas.map((cancha, index)=>(
                        <Link key={index} className="cancha_item" to={`tennis/idCancha=${cancha.id_cancha}/${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}>
                            <div className="img_cancha_container">
                                <img src="https://img.freepik.com/vector-premium/cancha-tenis-vista-superior_97886-10983.jpg" alt="" />
                                <h4>{cancha.nombre_cancha}</h4>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
        <div className="reservaciones_padel_container">
            <h3>Padel</h3>
        </div>
    </div>
  )
}
