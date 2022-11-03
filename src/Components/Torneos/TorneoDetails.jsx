import React, { useState, useEffect } from 'react'
import './TorneoDetails.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'

export default function TorneoDetails() {

  const params = useParams();

  const [Subtorneos, setSubtorneos] = useState([])
  const [Modalidad, setModalidad] = useState("")
  const [IsLoading, setIsLoading] = useState(false)


  const GetSubtorneos = async () => {
    try {
      setIsLoading(true)
      const result = await axios.get(`https://atcbackend.herokuapp.com/api/getSubTorneoByTorneoId/${params.idTorneo}`)
      setSubtorneos(result.data);
      setIsLoading(false)
    } catch (error) {
      
    }
  }

  const GetTorneoinfo = async () => {
    try {
      //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
      const result = await axios.get(`http://localhost:4000/api/getSingleTorneo/${params.idTorneo}`)
      //console.log("GetSubtorneoinfo " + JSON.stringify(result));
      setModalidad(result.data[0].modalidad)
    } catch (error) {
      
    }
  }


  useEffect(() => {
    //console.log(params.idTorneo);
    GetSubtorneos();
    GetTorneoinfo();
  },[])

  return (
    <div className="torneo_details_main_container">
      <div className="torneo_details_second_container">
        {
          IsLoading || Modalidad==="" ? 
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="35"
            visible={true}/> 
            : 
        <div className="subtorneos_container">
              <h3>Categorias para participar</h3>
          
          <div className="subtorneos">
              {
                Subtorneos.map((subtorneo, index)=> (
                  <Link key={index} className="link_to_torneo" to={`subtorneos/${subtorneo.nombre}/id=${subtorneo.id_subtorneo}/modalidad=${Modalidad}`}>
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
      }
      </div>
    </div>
  )
}
