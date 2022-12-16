import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import GetColoresPlayersByTeam from './GetColoresPlayersByTeam'


export default function GetColoresTeamsByGroup({id_bombo}) {

    const [TeamsByBomboId, setTeamsByBomboId] = useState([])

    const getTeamsByBombo = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/GetColoresTeamsByGroup/${id_bombo}`);
        setTeamsByBomboId(result.data);
        console.log("getTeamsByBombo: " + JSON.stringify(result.data));
    }catch (error) {
      alert(error.message)

    }
    }

    useEffect(() => {
      console.log("id_bombo: " + id_bombo);
      getTeamsByBombo();
    },[])


  return (
    TeamsByBomboId.map((t, index) =>(
      <>
    
    <table>
      <thead>
            <tr key={index}>
              <td style={{backgroundColor:`${t.color}`}}>{t.nombre_equipo}</td>
            </tr>

      </thead>
      <tbody>
            <GetColoresPlayersByTeam id_equipo={t.id_equipo}/>
      </tbody>
    </table>
  </>
  ))
  )
}
