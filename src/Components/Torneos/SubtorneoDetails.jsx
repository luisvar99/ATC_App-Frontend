import React, { useState, useEffect } from 'react'
import './TorneoDetails.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './SubtorneoDetails.css'
import { RotatingLines } from  'react-loader-spinner'
import GetGroupsMembers from './GetGroupsMembers'
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'



export default function SubtorneoDetails() {

  const [Participants, setParticipants] = useState([])
  const [Users, setUsers] = useState([])
  const [Parejas, setParejas] = useState([])
  const [GroupsMembers, setGroupsMembers] = useState([])
  const [Groups, setGroups] = useState([])
  const [GroupsStatus, setGroupsStatus] = useState(0)
  const [NotAdmin, setNotAdmin] = useState(true)

  const [IsLoading, setIsLoading] = useState(false)
  const [IsLoadingMembers, setIsLoadingMembers] = useState(false)
  const [IsLoadingParejas, setIsLoadingParejas] = useState(false)
  const [IsLoadingGrupos, setIsLoadingGrupos] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [DesinscripcionModalIsOpen, setDesinscripcionModalIsOpen] = useState(false);

  const [NumberOfParticipants, setNumberOfParticipants] = useState(0)
  const [Cantidad_personas, setCantidad_personas] = useState(0)
  const [MyParejaId, setMyParejaId] = useState(0)

  const [FechaFinInscripcion, setFechaFinInscripcion] = useState(new Date())

  const params = useParams();

  const inscripcion = async () => {
    if(MyParejaId===0 && params.modalidad === "Dobles"){
      alert("Debe seleccionar una pareja para el proceso de inscripción")
    }else{
      const duplicateInscriptionSingles = Participants.find(e=>e.id === parseInt(sessionStorage.getItem('userId')));
      const duplicateInscriptionParejas = Parejas.find(e=>e.id === parseInt(sessionStorage.getItem('userId')));
      const duplicateInscriptionParejasAux = Parejas.find(e=>e.id === parseInt(MyParejaId));
      if(duplicateInscriptionSingles !== undefined || duplicateInscriptionParejas !== undefined || duplicateInscriptionParejasAux !== undefined){
        alert("Usted o su pareja ya se encuentra inscrito en este torneo")
      }else{
        setIsLoading(true)
        
        const result = await axios.post('http://localhost:4000/api/addParticipant',
        {
          id_subtorneo: params.idSubTorneo,
          user_id: sessionStorage.getItem('userId'),
          modalidad: params.modalidad,
          myParejaId: MyParejaId
        })

        if(params.modalidad === "Dobles"){
          const inscripcionParejaResult = await inscripcionPareja()
          if(inscripcionParejaResult===true){
            setIsLoading(false)
            setIsOpen(true)
          }else{
            alert("Ha ocurrido un error realizando la inscripcion de la pareja")
          }
        }else{
          if(result.data.success===true){
            setIsLoading(false)
            setIsOpen(true)
          }else{
            alert("Ha ocurrido un error realizando la inscripcion")
          }
        }
        
      }
    }
  }

    const inscripcionPareja = async () => {
      const duplicateInscription = Participants.find(e=>e.id === parseInt(sessionStorage.getItem('userId')));
      if(duplicateInscription!== undefined){
        alert("Usted ya se encuentra inscrito en este torneo")
      }else{
        setIsLoading(true)
        const result = await axios.post('http://localhost:4000/api/addSubtorneoPareja',
        {
          myId: sessionStorage.getItem('userId'),
          myParejaId: MyParejaId,
          id_subtorneo: params.idSubTorneo,
        })
        if(result.success===true){
          console.log(result.data); 
          return true;
        }else{
          return false;
        }
      }
    }

    const getSubTournamentParticipants = async () => {

      const result = await axios.get(`http://localhost:4000/api/GetSubTorneosParticipants/${params.idSubTorneo}`)
      setParticipants(result.data);
    }

    const getParejas = async () => {

      try {
        setIsLoadingParejas(true)
        const result = await axios.get(`http://localhost:4000/api/getSubtorneoParejas/${params.idSubTorneo}`)
        //const result = await axios.get(`http://localhost:4000/api/getSubtorneoParejas/${params.idSubTorneo}`)
        setParejas(result.data);
        //console.log(result.data); 
        setIsLoadingParejas(false) 
      } catch (error) {
        console.log("Error: " + error.message);
      }

    }

    const GetNumberOfParticipants = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/GetNumberOfParticipants/${params.idSubTorneo}`)
        //const result = await axios.get(`http://localhost:4000/api/GetNumberOfParticipants/${params.idSubTorneo}`)
        //console.log(result.data);
        setNumberOfParticipants(result.data[0].number_of_participants)
      } catch (error) {
        console.log("Error: " + error.message);
      }
    }
    const GetSubtorneoinfo = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
        //const result = await axios.get(`http://localhost:4000/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
        //console.log("GetSubtorneoinfo " + JSON.stringify(result));
        setCantidad_personas(result.data[0].cantidad_personas)
      } catch (error) {
        console.log("Error: " + error.message);
      }
    }

    const GetSubtorneoGrupos = async () =>{
      try { 
          setIsLoadingGrupos(true)
          const result = await axios.get(`http://localhost:4000/api/getSubtorneoGrupos/${params.idSubTorneo}`)
          //const result = await axios.get(`http://localhost:4000/api/getSubtorneoGrupos/${params.idSubTorneo}`)
          //console.log("GetSubtorneoGrupos: " + JSON.stringify(result.data[0]))
          setGroupsStatus(result.data[0] === undefined ? GroupsStatus: result.data[0].isPublicado);
          setGroups(result.data);
          setIsLoadingGrupos(false)
      }catch (error){ 
          alert("GetSubtorneoGrupos Error: " + error.message)
      }
    }

    const GetTorneoinfo = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/getSingleTorneo/${params.idTorneo}`)
        //const result = await axios.get(`http://localhost:4000/api/getSingleTorneo/${params.idTorneo}`)
        setFechaFinInscripcion(result.data[0].fecha_fin_inscripcion)
        //console.log("GetSubtorneoinfo " + JSON.stringify(result));
      } catch (error) {
        alert("Error: " + error.message);
      }
    }

    const GetUsers = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/getAllUsers`)
        //const result = await axios.get(`http://localhost:4000/api/getAllUsers`)
        //console.log("GetSubtorneoinfo " + JSON.stringify(result));
        setUsers(result.data)
      } catch (error) {
        alert("Error: " + error.message);
      }
    }

    const Desinscripcion = async (user_id, pareja_id) => {
      try {
        const DesinscripcionResult = await axios.delete(`http://localhost:4000/api/Desinscripcion/${params.idSubTorneo}/${user_id}/${params.modalidad}/${pareja_id}`)
        
        if(params.modalidad === "Dobles"){
          const DesinscripcionParejaResult = await DesinscripcionPareja(pareja_id)

          if(DesinscripcionParejaResult===true){
            setDesinscripcionModalIsOpen(true)
          }else{
            alert("Ha ocurrido un error realizando la desinscripcion de la pareja")
          }

        }else{

          if(DesinscripcionResult.data.success===true){
            setDesinscripcionModalIsOpen(true)
          }else{
            alert("Ha ocurrido un error realizando la desinscripcion")
          }

        }
      } catch (error) {
        alert("Ha ocurrido un error realizando la desinscripcion")
      }
    }

    const DesinscripcionPareja = async (pareja_id) => {
      try {
        const DesinscripcionPareja = await axios.delete(`http://localhost:4000/api/DesinscripcionPareja/${pareja_id}/${params.idSubTorneo}`)
        if(DesinscripcionPareja.data.success===true){
          return true
        }else{
          return false
        }
      } catch (error) {
        return false
      }
    }

    function closeModal() {
      setIsOpen(false);
      window.location.reload();
    }
    function closeModalDesinscripcion() {
      setDesinscripcionModalIsOpen(false);
      window.location.reload();
    }

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #838080'
      },
    };

    useEffect(() => {
      console.log(params.modalidad);
      if(params.modalidad==="Dobles"){
        getParejas();
        //console.log("Parejas: " + JSON.stringify(Parejas));
      }else{
        getSubTournamentParticipants();
      }
      GetNumberOfParticipants();
      GetTorneoinfo();
      GetSubtorneoinfo();
      //GetGruposMembers();
      GetSubtorneoGrupos();
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
      GetUsers();
    },[NumberOfParticipants])
    
    /* useEffect(() => {
      console.log(typeof MyParejaId);
    },[MyParejaId])
 */

  return (
    <div className="subtorneoDetails_main_container">
      <div className="table_container">
            {
              Cantidad_personas-NumberOfParticipants<0 ?
              <p>Cupos Disponibles: <RotatingLines
                                      strokeColor="green"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      width="30"
                                      visible={true}
                                    />
              </p>  :
              <>
                <p>Cupos Disponibles: {Cantidad_personas-NumberOfParticipants}</p>         
              </>        
            }
        {
          params.modalidad==="Dobles" &&
          <div style={{marginBottom:"2rem"}}>

              <label htmlFor="myPareja" style={{marginRight:"0.5rem"}}>Mi Pareja</label>
              <select id="myPareja" onChange={(e)=> setMyParejaId(e.target.value)} required>
                {
                  Users.length===0 ?
                  <option value="0">Cargando Usuarios...</option>
                  :
                  <option value="0">---Seleccione un usuario---</option>
                }
                {
                  Users.map((u, index)=>(
                    
                      u.id !== parseInt(sessionStorage.getItem('userId')) &&
                      <option key={index} value={u.id}>{u.accion} - {u.nombres} {u.apellidos}</option>
                    
                    ))
                  }
              </select>
          </div>
          
        }
        
        <div className="btn_spinner" style={{display: 'flex', alignItems:"flex-start"}}>
          {
            Cantidad_personas-NumberOfParticipants>0 && params.modalidad==="Singles" ?
            <button onClick={inscripcion} className="btn_inscripcion">Inscribirme</button>
            :
            ((Users.length!==0 && Cantidad_personas-NumberOfParticipants>0) && (new Date(FechaFinInscripcion).getTime() > new Date().getTime())) &&
            <>
            
            <button onClick={inscripcion} className="btn_inscripcion">Inscribir Pareja</button>
            </>
          }
          {IsLoading && <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="35"
            visible={true}
          />}
        </div>
        {
        params.modalidad!=="Dobles" ?
        <table className="subtorneo_details_table">
                <thead>
                    <tr className="table_headers">
                        <th>Participantes</th>
                    </tr>
                </thead>
                    <tbody>
                    
                        {
                            Participants.map((participant, index)=>(
                            <tr key={index}>
                              {
                                IsLoadingMembers ? 
                                <td><RotatingLines
                                  strokeColor="green"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="35"
                                  visible={true}/></td>
                                  :
                                  <>
                                    <td style={ participant.id === parseInt(sessionStorage.getItem('userId')) ? {backgroundColor:"yellow"}: {}} >{participant.accion} - {participant.nombres} {participant.apellidos}</td>
                                    {
                                      participant.id === parseInt(sessionStorage.getItem('userId')) && 
                                      <td style={{width:"10%"}}><button className='Desinscripcion_Btn' onClick={() => Desinscripcion(participant.id, null)}>Desinscribirme</button></td>
                                    }
                                  </>
                              }  
                            </tr>
                            ))
                        }
                    </tbody>
            </table>
            :
            
            
                IsLoadingParejas ? 
                    <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}/>
                  : 
            <table className="subtorneo_details_table">
                <thead>
                    <tr className="table_headers">
                        <th>Participantes</th>
                        <th>Numero de Pareja</th>
                        {/* <th>{IsLoadingParejas}</th> */}
                    </tr>
                </thead>
                    <tbody>
                    
                            {Parejas.map((pareja, index)=>(
                            <tr key={index}>
                                  <>
                                    <td style={ pareja.id_pareja === parseInt(sessionStorage.getItem('userId')) ? {backgroundColor:"yellow"}: {}} >{pareja.nombres} {pareja.apellidos} </td>
                                    <td>{pareja.id_pareja}</td>
                                    {
                                      pareja.id === parseInt(sessionStorage.getItem('userId')) && 
                                      <td style={{width:"15%"}}><button className='Desinscripcion_Btn' onClick={() => Desinscripcion(null,pareja.id_pareja)}>Desinscribir Pareja</button></td>
                                    }
                                  </>
                            </tr>
                            ))}
                            
                    </tbody>
              </table>
            }
            
            
            
      </div>
      
        <>
        <Modal
            open={modalIsOpen}
            onClose={closeModal}
            style={customStyles}
            center
          >
            <h2>La inscripcion se ha realizado correctamente</h2>
            <div className="modal_container">
              <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
              <button onClick={closeModal}>Aceptar</button>
            </div>

          </Modal>
          <Modal
            open={DesinscripcionModalIsOpen}
            onClose={closeModalDesinscripcion}
            style={customStyles}
            center
          >
            {
              params.modalidad==="Dobles" ?
              <h2>La desinscripcion de la pareja se ha realizado correctamente</h2>
              :
              <h2>La desinscripcion se ha realizado correctamente</h2>
            }
            <div className="modal_container">
              <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
              <button onClick={closeModalDesinscripcion}>Aceptar</button>
            </div>

          </Modal>
          <Link to={`/subtorneoMatches/idSubtorneo=${params.idSubTorneo}`} className="see_subtorneo_matches">
            Enfretamientos
          </Link>

        <h2>Grupos</h2>

        <div className="GetGroupsMembers_conatiner_two">
        {
          IsLoadingGrupos ?
            <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}/>
            :
            GroupsStatus ===1 ?
              
            Groups.map((g, index)=>(
              <div className="GetGroupsMembers_wrapper">
                <GetGroupsMembers idGrupo={g.id_grupo} key={index} idSubtorneo={params.idSubTorneo} modalidad={params.modalidad} NotAdmin={NotAdmin}/>
              </div>
            ))
            :
              <p style={{textAlign: "center"}}>Los grupos aun no han sido publicados</p>
            }
        </div>
      </>
        
  </div>
  )
}
