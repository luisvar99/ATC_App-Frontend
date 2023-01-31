import React, { useState, useEffect } from 'react'
import axios from 'axios'
/* import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom' */
import { RotatingLines } from  'react-loader-spinner'
import './MatchInfo.css'

export default function MatchInfo({idPartido, IsAdmin}) {

    const [MatchInfo, setMatchInfo] = useState([])
    const [MatchModalidad, setMatchModalidad] = useState("")
    const [MatchDate, setMatchDate] = useState("")
    const [MatchRonda, setMatchRonda] = useState("")
    const [MatchCancha, setMatchCancha] = useState("")
    const [IsLoadingMatches, setIsLoadingMatches] = useState(false)

    const GetSubtorneoMatches = async () =>{
        try {
            //console.log("idPartido " + idPartido);
            setIsLoadingMatches(true)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetSubtorneoMatchesById/${idPartido}`)
            //const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatchesById/${idPartido}`)
            setMatchInfo(result.data);
            setMatchModalidad(result.data[0].modalidad);
            setMatchDate(result.data[0].fecha);
            setMatchRonda(result.data[0].nombre);
            setMatchCancha(result.data[0].nombre_cancha);
            //console.log("GetSubtorneoMatchesById: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            
        }
    }



    useEffect(() => {
        GetSubtorneoMatches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className="matchTableContainer">
        <>
        {
            IsLoadingMatches ?
            <>
            <p>CARGANDO ENFRENTAMIENTO...</p>
                <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="35"
                visible={true}/>
            </>
                :
        <>
        <div className="matchDateID_container">
            <p className="matchID">{MatchRonda}</p>
            <p className="matchDate">Fecha: {new Date(MatchDate).toLocaleDateString('es-MX')}</p>
            <p className="matchDate">Cancha: {MatchCancha}</p>
        </div>
        <table>
            <thead>
                <tr>
                    <td>Accion - Jugador</td>
                </tr>
                    </thead>
            <tbody>

                {
                    MatchInfo.map((match,index) =>(
                    <tr key={index}>
                        <td>{match.accion} - {match.nombres} {match.apellidos}</td>
                    </tr>
                    ))
                }
                
            </tbody>

        </table>
        </>
    }
    </>
    </div>
  )
}
