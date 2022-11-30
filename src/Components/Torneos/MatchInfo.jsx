import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'

export default function MatchInfo({idPartido}) {

    const [MatchInfo, setMatchInfo] = useState([])
    const [IsLoadingMatches, setIsLoadingMatches] = useState(false)

    const GetSubtorneoMatches = async () =>{
        try {
            console.log("idPartido " + idPartido);
            setIsLoadingMatches(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatchesById/${idPartido}`)
            setMatchInfo(result.data);
            console.log("GetSubtorneoMatchesById: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        GetSubtorneoMatches()
    }, [])
    

  return (
    <table>
        <thead>
            <tr>
                <td>Codigo Partido</td>
                <td>Jugadores</td>
            </tr>
                </thead>
        <tbody>
            {
                MatchInfo.map((match,index) =>(
                <tr key={index}>
                    <td>{match.id_partido}</td>
                    <td>{match.nombres} {match.apellidos}</td>
                </tr>
                ))
            }
        </tbody>

    </table>
  )
}
