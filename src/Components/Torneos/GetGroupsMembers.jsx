import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'

import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function GetGroupsMembers({idGrupo, modalidad, idSubtorneo, NotAdmin}) {

    const [GroupsMembers, setGroupsMembers] = useState([])
    const [GroupNumber, setGroupNumber] = useState(0)

    const [DeleteGroupParticipantModal, setDeleteGroupParticipantModal] = useState(false)


    const [IsLoadingMembers, setIsLoadingMembers] = useState(false)

    const GetGruposMembers = async () =>{
        //console.log("idGrupo: " + idGrupo);
        try {
            setIsLoadingMembers(true)
            const result = await axios.get(`http://localhost:4000/api/GetGruposById/${idGrupo}/${idSubtorneo}`)
            //const result = await axios.get(`http://localhost:4000/api/GetGruposById/${idGrupo}/${idSubtorneo}`)
            //console.log("result.data: " + /* JSON.stringify */(result.data[0]));
            setGroupsMembers(result.data);
            setGroupNumber(result.data[0] === undefined ? "" : result.data[0].numero_grupo)
            setIsLoadingMembers(false)
        } catch (error) {
            alert("ERROR GetGruposMembers " + error.message)
            setIsLoadingMembers(false)
        }
      }

      const DeleteSubTorneoGroupParticipant = async (e, id_grupo, userId) =>{
        e.preventDefault();
        try {
            const result = await axios.delete(`http://localhost:4000/api/deleteSubTorneoGroupParticipant/idGrupo=${id_grupo}/idUser=${userId}`,
            {
                idSubTorneo: idSubtorneo,
            })
            /* const result = await axios.delete(`http://localhost:4000/api/deleteSubTorneoGroupParticipant/idGrupo=${id_grupo}/idUser=${userId}`,
            {
                idSubTorneo: idSubtorneo,
            }) */
            if(result.data.success===true){
                setDeleteGroupParticipantModal(true)
            }else{
                alert("Ha ocurrido un error")
            }
        } catch (error) {
            alert("Ha ocurrido un error")
        }
      }

      function closeDeleteGroupParticipantModal() {
        setDeleteGroupParticipantModal(false);
        window.location.reload()
    }

      useEffect(() => {
        GetGruposMembers();
        console.log("idSubtorneo GetGruposMembers: " + idSubtorneo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

      return (
        <>
          { IsLoadingMembers ? 
                <>
                    <p>Cargando..</p>
                    <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="35"
                    visible={true}
                    />
                </>
                
                  :
                  <>
                  <h4 style={{textAlign:"center"}}>Grupo No.{GroupNumber}</h4>
                  <Modal
                    open={DeleteGroupParticipantModal}
                    onClose={closeDeleteGroupParticipantModal}
                    center
                >
                        <h2>Participante eliminado exitosamente</h2>
                        <div className="modal_container">
                            <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                            <button onClick={closeDeleteGroupParticipantModal}>Aceptar</button>
                        </div>
                    </Modal>
                  <table className="subtorneo_details_table">
                <thead>
                    <tr className="table_headers">
                        <th>Usuario</th>
                        {/* <th>Grupo</th> */}
                        {modalidad==="Dobles" &&<th>Id de Pareja</th>}
                        {!NotAdmin &&<th></th>}
                    </tr>
                </thead>
                <tbody>
                {
                        GroupsMembers.map((gm,index)=>(
                    
                        <tr key={index}>
                            <td>{gm.accion} - {gm.nombres} {gm.apellidos}</td>
                            {/* <td>Grupo {gm.numero_grupo}</td> */}
                            { modalidad==="Dobles" && <td>{gm.id_pareja}</td>}
                            {!NotAdmin && <td><button onClick={(e)=> DeleteSubTorneoGroupParticipant(e, gm.id_grupo, gm.id)} className="editTorneoDeleteParticipant">Eliminar</button></td>}
                        </tr>
                    ))
                }
                </tbody>
            </table>
            </>
        }
        </>
    ) 
}
