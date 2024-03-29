import React, { useState, useEffect } from 'react'
import './Reservaciones.css'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default function Reservaciones() {

    const [CanchasTennis, setCanchasTennis] = useState([])
    const [CanchasPadel, setCanchasPadel] = useState([])
    const [StatusCancha, setStatusCancha] = useState(0)
    const [Fecha, setFecha] = useState(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate())

    useEffect(() => {
        GetAllTennisCanchas();
        GetAllPadelCanchas();
        //console.log("Fecha: " + Fecha);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] )
    
    const GetAllTennisCanchas = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getAllTennisCanchas');
            //const result = await axios.get('http://localhost:4000/api/getAllTennisCanchas');
            setCanchasTennis(result.data);
            //console.log("result.data.tennis: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }

    const GetAllPadelCanchas = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getAllPadelCanchas');
            //const result = await axios.get('http://localhost:4000/api/getAllPadelCanchas');
            setCanchasPadel(result.data);
            console.log("result.data.padel: " + JSON.stringify(result.data));
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
                    CanchasTennis.map((cancha, index)=>(
                    <>  
                            <Link key={index} className="cancha_item" to={`tennis/idCancha=${cancha.id_cancha}/${Fecha}/categoriaCancha=${cancha.id_categoriacancha}`} style={{pointerEvents: parseInt(cancha.estatus_cancha)===0 ? "none" : "auto"}}>
                            <div className="img_cancha_container">
                                <img src="https://img.freepik.com/vector-premium/cancha-tenis-vista-superior_97886-10983.jpg" alt="" />
                                <h4>{cancha.nombre_cancha}</h4>
                            </div>
                        </Link>
                    </>
                    ))
                }
            </div>
        </div>
        <div className="reservaciones_padel_container">
                <h3 style={{color:"black"}}>Padel</h3>
                <div className="Padelcanchas_container">
                    {
                        CanchasPadel.map((cancha, index)=>(
                                <Link key={index} className="canchaPadel_item" to={`tennis/idCancha=${cancha.id_cancha}/${Fecha}/categoriaCancha=${cancha.id_categoriacancha}`} style={{pointerEvents: parseInt(cancha.estatus_cancha)===0 ? "none" : "auto"}}>
                                        <div className="img_canchaPadel_container">
                                            <div className="rectangle">
                                                <div className='cancha_lines'>
                                                    <div className='cancha_lines_two'>
                                                        <div className='cancha_lines_three'></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className='nombrecanchapadel'>{cancha.nombre_cancha} {parseInt(cancha.estatus_cancha) ===0 && "(en mantenimiento)"}</h4>
                                        </div>
                                </Link>
                        ))
                    }
                </div>
            </div>
    </div>
  )
}
