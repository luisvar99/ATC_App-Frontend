import React,{ useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Moment from 'react-moment'
import 'moment-timezone'
import './EditTorneo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


export default function EditTorneo() {

  const [Name, setName] = useState("")
  const [Inicio_inscripcion, setInicio_inscripcion] = useState("")
  const [Fin_inscripcion, setFin_inscripcion] = useState("")
  const [Inicio_torneo, setInicio_torneo] = useState("")
  const [Fin_torneo, setFin_torneo] = useState("")
  const [Description, setDescription] = useState("")
  const [Category, setCategory] = useState(0)
  const [Modalidad, setModalidad] = useState()
  const [Competencias, setCompetencias] = useState([])
  const [Participants, setParticipants] = useState([])

  const [Confirmation, setConfirmation] = useState("")


  const params = useParams();


  useEffect(() => {
    GetTorneoById();
    GetCompetencias();
    //console.log("inicio torneo: " + Inicio_torneo);
    }, [])

    const GetTorneoById = async (e) =>{
      try {
          //const result = await axios.get(`https://atcbackend.herokuapp.com/api/getSingleTorneo/${params.idTorneo}`)
          const result = await axios.get(`http://localhost:4000/api/getSingleTorneo/${params.idTorneo}`)
          setName(result.data[0].nombre_torneo)
          setInicio_torneo(moment(result.data[0].fecha_inicio).format('YYYY-MM-DD'))
          setFin_torneo(moment(result.data[0].fecha_fin).format('YYYY-MM-DD'))
          setInicio_inscripcion(moment(result.data[0].fecha_inicio_inscripcion).format('YYYY-MM-DD'))
          setFin_inscripcion(moment(result.data[0].fecha_fin_inscripcion).format('YYYY-MM-DD'))
          setCategory(result.data[0].id_categoria)
          setDescription(result.data[0].descripcion)
          setModalidad(result.data[0].modalidad)
          console.log("result.data[0].modalidad: " + result.data[0].modalidad);

          //console.log("RESULT: " + JSON.stringify(result.data));
          
      } catch (error) {
          alert("ERROR: " + error.message);
      }
  }


const EditTorneo = async (e) =>{
    e.preventDefault();
    if(Category==="" || Modalidad===""){
        alert("Por favor, complete todos los campos")
    }else{
        setConfirmation("Actualizando Torneo...")
        try {
            //const editResult = await axios.put(`https://atcbackend.herokuapp.com/api/editTorneo/${params.idTorneo}`,
            const editResult = await axios.put(`http://localhost:4000/api/editTorneo/${params.idTorneo}`,
            {
              nombre_torneo: Name,
              fecha_inicio: Inicio_torneo,
              fecha_fin: Fin_torneo,
              fecha_inicio_inscripcion: Inicio_inscripcion,
              fecha_fin_inscripcion: Fin_inscripcion,
              id_categoria: Category,
              descripcion: Description,
              modalidad: Modalidad,
              is_colores: false
            })
            console.log(editResult.data);
            setConfirmation("Se ha actualizado el torneo correctamente")
        } catch (error) {
            setConfirmation("Ha ocurrido un error")
            alert(error.message);
        }
    }
}


const GetCompetencias = async () => {
    try {
      //const result = await axios.get(`https://atcbackend.herokuapp.com/api/getSubTorneoByTorneoId/${params.idTorneo}`)
      const result = await axios.get(`http://localhost:4000/api/getSubTorneoByTorneoId/${params.idTorneo}`)
      setCompetencias(result.data);
    } catch (error) {
      
    }
  }


const DeleteCompetencia = async (id) => {
    try {
        //const result = await axios.delete(`https://atcbackend.herokuapp.com/api/deleteSubTorneo/${id}`);
        const result = await axios.delete(`http://localhost:4000/api/deleteSubTorneo/${id}`);
        const filter = Competencias.filter(e => e.id_subtorneo !== id)
        console.log(result.data);
        setCompetencias(filter);
    } catch (error) {
        alert(error.message)
    }
}

  return (
    <div className="main_editTorneo_container">
        <div className="torneo_subTorneo_container">
            <h2 style={{textAlign:"center"}}>Competencias</h2>
            <button className="add_competencia"><Link to={`/admin/manageTorneos/addCompetencia/${Name}/idTorneo=${params.idTorneo}`}>Agregar Competencia</Link></button>
            <table className="chanchasAdmin_table">
                <thead>
                    <tr className="table_headers">
                        <th style={{width:"200px"}}>Nombre</th>
                        <th>Cantidad de Personas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            Competencias.map((comp)=>(
                            <tr key={comp.id_subtorneo}>
                                <td>{comp.nombre}</td>
                                <td>{comp.cantidad_personas}</td>
                                {/* <td><button className="editCanchaBtn"><Link to={`editSubtorneo/id=${comp.id_subtorneo}/modalidad=${Modalidad}`}>Detalles</Link></button></td>
                                <td><button className="deleteCanchaBtn" onClick={(e) => DeleteCompetencia(comp.id_subtorneo)}>Eliminar</button></td> */}
                                
                                <td><Link to={`editSubtorneo/id=${comp.id_subtorneo}/modalidad=${Modalidad}`}> <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "#545353"}}/> </Link></td>
                                <td><FontAwesomeIcon icon={faTrash} size="2x" className="deleteIcon" onClick={(e) => DeleteCompetencia(comp.id_subtorneo)} style={{cursor: "pointer", color: "#545353"}}/></td>
                            </tr>
                            ))
                        }
                    </tbody>
            </table>
        </div>
            <div className="main_addTorneo_container">
                <h3 style={{marginTop:"2rem"}}>Editar {Name}</h3>
                <div className="editTorneoForm_container">
                    <form onSubmit={EditTorneo} className="form_edit_torneos">
                        <div className="name_input_container">
                            <label htmlFor="nameCancha">Nombre del Torneo</label>
                            <input value={Name} type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className="fechas_inicioT_finT">
                            <div className="inicioTorneo">
                                <label htmlFor="inicioT">Inicio del Torneo</label>
                                <input value={Inicio_torneo} type="date" id="inicioT" onChange={(e)=>setInicio_torneo(e.target.value)} required/>
                            </div>
                            <div className="finTorneo">
                                <label htmlFor="finT">Fin del Torneo</label>
                                <input value={Fin_torneo} type="date" id="finT" onChange={(e)=>setFin_torneo(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="fechas_inicioT_finT">
                            <div className="inicioTorneo">
                                <label htmlFor="inicioIns">Inicio Inscripcion</label>
                                <input value={Inicio_inscripcion} type="date" id="inicioIns" onChange={(e)=>setInicio_inscripcion(e.target.value)} required/>
                            </div>
                            <div className="inicioTorneo">
                                <label htmlFor="FinIns">Fin Inscripcion</label>
                                <input value={Fin_inscripcion} type="date" id="FinIns" onChange={(e)=>setFin_inscripcion(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="category_input_container">
                        <label htmlFor="categoryCancha">Categoria</label>
                            <select value={Category} id="ecategoryCancha" className="" onChange={(e)=>setCategory(e.target.value)}>
                                <option value="">---Seleccione una Categoria---</option>
                                <option value="0">Tennis</option>
                                <option value="1">Padel</option>
                            </select>
                        </div>
                        <div className="category_input_container">
                        <label htmlFor="categoryCancha">Modalidad</label>
                            <select value={Modalidad} id="ecategoryCancha" className="" onChange={(e)=>setModalidad(e.target.value)}>
                                <option value="">---Seleccione una Categoria---</option>
                                <option value="Singles">Singles</option>
                                <option value="Dobles">Dobles</option>
                            </select>
                        </div>
                        <div className="name_input_container">
                            <label htmlFor="description">Descripcion</label>
                            <textarea value={Description} type="text" id="description" onChange={(e)=>setDescription(e.target.value)} rows="5" required/>
                        </div>
                        <p style={{fontSize:"14px", marginBottom:"0"}}>{Confirmation}</p>
                        <div className="btn_addCancha_container">
                            <button type="submit">Guardar Cambios</button>
                            <button type="submit"><Link to="/admin/manageTorneos" className="link_go_back">Volver</Link></button>
                        </div>
                    </form>
                </div>
            </div>
            
    </div>
  )
}
