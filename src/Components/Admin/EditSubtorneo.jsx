import React, { useState, useEffect } from 'react'
import './AddCanchas.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'
import { RotatingLines } from  'react-loader-spinner'



export default function EditSubtorneo() {
    const [Name, setName] = useState("")
    const [Cantidad_personas, setCantidad_personas] = useState(0)
    const [Id_torneo, setId_torneo] = useState(0)
    const [Modalidad, setModalidad] = useState("")
    /* const [Parejas, setParejas] = useState([]) */
    const [IsLoadingParejas, setIsLoadingParejas] = useState(false)


    const [Participants, setParticipants] = useState([])
    const [Groups, setGroups] = useState([])
    const [GroupsMembers, setGroupsMembers] = useState([])

    const [IsLoadingForms, setIsLoadingForms] = useState(false)
    const [IsLoadingMembers, setIsLoadingMembers] = useState(false)
    const [IsLoadingAddingGroups, setIsLoadingAddingGroups] = useState(false)
    const [IsLoadingParticipants, setIsLoadingParticipants] = useState(false)
    const [IsDeletingGroup, setIsDeletingGroup] = useState(false)

    const [NumberOfGroups, setNumberOfGroups] = useState([])

    const [IdGroupMember, setIdGroupMember] = useState(0)


    const [Confirmation, setConfirmation] = useState("")


    const params = useParams();

    const GetSubtorneoById = async (e) =>{
        try {
            //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/GetSingleSubTorneoById/${params.idSubtorneo}`)
            setName(result.data[0].nombre)
            setCantidad_personas(result.data[0].cantidad_personas)
            setId_torneo(result.data[0].id_torneo)
            setModalidad(result.data[0].modalidad)
            //console.log("RESULT: " + JSON.stringify(result.data));
            
        } catch (error) {
            alert("ERROR: " + error.message);
        }
    }
    
    const UpdateCompetencia = async (e) =>{
        e.preventDefault();
        if(Name==="" || Cantidad_personas===""){
            alert("Por favor, complete todos los campos")
        }else{
            setConfirmation("Editando competencia")
            try {
                await axios.put(`https://atcbackend.herokuapp.com/api/editSubTorneo/${params.idSubtorneo}`,
                {
                    id_torneo: params.idTorneo,
                    nombre: Name,
                    cantidad_personas: Cantidad_personas,
                })
                setConfirmation("Se ha editado la competencia correctamente")
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
        }
    }


    const PublishGroups = async (e) =>{
            try {
                //await axios.put(`https://atcbackend.herokuapp.com/api/editSubTorneo/${params.idSubtorneo}`,
                await axios.put(`http://localhost:4000/api/publishGroups/${params.idTorneo}`,
                {
                    isPublicado: 1
                })
                setConfirmation("Se ha editado la competencia correctamente")
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
        
    }

    const getSubTournamentParticipants = async () => {
        setIsLoadingParticipants(true)
        //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSubTorneosParticipants/${params.idSubtorneo}`)
        const result = await axios.get(`http://localhost:4000/api/GetSubTorneosParticipants/${params.idSubtorneo}`)
        setParticipants(result.data);
        setIsLoadingParticipants(false)
        console.log("Participantes: " + JSON.stringify(result.data)); 
      }

      const getParejas = async () => {
        try {
            setIsLoadingParticipants(true)
            const result = await axios.get(`http://localhost:4000/api/getSubtorneoParejas/${params.idSubtorneo}`)
            setParticipants(result.data);
            setIsLoadingParticipants(false)
          console.log("Parejas: " + JSON.stringify(result.data)); 
        } catch (error) {
          console.log("Error: " + error.message);
        }
  
      }

      const DeleteSubTorneoParticipant = async (id_subtorneo, user_id)=>{
        try {
            //const result = await axios.delete(`https://atcbackend.herokuapp.com/api/deleteSubTorneoParticipant/user=${user_id}/${id_subtorneo}`);
            const result = await axios.delete(`http://localhost:4000/api/deleteSubTorneoParticipant/user=${user_id}/${id_subtorneo}`);
            const filter = Participants.filter(p => p.id !== user_id )
            //console.log(result.data);
            setParticipants(filter);
        } catch (error) {
            alert(error.message)
        }
      }

      const addGrupo = async (e) =>{
        e.preventDefault();
        setIsLoadingAddingGroups(true)
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/deleteSubTorneoParticipant/idsubtorneo=${params.idSubtorneo}`)
            const result = await axios.post(`http://localhost:4000/api/addGrupo/idsubtorneo=${params.idSubtorneo}/numberOfGroups=${NumberOfGroups}`,
            {
                idSubTorneo: params.idSubtorneo,
                isPublicado: 0
            })
            console.log(result.data);
            setIsLoadingAddingGroups(false)
            window.location.reload();
        } catch (error) {
            
        }
      }


      const DeleteGrupo = async (e, id_grupo) =>{
        e.preventDefault();
        setIsDeletingGroup(true)
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/deleteSubTorneoParticipant/idsubtorneo=${params.idSubtorneo}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteGrupo/idGrupo=${id_grupo}`,
            {
                idSubTorneo: params.idSubtorneo,
            })
            console.log(result.data);
            setIsDeletingGroup(false)
            window.location.reload();
        } catch (error) {
            
        }
      }


      const DeleteSubTorneoGroupParticipant = async (e, id_grupo, userId) =>{
        e.preventDefault();
        setIsDeletingGroup(true)
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/deleteSubTorneoParticipant/idsubtorneo=${params.idSubtorneo}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteSubTorneoGroupParticipant/idGrupo=${id_grupo}/idUser=${userId}`,
            {
                idSubTorneo: params.idSubtorneo,
            })
            console.log(result.data);
            setIsDeletingGroup(false)
            window.location.reload();
        } catch (error) {
            
        }
      }

      const addGroupMember = async (e,id_grupo) =>{
        e.preventDefault();
        if(IdGroupMember===""){
            alert("Por favor seleccione un jugador")
        }else{

            try {
                //const result = await axios.post(`https://atcbackend.herokuapp.com/api/deleteSubTorneoParticipant/idsubtorneo=${params.idSubtorneo}`)
                const result = await axios.post(`http://localhost:4000/api/addGrupoMember`,
                {
                    id_grupo: id_grupo,
                    user_id: IdGroupMember
                })
                if(result.data.success){
                    alert(`Se ha agregado el jugador ${IdGroupMember} al grupo ${id_grupo}`)
                    window.location.reload()
                }
                console.log(result.data);
            } catch (error) {
                
            }
        }
    }

      const GetSubtorneoGrupos = async () =>{
        try { 
            setIsLoadingForms(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            setGroups(result.data);

            setIsLoadingForms(false)
        } catch (error) { 
            
        }
      }
      const GetGruposMembers = async () =>{
        try {
            setIsLoadingMembers(true)
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.idSubtorneo}`)
            setGroupsMembers(result.data);
            console.log("GroupsMembers: " + JSON.stringify(result.data));
            setIsLoadingMembers(false)
        } catch (error) {
            
        }
      }


    useEffect(() => {
        GetSubtorneoById();
        console.log(params.modalidad);
        if(params.modalidad.trim()==="Dobles"){
            getParejas();
          }else{
            getSubTournamentParticipants();
          }
        GetSubtorneoGrupos();
        GetGruposMembers();
    },[])


  return (
    <div className="editTorneoWrapper">
        <div className="main_editTorneo_container">
            <div className="EditTorneo_form_container">
                <h3>Editar competencia</h3>
                <form onSubmit={UpdateCompetencia} className="form_add_canchas">
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Nombre</label>
                        <input value={Name} type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="cantPersonas">Cantidad de Personas</label>
                        <input value={Cantidad_personas} type="number" id="cantPersonas" onChange={(e)=>setCantidad_personas(e.target.value)} required/>
                    </div>
                    <p style={{fontSize:"14px"}}>{Confirmation}</p>
                    <div className="btn_addCancha_container">
                        <button type="submit">Guardar Cambios</button>
                        <button type="submit"><Link to={`/admin/manageTorneos/editTorneo/id=${Id_torneo}`} className="link_go_back">Volver</Link></button>
                    </div>
                </form>
            </div>
            {
                IsLoadingParticipants ?
                <>
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}/>
                </>
                    :
                    <div className="subtorneo_details_table_container">
                    <table className="subtorneo_details_table">
                        <thead>
                            <tr className="table_headers">
                                <th>Participantes</th>
                                {params.modalidad==="Dobles" &&<th>Numero de Pareja</th>}
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    Participants.length===0 ?
                                    <>
                                    <tr>
                                        <td>
                                            
                                            <RotatingLines
                                            strokeColor="green"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="35"
                                            visible={true}/>
                                        </td>
                                    </tr>
                                    </>
                                    :
                                    Participants.map((participant, index)=>(
                                        <tr key={index}>
                                        <td>{participant.username}</td>
                                        <td>{params.modalidad.trim()==="Dobles" && (participant.id_pareja)}</td>
                                        <td><button onClick={()=> DeleteSubTorneoParticipant(participant.id_subtorneo, participant.id)} className="editTorneoDeleteParticipant">Eliminar</button></td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                    </table>
                </div>
            }
        <div className="groups_container">
            <div className="form_create_group_container">
            <h3>Crear Grupos</h3>
                <form onSubmit={addGrupo} className="form_create_group">
                    <div className="groups_number_input_container">
                        <label htmlFor="numberOfGroups">Numero de grupos</label>
                        <input type="number" id="numberOfGroups" onChange={(e)=>setNumberOfGroups(e.target.value)} required/>
                    </div>
                    {IsLoadingAddingGroups &&
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}/>
                    }           
                    <div className="btn_create_group_container">
                        <button type="submit" className="btn_create_group">Crear</button>
                    </div>
                </form>
            </div>
        </div>
        </div>

         <br />
         <br />
        <hr/>
            <div className="addGroupPlayerContainer">
            {
                IsLoadingForms ? 
                    <>
                    <p>Cargando...</p>
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}/>
                    </>
                        : 
                    
                        Groups.map((g, index)=>(
                    
                        <form key={index} onSubmit={(e)=> addGroupMember(e, g.id_grupo)} className="addGroupPlayerForm">
                            <div className="name_input_container">
                                <label htmlFor="Integrante">Grupo {index+1}</label>
                                <select type="text" id="Integrante" onChange={(e)=>setIdGroupMember(e.target.value)} required>
                                    <option value="">---Seleccione un Jugador---</option>
                                    {Participants.map((p, index)=>(
                                        <option key={index} value={p.id}>{p.username}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <button type="submit" className='btnAddGroupPlayer'>Agregar Jugagdor</button>
                                <button className='btnDeleteGroup' onClick={(e)=> DeleteGrupo(e,g.id_grupo)}>Eliminar Grupo</button>
                            </div>
                        </form>
                    
                    
                        )) }
                </div>

        <br />
        <br />
        <hr/>
                <div className="groupsMembers_container">
                {
                    IsLoadingMembers ? 
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
                <>
                  
                  { GroupsMembers.length>0 &&
                  <>
                    <Link to={`/createSubtorneoMatches/${params.idSubtorneo}`} className="crear_enfrentamientos_btn">Enfrentamientos</Link>
                    <table className="subtorneo_details_table">
                        <thead>
                            <tr className="table_headers">
                                <th>Usuario</th>
                                <th>Grupo</th>
                                {params.modalidad==="Dobles" &&<th>Id de Pareja</th>}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                       { 
                        GroupsMembers.map((gm,index)=>(
                            <tr key={index}>
                                <td>{gm.accion} - {gm.nombres} {gm.apellidos}</td>
                                <td>{gm.nombre_grupo}</td>
                                { params.modalidad==="Dobles" && <td>{gm.id_pareja}</td>}
                                <td><button onClick={(e)=> DeleteSubTorneoGroupParticipant(e, gm.id_grupo, gm.id)} className="editTorneoDeleteParticipant">Eliminar</button></td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <button onClick={PublishGroups} className="publishGrups_btn">Publicar Grupos</button>
                </>
                }
                </>
                }
                </div>
                
                       
        
    </div>
  )
}
