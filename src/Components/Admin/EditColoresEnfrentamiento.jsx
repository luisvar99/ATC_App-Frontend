import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Select from 'react-select';
import './EditColoresEnfrentamiento.css'

export default function EditColoresEnfrentamiento() {

    const [CanchasTennis, setCanchasTennis] = useState([])
    const [Rondas, setRondas] = useState([])
    const [ColoresParejasDropdown, setColoresParejasDropdown] = useState([])
    const [Horarios, setHorarios] = useState([])

    const [Pareja_one_name_one, setPareja_one_name_one] = useState("")
    const [Pareja_one_name_two, setPareja_one_name_two] = useState("")
    const [Pareja_two_name_one, setPareja_two_name_one] = useState("")
    const [Pareja_two_name_two, setPareja_two_name_two] = useState("")

    const [Id_pareja_one, setId_pareja_one] = useState(0)
    const [Id_pareja_two, setId_pareja_two] = useState(0)
    const [Fecha, setFecha] = useState(new Date().toLocaleDateString("EN-US"))
    const [Resultado, setResultado] = useState("")
    const [IdRonda, setIdRonda] = useState(0)
    const [IdHorario, setIdHorario] = useState(0)
    const [IdCancha, setIdCancha] = useState(0)
    
    const [NombreCancha, setNombreCancha] = useState("")
    const [NombreRonda, setNombreRonda] = useState("")
    const [InicioHorario, setInicioHorario] = useState("")

    const [Confirmation, setConfirmation] = useState("")

    const [IsLoadingColoresParejasDropdown, setIsLoadingColoresParejasDropdown] = useState(false)

    const params = useParams();

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '2px solid #F8F8F8',
          color: state.isSelected ? 'black' : 'black',
          backgroundColor: state.isSelected ? 'white' : 'white',
          width: "100%",
          fontSize: "0.9rem",
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "2%",
          fontSize: "0.9rem",
        })
      }


    const GetColoresMatchById = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetColoresMatchById/${params.id}/${params.id_partido}`);
            setId_pareja_one(result.data[0].id_pareja)
            setId_pareja_two(result.data[2].id_pareja)
            setFecha(result.data[0].fecha)
            setResultado(result.data[0].resultado)
            setIdRonda(result.data[0].id_ronda)
            setIdHorario(result.data[0].id_horario)
            setIdCancha(result.data[0].id_cancha)
            setPareja_one_name_one(result.data[0].nombres + " " + (result.data[0].apellidos))
            setPareja_one_name_two(result.data[1].nombres + " " + (result.data[1].apellidos))
            setPareja_two_name_one(result.data[2].nombres + " " + (result.data[2].apellidos))
            setPareja_two_name_two(result.data[3].nombres + " " + (result.data[3].apellidos))
            setNombreCancha(result.data[0].nombre_cancha)
            setInicioHorario(result.data[0].inicio)
            setNombreRonda(result.data[0].nombre)
            //console.log("GetColoresMatchById: " + JSON.stringify(result.data[0]));
            //console.log("Pareja 1: " + result.data[0].nombres + " " + (result.data[0].apellidos));
        } catch (error) {
            alert(error.message)
        }
    }

    const GetAllTennisCanchas = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getAllTennisCanchas');
            setCanchasTennis(result.data);
            //console.log("result.data.tennis: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }

    const GetColoresParejasDropdown = async () => {
        setIsLoadingColoresParejasDropdown(true)
        try { 
            const arr = [];
          //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
          const result = await axios.get(`http://localhost:4000/api/GetColoresParejasMoreInfo/${params.id}`)
          //console.log("result.data " + JSON.stringify(result.data));
          let response = result.data;
          response.map((user, index) => {
          return arr.push({label: user.id_pareja + ' - ' + user.nombres + ' ' + user.apellidos, id_pareja: user.id_pareja});
        });
          setColoresParejasDropdown(arr)
          setIsLoadingColoresParejasDropdown(false)
        } catch (error) {
          alert(error.message)
        }
      }

      const GetHorarios = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            setHorarios(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
        } catch (error) {
            
        }
      }

      const GetRondas = async () =>{
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getRondas`)
            setRondas(result.data);
            //console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

      const EditColoresMatch = async (e) =>{
        e.preventDefault();
            setConfirmation("Actualizando Torneo...")
            try {
                //const editResult = await axios.put(`https://atcbackend.herokuapp.com/api/editTorneo/${params.idTorneo}`,
                const editResult = await axios.put(`http://localhost:4000/api/editTorneo/${params.id}`,
                {
                  Id_pareja_one: Id_pareja_one,
                  Id_pareja_two: Id_pareja_two,
                  fecha: Fecha,
                  resultado: Resultado,
                  id_ronda: IdRonda,
                  id_horario: IdHorario,
                  id_cancha: IdCancha,
                })
                setConfirmation("Se ha actualizado el torneo correctamente")
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
    }

    useEffect(() => {
        GetColoresMatchById();
        GetRondas();
        GetColoresParejasDropdown();
        GetHorarios()
        GetAllTennisCanchas();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return (
    <div>
        <div className="createColoresMatchContainer">
                <div className="createColoresMatchFormContainer">
                    <div className="coloresMatchFormTitle">
                        <div className='goToColoresMatches'>
                            <Link to="enfrentamientos">Ver Enfrentamientos</Link>
                        </div>
                    </div>
                    <form className="createColoresMatchForm" onSubmit={EditColoresMatch}>
                        <h3 style={{ margin:"0", textAlign:"center" }}>Editar Enfrentamiento</h3>
                        <div className="coloresmatchrightleftside">

                        
                            <div className='parejas_dropdown_container'>
                                <p style={{margin:"0"}}>Pareja 1</p>

                                {
                                    (Pareja_one_name_one!=="" && Id_pareja_two!==0) &&
                                    <Select 
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.id_pareja));
                                        setId_pareja_one(item.id_pareja);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                    defaultValue = {{label: Id_pareja_one + ' - ' + Pareja_one_name_one}}
                                    /> 
                                }
                                <p style={{margin:"0.3rem 0"}}>Pareja 2</p>
                                {
                                    (Pareja_two_name_two!=="" && Id_pareja_two!==0) &&
                                    <Select 
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.id_pareja));
                                        setId_pareja_one(item.id_pareja);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                    defaultValue = {{label: Id_pareja_two + ' - ' + Pareja_two_name_one}}
                                    /> 
                                }
                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchDate">Fecha</label>
                                    <input value={moment(Fecha).format('YYYY-MM-DD')} type="date" id="matchDate" onChange={(e)=>setFecha(e.target.value)} required/>
                                </div>

                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchCancha">Cancha</label>
                                    <select value={NombreCancha} type="number" id="matchCancha" onChange={(e)=>setIdCancha(e.target.value)} required>
                                        {
                                            CanchasTennis.map((can, index)=>(
                                                <option key={index} value={can.id_cancha}>{can.nombre_cancha}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="coloresMatchRightSide">
                                <div className="coloresMatchRonda">
                                <label htmlFor="cantPersonas">Horario</label>
                                <select value={InicioHorario} type="number" id="cantPersonas" onChange={(e)=>setIdHorario(e.target.value)} required>
                                        {
                                            Horarios.map((h, index)=>(
                                                <option key={index} value={h.id_horario}>{h.hora_inicio}</option>
                                            ))
                                        }
                                </select>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="ColoresMatchRonda">Ronda</label>
                                    <select value={NombreRonda} id="ColoresMatchRondaInput" className='ColoresMatchRondaInput' onChange={(e)=>setIdRonda(e.target.value)} required>
                                        {
                                            Rondas.map((rond, index)=>(
                                                <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchResult">Resultado</label>
                                    <input value={Resultado} type="Text" id="matchResult" />
                                </div>
                            </div>
                        </div>
                        <div className='btnCreateColoresMatchContainer'>
                            <button type="submit">Crear</button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}
