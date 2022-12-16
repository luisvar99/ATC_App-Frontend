import React, { useState, useEffect }from 'react'
import axios from 'axios'

export default function GetColoresParejasMembers({id_pareja, id_torneo}) {
    
    const [Pareja, setPareja] = useState([])
    const [ColoresEquipos, setColoresEquipos] = useState([])


    const GetParejasPlayersById = async () => {
        
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresParejasById/${id_pareja}`);
            setPareja(result.data);
            //console.log("Pareja " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }



useEffect(() => {
    GetParejasPlayersById();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  return (
    <table>
        <thead>
            <tr>
                <td>Jugadores</td>
            </tr>
        </thead>
        <tbody>
           {Pareja.map((p,index)=>(
            <tr key={index}>
                <td>{p.nombres} {p.apellidos}</td>
            </tr>
           ))
            }
        </tbody>
    </table>
  )
}
