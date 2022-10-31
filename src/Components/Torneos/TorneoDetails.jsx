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
      const result = await axios.get(`http://localhost:4000/api/getSubTorneoByTorneoId/${params.idTorneo}`)
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
        <div className="torneo_details_info">
            <h4>{params.nombreTorneo}</h4>
        </div>
        <div className="subtorneos_container">
              <h4>Categorias para participar</h4>
          <div className="subtorneos">
              {
                Subtorneos.map((subtorneo)=> (
                  <Link className="link_to_torneo" to={`/subtorneos/${subtorneo.nombre}/id=${subtorneo.id_subtorneo}`}>
                          <div className="torneo_card">
                          <div className="torneo_card_header">
                              <p>{subtorneo.nombre}</p>
                          </div>
                              <div className="torneo_card_info">
                                  <p>{subtorneo.nombre}</p>
                                  <p>Participantes: {subtorneo.cantidad_personas}</p>
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
