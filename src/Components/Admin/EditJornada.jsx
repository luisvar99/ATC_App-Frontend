import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ManageJornadas.css'
import './EditJornada.css'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import {Link} from 'react-router-dom'


export default function EditJornada() {

    const [Equipo_uno, setEquipo_uno] = useState("")
    const [Equipo_dos, setEquipo_dos] = useState("")
    const [RondaJornada, setRondaJornada] = useState(0)
    const [FechaJornada, setFechaJornada] = useState(new Date().toLocaleDateString("EN-US"))
    const [ColoresEquipos, setColoresEquipos] = useState([])


    const [IsCreatingJornada, setIsCreatingJornada] = useState(false)

    const params = useParams();

    const [Rondas, setRondas] = useState([])
    const [DateOptions, setDateOptions] = useState({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const GetJornadaByID = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetJornadaByID/${params.id_jornada}`)
            console.log("GetJornadas: " + result.data);
            setEquipo_uno(result.data[0].equipo_uno)
            setEquipo_dos(result.data[0].equipo_dos)
            setFechaJornada(result.data[0].fecha)
            setRondaJornada(result.data[0].id_ronda)
        } catch (error) {
            alert(error.message)
        }
    }

    const EditColoresJornada = async (e)=> {
        e.preventDefault();
            setIsCreatingJornada(true)
            try {
                const result = await axios.put(`http://localhost:4000/api/UpdateJornada/${params.id_jornada}`,
                {
                    equipo_uno: Equipo_uno,
                    equipo_dos: Equipo_dos,
                    fecha: FechaJornada,
                    id_ronda: RondaJornada,
                });
                
                console.log("result.data: " + JSON.stringify(result.data));

                if(result.data.success===true){
                    setIsCreatingJornada(false)
                }else{
                    alert("Ha ocurrido un error creando la jornada")  
                    setIsCreatingJornada(false)
                }
            }catch (error) {
                alert(error.message)
                setIsCreatingJornada(false)
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

      const GetEquiposColores = async () => {
        
        try {
            const result = await axios.get(`http://localhost:4000/api/GetEquiposColores/${params.id}`);
            setColoresEquipos(result.data);
            //console.log("Pareja " + JSON.stringify(result.data));
        }catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        GetJornadaByID();
        GetRondas();
        GetEquiposColores()
    }, [])

    useEffect(() => {
        console.log(Equipo_dos);
        console.log(Equipo_uno);
    }, [Equipo_dos,Equipo_uno])
    
  return (
    <div className='editJornadaContainer'>
        <div className="EditJornadaSubContainer">
                    <form className="createColoresMatchForm" onSubmit={EditColoresJornada}>
                        <h3 style={{ margin:"0", textAlign:"center" }}>Jornadas</h3>
                        <div className="coloresmatchrightleftside">
                            <div className='parejas_dropdown_container'>
                                <label htmlFor="equipo" style={{margin:"0"}}>Equipo 1 {Equipo_uno}</label>
                                <div>
                                    <select value={Equipo_uno}  id="equipo" style={{marginBottom:"1rem", width:"100%"}} onChange={(e)=> setEquipo_uno(e.target.value)} required>
                                        {
                                            ColoresEquipos.map((eq, index)=>(
                                                <option key={index} value={eq.nombre_equipo}>{eq.nombre_equipo}</option>
                                            ))
                                        }
                                        <option value="1ero grupo A">1ero grupo A</option>
                                        <option value="1ero grupo B">1ero grupo B</option>
                                        <option value="2do grupo A">2do grupo A</option>
                                        <option value="2do grupo B">2do grupo B</option>
                                        <option value="Ganador S1">Ganador S1</option>
                                        <option value="Ganador S2">Ganador S2</option>
                                    </select>

                                </div>

                                <label htmlFor="equipo" style={{marginTop:"1rem"}}>Equipo 2</label>
                                <div>
                                    <select value={Equipo_dos} id="equipo" style={{width:"100%"}} onChange={(e)=> setEquipo_dos(e.target.value)} required>
                                    {
                                        ColoresEquipos.map((eq, index)=>(
                                            <option key={index} value={eq.nombre_equipo}>{eq.nombre_equipo}</option>
                                            
                                            ))
                                        }
                                        <option value="1ero grupo A">1ero grupo A</option>
                                        <option value="1ero grupo B">1ero grupo B</option>
                                        <option value="2do grupo A">2do grupo A</option>
                                        <option value="2do grupo B">2do grupo B</option>
                                        <option value="Ganador S1">Ganador S1</option>
                                        <option value="Ganador S2">Ganador S2</option>
                                    </select>
                                </div>
                               
                                
                            </div>
                            <div className="coloresMatchRightSide">
                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchDate">Fecha</label>
                                    <input value={moment(FechaJornada).format('YYYY-MM-DD')} type="date" id="matchDate" onChange={(e)=>setFechaJornada(e.target.value)} required/>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="ColoresMatchRonda">Ronda</label>
                                    <select value={RondaJornada} id="ColoresMatchRondaInput" className='ColoresMatchRondaInput' onChange={(e)=>setRondaJornada(e.target.value)} required>
                                        {
                                            Rondas.map((rond, index)=>(
                                                <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className='btnEditJornadaContainer'>
                            <button type="submit">Guardar Cambios</button>
                            {IsCreatingJornada &&

                                <RotatingLines
                                strokeColor="green"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="35"
                                visible={true}
                                />}
                        </div>
                    </form>
            </div>
    </div>
  )
}
