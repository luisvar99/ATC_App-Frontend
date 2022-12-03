import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'


export default function GetGroupsMembers({idGrupo, modalidad, idSubtorneo, NotAdmin}) {

    const [GroupsMembers, setGroupsMembers] = useState([])


    const [IsLoadingMembers, setIsLoadingMembers] = useState(false)

    const GetGruposMembers = async () =>{
        console.log("NotAdmin: " + NotAdmin);
        try {
            setIsLoadingMembers(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/GetGruposById/${idGrupo}`)
            setGroupsMembers(result.data);
            //console.log("GroupsMembers: " + JSON.stringify(result.data));
            setIsLoadingMembers(false)
        } catch (error) {
            
        }
      }

      const DeleteSubTorneoGroupParticipant = async (e, id_grupo, userId) =>{
        e.preventDefault();
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/deleteSubTorneoParticipant/idsubtorneo=${params.idSubtorneo}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteSubTorneoGroupParticipant/idGrupo=${id_grupo}/idUser=${userId}`,
            {
                idSubTorneo: idSubtorneo,
            })
            console.log(result.data);
            window.location.reload();
        } catch (error) {
            
        }
      }

      useEffect(() => {
        GetGruposMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

      return (
        <div>
          { IsLoadingMembers ? 
                <>
                    <p>Cargando...</p>
                    <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="35"
                    visible={true}
                    />
                </>
                
                  :
                  
                  <table className="subtorneo_details_table">
                <thead>
                    <tr className="table_headers">
                        <th>Usuario</th>
                        <th>Grupo</th>
                        {modalidad==="Dobles" &&<th>Id de Pareja</th>}
                        {!NotAdmin &&<th></th>}
                    </tr>
                </thead>
                <tbody>
                {GroupsMembers.map((gm,index)=>(
                
                    <tr key={index}>
                        <td>{gm.accion} - {gm.nombres} {gm.apellidos}</td>
                        <td>Grupo {gm.numero_grupo}</td>
                        { modalidad==="Dobles" && <td>{gm.id_pareja} {NotAdmin}</td>}
                        {!NotAdmin && <td><button onClick={(e)=> DeleteSubTorneoGroupParticipant(e, gm.id_grupo, gm.id)} className="editTorneoDeleteParticipant">Eliminar</button></td>}
                    </tr>
                ))}
                </tbody>
            </table>
        }
        </div>
    ) 
}
