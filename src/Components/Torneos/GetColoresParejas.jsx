import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import GetColoresParejasMembers from './GetColoresParejasMembers'


export default function GetColoresParejas({id_pareja}) {

    
    const [ColoresParejas, setColoresParejas] = useState([])

    const params = useParams();

    const getColoresParejas = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresParejas/${params.id}`);
            setColoresParejas(result.data);
            //console.log("result.data TorneoColores: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }


    useEffect(() => {
        console.log("id_pareja" + id_pareja);
        getColoresParejas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
            
            <div className="coloresParticipantsContainer">
            {
                ColoresParejas.map((p, index)=>(
                    <GetColoresParejasMembers id_pareja={p.id_pareja} key={index}/>
                ))
            }
            </div>
  )
}
