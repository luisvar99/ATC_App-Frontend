import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GetColoresTeamsByGroup from './GetColoresTeamsByGroup'
import { useParams } from 'react-router-dom'
import './ColoresEquiposAndGruposUsers.css'

export default function ColoresEquiposAndGruposUsers() {

    const [ColoresGrupos, setColoresGrupos] = useState([])

    const params = useParams();

    const getColoresGrupos = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetColoresGrupoForUsers/${params.id_torneo}`);
            //const result = await axios.get(`http://localhost:4000/api/GetColoresGrupoForUsers/${params.id_torneo}`);
            setColoresGrupos(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }
    
    useEffect(() => {
        getColoresGrupos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className='Grupos_equipos_players_container_users'>
            {
                ColoresGrupos.length===0 ?
                <p>Los Grupos y equipos aun no han sido publicados</p>
                :
                ColoresGrupos.map((grupo, index)=> (
                    <div key={index}>
                        <p style={{backgroundColor:"grey", padding:"0.4rem", textAlign:"center", color:"white"}}>{grupo.nombre_bombo}</p>
                        <div className='Grupos_equipos_players'>
                            <GetColoresTeamsByGroup id_bombo={grupo.id_bombo}/>
                        </div>
                    </div>
                    
                ))
            }
    </div>
  )
}
