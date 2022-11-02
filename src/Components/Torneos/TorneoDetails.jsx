import React, { useState, useEffect } from 'react'
import './TorneoDetails.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function TorneoDetails() {

  const params = useParams();

  const [Subtorneos, setSubtorneos] = useState([])

  const GetSubtorneos = async () => {
    try {
      const result = await axios.get(`https://atcbackend.herokuapp.com/api/getSubTorneoByTorneoId/${params.idTorneo}`)
      setSubtorneos(result.data);
    } catch (error) {
      
    }
  }


  useEffect(() => {
    //console.log(params.idTorneo);
    GetSubtorneos();
  },[])

  return (
    <div className="torneo_details_main_container">
      <div className="torneo_details_second_container">
        {/* <div className="torneo_details_info">
            <h4>{params.nombreTorneo}</h4>
        </div> */}
        <div className="subtorneos_container">
              <h3>Categorias para participar</h3>
          <div className="subtorneos">
              {
                Subtorneos.map((subtorneo, index)=> (
                  <Link key={index} className="link_to_torneo" to={`/subtorneos/${subtorneo.nombre}/id=${subtorneo.id_subtorneo}`}>
                          <div className="torneo_card">
                          <div className="torneo_card_header">
                              <p>{subtorneo.nombre}</p>
                          </div>
                              <div className="torneo_card_info">
                                  <p>Participantes permitidos: {subtorneo.cantidad_personas}</p>
                              </div>
                      </div>
                  </Link>
                ))
              }
          </div>
      </div>
      </div>
    </div>
  )
}
