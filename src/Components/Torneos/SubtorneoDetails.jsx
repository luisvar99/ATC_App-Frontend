import React, { useState, useEffect } from 'react'
import './TorneoDetails.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './SubtorneoDetails.css'
import { RotatingLines } from  'react-loader-spinner'



export default function SubtorneoDetails() {
  const [Participants, setParticipants] = useState([])
  const [IsLoading, setIsLoading] = useState(false)
  const [NumberOfParticipants, setNumberOfParticipants] = useState(0)
  const [Cantidad_personas, setCantidad_personas] = useState(0)
  const params = useParams();

    const inscripcion = async () => {
      const duplicateInscription = Participants.find(e=>e.id === parseInt(sessionStorage.getItem('userId')));
      if(duplicateInscription!== undefined){
        alert("Usted ya se encuentra inscrito en este torneo")
      }else{
        setIsLoading(true)
        const result = await axios.post('http://localhost:4000/api/addParticipant',
        {
          id_subtorneo: params.idSubTorneo,
          user_id: sessionStorage.getItem('userId')
        })
        console.log(result.data); 
        window.location.reload();
      }
    }

    const getSubTournamentParticipants = async () => {

      const result = await axios.get(`http://localhost:4000/api/GetSubTorneosParticipants/${params.idSubTorneo}`)
      setParticipants(result.data);
      //console.log(result.data);
    }

    const GetNumberOfParticipants = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/GetNumberOfParticipants/${params.idSubTorneo}`)
        //console.log(result.data);
        setNumberOfParticipants(result.data[0].number_of_participants)
      } catch (error) {
        
      }
    }
    const GetSubtorneoinfo = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
        console.log("GetSubtorneoinfo " + JSON.stringify(result));
        setCantidad_personas(result.data[0].number_of_participants)
      } catch (error) {
        
      }
    }

    useEffect(() => {
      getSubTournamentParticipants();
      GetNumberOfParticipants();
      GetSubtorneoinfo();
    },[])

  return (
    <div className="subtorneoDetails_main_container">
      <div className="table_container">
        <div className="btn_spinner" style={{display: 'flex', alignItems:"flex-start"}}>
          <p>Cupos Disponibles: {Cantidad_personas-NumberOfParticipants}</p>
          <button onClick={inscripcion} className="btn_inscripcion">Inscribirme</button>
          {IsLoading && <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="35"
            visible={true}
          />}
        </div>
        <table className="chanchasAdmin_table">
                <thead>
                    <tr className="table_headers">
                        <th>Participantes</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            Participants.map((participant, index)=>(
                            <tr key={index}>
                                <td>{participant.username}</td>
                            </tr>
                            ))
                        }
                    </tbody>
            </table>
      </div>
    </div>
  )
}
