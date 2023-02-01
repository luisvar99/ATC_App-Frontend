import React, { useState, useEffect } from 'react'
import './SubtorneoEnfrentamientos.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import MatchInfo from '../Torneos/MatchInfo'

export default function SubtorneoEnfrentamientos() {

    const [GroupsMembers, setGroupsMembers] = useState([])
    const [Matches, setMatches] = useState([])

    const [IsLoadingMatches, setIsLoadingMatches] = useState(false)
    
    const params = useParams();

    const GetSubtorneoMatches = async () =>{
        try {
            setIsLoadingMatches(true)
            const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatches/${params.idSubtorneo}`)
            //const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatches/${params.idSubtorneo}`)
            setMatches(result.data);
            console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            console.log(error.message);
        }
      }

      useEffect(() => {
        GetSubtorneoMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <>
    <div className="sutorneoMatches_main_container">
        <div className="sutorneoMatches_container">
            {
                IsLoadingMatches ?
                <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="35"
                visible={true}/>
                :
                Matches.length===0 ?
                <h4>No hay enfrentamientos disponibles</h4>
                :
                Matches.map((match,index)=>(
                    <MatchInfo idPartido={match.id_partido} key={index}/>
                    ))
            }
        </div>
    </div>
    </>
    )
}
