import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import GetColoresParejasMembers from './GetColoresParejasMembers'
import './GetColoresParejas.css'


export default function GetColoresParejas(/* {id_pareja} */) {

    
    const [ColoresParejas, setColoresParejas] = useState([])
    const [ColoresEquipos, setColoresEquipos] = useState([])
    const [IdEquipo, setIdEquipo] = useState(0)


    const params = useParams();

    const getColoresParejas = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresParejas/${params.id}`);
            setColoresParejas(result.data);
            console.log("getColoresParejas: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }

    
    const GetEquiposColores = async () => {
        
        try {
            const result = await axios.get(`http://localhost:4000/api/GetEquiposColores/${params.id}`);
            setColoresEquipos(result.data);
            //console.log("Pareja " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }
    
    const setTeamToPareja = async (id_pareja) => {
        
        try {
            const result = await axios.put(`http://localhost:4000/api/setEquipoToPareja/${id_pareja}`,
            {
                id_equipo: IdEquipo
            });
            console.log("Pareja " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getColoresParejas();
        GetEquiposColores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
            
        <>
        <div className="coloresParticipantsContainer">

            {
                ColoresParejas.map((p, index)=>(
                    <>
                    <div className="aux">

                    <GetColoresParejasMembers id_pareja={p.id_pareja} id_torneo={params.id} key={index}/>
                    <select onChange={(e) => setIdEquipo(e.target.value)}>
                        <option key={index} value="">--- Seleccione una opcion ---</option>
                        {ColoresEquipos.map((ce,index)=>(
                            <option key={index} value={ce.id_equipo}>{ce.nombre_equipo}</option>
                            ))
                        }
                    </select>
                    <button onClick={(e) => setTeamToPareja(p.id_pareja)}>Guardar Cambios</button>
                    </div>
                    </>
                    ))
            }
            </div>
        </>
  )
}
