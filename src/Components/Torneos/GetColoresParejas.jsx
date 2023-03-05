import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import GetColoresParejasMembers from './GetColoresParejasMembers'
import './GetColoresParejas.css'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'




export default function GetColoresParejas() {

    
    const [ColoresParejas, setColoresParejas] = useState([])
    const [ColoresParticipantes, setColoresParticipantes] = useState([])
    const [ColoresEquipos, setColoresEquipos] = useState([])
    const [IdEquipo, setIdEquipo] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(false);


    const params = useParams();

/*     const getColoresParejas = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresParejas/${params.id}`);
            setColoresParejas(result.data);
            //console.log("getColoresParejas: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    } */

    const getColoresParticipantes = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresParticipantes/${params.id}`);
            //const result = await axios.get(`http://localhost:4000/api/getColoresParticipantes/${params.id}`);
            console.log("getColoresParticipantes: " + JSON.stringify(result.data));
            setColoresParticipantes(result.data);
        }catch (error) {
            alert(error.message)
        }
    }

    
    const GetEquiposColores = async () => {
        
        try {
            const result = await axios.get(`http://localhost:4000/api/GetEquiposColores/${params.id}`);
            //const result = await axios.get(`http://localhost:4000/api/GetEquiposColores/${params.id}`);
            setColoresEquipos(result.data);
            //console.log("Pareja " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }
    
    const setTeamToParticipante = async (id_pareja) => {
        if(IdEquipo===0){
            alert("Seleccione un equipo")
        }else{
            try {
                const result = await axios.put(`http://localhost:4000/api/setEquipoToPareja/${id_pareja}/${params.id}`,
                {
                    id_equipo: IdEquipo
                });
                if(result.data.success===true){
                    //console.log("Pareja " + JSON.stringify(result.data));
                    setIsOpen(true);
                }else{
                    alert("Ha ocurrido un error asignando un equipo al participante")
                }
            }catch (error) {
                alert(error.message)
            }
        }
    }

   /*  const DeleteColoresPareja = async (id_pareja) => {
        
        try {
            const result = await axios.delete(`http://localhost:4000/api/DeleteColoresPareja/${id_pareja}`);
            console.log("Pareja " + JSON.stringify(result.data));
            window.location.reload();
        }catch (error) {
            alert(error.message)
        }
    } */
    const DeleteColoresParticipante = async (id_pareja) => {
        console.log(id_pareja);
        try {
            const result = await axios.delete(`http://localhost:4000/api/DeleteColoresParticipante/${id_pareja}/${params.id}`);
            if(result.data.success===true){
                const filter = ColoresParticipantes.filter(cp => cp.id !== id_pareja);
                setColoresParticipantes(filter);
                setIsOpen(true);
            }else{
                alert("Ha ocurrido un error eliminando al participante")
            }
        }catch (error) {
            alert(error.message)
        }
    }

    function closeModal() {
        setIsOpen(false);
      }

    useEffect(() => {
        /* getColoresParejas(); */
        getColoresParticipantes();
        GetEquiposColores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
            
        <>
        {/* <div className="coloresParticipantsContainer">

            {
                ColoresParejas.map((p, index)=>(
                    <div key={index}>
                        <div className="aux">
                            <GetColoresParejasMembers id_pareja={p.id_pareja} id_torneo={params.id} key={index} />
                            <select onChange={(e) => setIdEquipo(e.target.value)} style={{fontSize:"0.8rem"}}>
                                <option value="" >Seleccione un Equipo</option>
                                {ColoresEquipos.map((ce,index)=>(
                                    <option key={index} value={ce.id_equipo}>{ce.nombre_equipo}</option>
                                    ))
                                }
                            </select>
                            <div style={{display:"flex", width: "100%", justifyContent:"space-between", marginTop:"0.3rem", alignItems:"center"}}>
                                <button onClick={(e) => setTeamToPareja(p.id_pareja)} style={{padding:"0.4rem", width: "75%", fontSize:"0.8rem"}}>Guardar Cambios</button>
                                <FontAwesomeIcon icon={faTrash} className="deleteColoresParejaIcon" onClick={(e) => DeleteColoresPareja(p.id_pareja)} style={{cursor: "pointer", fontSize:"2rem", color: "#515151"}}/>                            
                            </div>
                        </div>
                </div>
                    ))
                }
        </div> */}
        <div className="coloresParticipantsContainer">
        <Modal
            open={modalIsOpen}
            onClose={closeModal}
            center
          >
            <h2>Proceso completado con exito</h2>
            <div className="modal_container">
              <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
              <button onClick={closeModal}>Aceptar</button>
            </div>

          </Modal>
        {
            ColoresParticipantes.map((cp, index)=>(
                <>
                
                <div key={index} className="coloresParticipantesTableContainer">
                    <table>
                        <thead>
                            <tr>
                                <td>Accion</td>
                                <td>Participante</td>
                                <td>Categoria</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{cp.accion}</td>
                                <td>{cp.nombres} {cp.apellidos}</td>
                                <td>{cp.categoria}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{marginTop:"0.5rem", width: "100%"}}>
                        <select onChange={(e) => setIdEquipo(e.target.value)} style={{fontSize:"0.8rem", width: "100%"}}>
                            <option value="" >Seleccione un Equipo</option>
                            {ColoresEquipos.map((ce,index)=>(
                                <option key={index} value={ce.id_equipo}>{ce.nombre_equipo}</option>
                                ))
                            }
                        </select>
                        <div style={{display:"flex", width: "100%", justifyContent:"space-between", marginTop:"0.3rem", alignItems:"center"}}>
                            <button className='GuardarCambiosBtn' onClick={(e) => setTeamToParticipante(cp.id)} style={{padding:"0.4rem", width: "85%", fontSize:"0.8rem"}}>Guardar Cambios</button>
                            <FontAwesomeIcon icon={faTrash} className="deleteColoresParejaIcon" onClick={(e) => DeleteColoresParticipante(cp.id)} style={{cursor: "pointer", fontSize:"2rem", color: "#515151"}}/>                            
                        </div>
                    </div>
                </div>
                </>
            ))}
        </div>
        
        </>
  )
}
