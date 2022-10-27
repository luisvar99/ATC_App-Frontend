import React,{ useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Moment from 'react-moment'
import 'moment-timezone'


export default function EditTorneo() {

  const [Name, setName] = useState("")
  const [Inicio_inscripcion, setInicio_inscripcion] = useState()
  const [Fin_inscripcion, setFin_inscripcion] = useState()
  const [Inicio_torneo, setInicio_torneo] = useState()
  const [Fin_torneo, setFin_torneo] = useState()
  const [Description, setDescription] = useState("")
  const [Category, setCategory] = useState(0)

  const [Confirmation, setConfirmation] = useState("")

  const params = useParams();

  useEffect(() => {
    GetTorneoById();
    //console.log("inicio torneo: " + Inicio_torneo);
    }, [])

    const GetTorneoById = async (e) =>{
      try {
          const result = await axios.get(`http://localhost:4000/api/getSingleTorneo/${params.idTorneo}`)
          setName(result.data[0].nombre_torneo)
          setInicio_torneo(moment(result.data[0].fecha_inicio).format('YYYY-MM-DD'))
          setFin_torneo(moment(result.data[0].fecha_fin).format('YYYY-MM-DD'))
          setInicio_inscripcion(moment(result.data[0].fecha_inicio_inscripcion).format('YYYY-MM-DD'))
          setFin_inscripcion(moment(result.data[0].fecha_fin_inscripcion).format('YYYY-MM-DD'))
          setCategory(result.data[0].id_categoria)
          setDescription(result.data[0].descripcion)

          //console.log("RESULT: " + JSON.stringify(result.data));
          
      } catch (error) {
          alert(error.message);
      }
  }


const EditTorneo = async (e) =>{
    e.preventDefault();
    if(Category===""){
        alert("Por favor, complete todos los campos")
    }else{
        setConfirmation("Actualizando Torneo...")
        try {
            const editResult = await axios.put(`http://localhost:4000/api/editTorneo/${params.idTorneo}`,
            {
              nombre_torneo: Name,
              fecha_inicio: Inicio_torneo,
              fecha_fin: Fin_torneo,
              fecha_inicio_inscripcion: Inicio_inscripcion,
              fecha_fin_inscripcion: Fin_inscripcion,
              id_categoria: Category,
              descripcion: Description,
            })
            console.log(editResult.data);
            setConfirmation("Se ha actualizado el torneo correctamente")
        } catch (error) {
            setConfirmation("Ha ocurrido un error")
            alert(error.message);
        }
    }
}
  return (
    <div className="main_addCancha_container">
        <h3 style={{marginTop:"2rem"}}>Agregar nuevo Torneo</h3>
        <div className="Addform_container">
            <form onSubmit={EditTorneo} className="form_add_canchas">
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
                <div className="name_input_container">
                    <label htmlFor="description">Descripcion</label>
                    <textarea value={Description} type="text" id="description" onChange={(e)=>setDescription(e.target.value)} rows="5" required/>
                </div>
                <p style={{fontSize:"14px"}}>{Confirmation}</p>
                <div className="btn_addCancha_container">
                    <button type="submit">Agregar</button>
                </div>
            </form>
        </div>
    </div>
  )
}
