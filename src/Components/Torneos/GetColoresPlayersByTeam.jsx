import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'


export default function GetColoresPlayersByTeam({id_equipo}) {

  const [PlayersByTeam, setPlayersByTeam] = useState([])

  const getPlayersByTeam = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/api/getPlayersByTeam/${id_equipo}`);
      //const result = await axios.get(`http://localhost:4000/api/getPlayersByTeam/${id_equipo}`);
      setPlayersByTeam(result.data);
      console.log("getPlayersByTeam: " + JSON.stringify(result.data));
  }catch (error) {
    alert(error.message)

  }
}

  useEffect(() => {
    getPlayersByTeam();
    //console.log("id_equipo: " + id_equipo);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      { PlayersByTeam.map((ply, index)=>(
        <tr key={index}>
          <td style={{padding: '5px 0px'}}>{ply.accion}  - {ply.nombres} {ply.apellidos}</td>
        </tr>
      ))
      }
    </>
  )
}
