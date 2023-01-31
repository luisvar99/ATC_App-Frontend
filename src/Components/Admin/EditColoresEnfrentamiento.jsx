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

    const [Player_one_name, setPlayer_one_name] = useState("")
    const [Player_two_name, setPlayer_two_name] = useState("")
    const [Player_three_name, setPlayer_three_name] = useState("")
    const [Player_four_name, setPlayer_four_name] = useState("")

    const [Id_player_one, setId_player_one] = useState(0)
    const [Id_player_two, setId_player_two] = useState(0)
    const [Id_player_three, setId_player_three] = useState(0)
    const [Id_player_four, setId_player_four] = useState(0)
    const [Fecha, setFecha] = useState(new Date().toLocaleDateString("EN-US"))
    const [Resultado, setResultado] = useState("")
    const [IdRonda, setIdRonda] = useState(0)
    const [IdHorario, setIdHorario] = useState(0)
    const [IdCancha, setIdCancha] = useState(0)
    
    const [NombreCancha, setNombreCancha] = useState()
    const [NombreRonda, setNombreRonda] = useState()
    const [InicioHorario, setInicioHorario] = useState()

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
          maxWidth: "100%",
        })
      }


    const GetColoresMatchById = async () => {
        try {
            //const result = await axios.get(`http://localhost:4000/api/GetColoresMatchById/${params.id}/${params.id_partido}`);
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetColoresMatchById/${params.id}/${params.id_partido}`);
            setPlayer_one_name(result.data[0].nombres + ' ' + result.data[0].apellidos)
            setPlayer_two_name(result.data[1].nombres + ' ' + result.data[1].apellidos)
            setPlayer_three_name(result.data[2].nombres + ' ' + result.data[2].apellidos)
            setPlayer_four_name(result.data[3].nombres + ' ' + result.data[3].apellidos)
            setFecha(result.data[0].fecha)
            setResultado(result.data[0].resultado)
            setIdRonda(result.data[0].id_ronda)
            setIdHorario(result.data[0].id_horario)
            setIdCancha(result.data[0].id_cancha)
            setNombreCancha(result.data[0].nombre_cancha)
            setInicioHorario(result.data[0].inicio)
            setNombreRonda(result.data[0].nombre)
            console.log("GetColoresMatchById: " + JSON.stringify(result.data[0]));
            //console.log("Pareja 1: " + result.data[0].nombres + " " + (result.data[0].apellidos));
        } catch (error) {
            alert(error.message)
        }
    }

    const GetAllTennisCanchas = async () => {
        try {
            //const result = await axios.get('http://localhost:4000/api/getAllTennisCanchas');
            const result = await axios.get('https://atcapp-backend-production.up.railway.app/api/getAllTennisCanchas');
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
          //const result = await axios.get(`http://localhost:4000/api/GetColoresParticipantesMoreInfo/${params.id}`)
          const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetColoresParticipantesMoreInfo/${params.id}`)
          //console.log("result.data " + JSON.stringify(result.data));
          let response = result.data;
          response.map((user, index) => {
          return arr.push({label: user.accion + ' - ' + user.nombres + ' ' + user.apellidos + ` (${user.nombre_equipo})`, userId: user.id});
        });
          setColoresParejasDropdown(arr)
          setIsLoadingColoresParejasDropdown(false)
        } catch (error) {
          alert(error.message)
        }
      }

      const GetHorarios = async () =>{
        try {
            //const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/GetAllHorarios`)
            setHorarios(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
        } catch (error) {
            
        }
      }

      const GetRondas = async () =>{
        try {
            //const result = await axios.get(`http://localhost:4000/api/getRondas`)
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/getRondas`)
            setRondas(result.data);
            //console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

      const EditColoresMatch = async (e) =>{
        e.preventDefault();
            setConfirmation("Actualizando Enfrentamiento...")
            try {
                /* const editResult = await axios.put(`http://localhost:4000/api/editColoresMatch/${params.id_partido}`,
                {
                  id_player_one: Id_player_one,
                  id_player_two: Id_player_two,
                  id_player_three: Id_player_three,
                  id_player_four: Id_player_four,
                  fecha: Fecha,
                  resultado: Resultado,
                  id_ronda: IdRonda,
                  id_horario: IdHorario,
                  id_cancha: IdCancha,
                }) */
                const editResult = await axios.put(`https://atcapp-backend-production.up.railway.app/api/editColoresMatch/${params.id_partido}`,
                {
                  id_player_one: Id_player_one,
                  id_player_two: Id_player_two,
                  id_player_three: Id_player_three,
                  id_player_four: Id_player_four,
                  fecha: Fecha,
                  resultado: Resultado,
                  id_ronda: IdRonda,
                  id_horario: IdHorario,
                  id_cancha: IdCancha,
                })
                if(editResult.data.success===true){
                    setConfirmation("Se ha actualizado el Enfrentamiento correctamente")
                }else{
                    setConfirmation("Ha ocurrido un error actualizando el enfrentamiento")
                }
                /* window.location.reload(); */
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
        <div className="EditColoresMatchContainer">
                <div className="EditColoresMatchFormContainer">

                    <form className="editColoresMatchForm" onSubmit={EditColoresMatch}>
                        <h3 style={{ margin:"0", textAlign:"center" }}>Editar Enfrentamiento</h3>
                        <div className="coloresEditmatchrightleftside">

                        
                            <div className='parejas_dropdown_container_edit_enfrentamientos'>
                                <p style={{margin:"0"}}>Jugador 1</p>

                                {
                                    (Player_one_name!=="") &&
                                    <Select 
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.userId));
                                        setId_player_one(item.userId);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                    defaultValue = {{label: Player_one_name}}
                                    /> 
                                }
                                <p style={{margin:"0.3rem 0"}}>Jugador 2</p>
                                {
                                    (Player_two_name!=="") &&
                                    <Select 
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.userId));
                                        setId_player_two(item.userId);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                    defaultValue = {{label: Player_two_name}}
                                    /> 
                                }
                                <p style={{margin:"0.3rem 0"}}>Jugador 3</p>
                                {
                                    (Player_two_name!=="") &&
                                    <Select 
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.userId));
                                        setId_player_three(item.userId);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                    defaultValue = {{label: Player_three_name}}
                                    /> 
                                }
                                <p style={{margin:"0.3rem 0"}}>Jugador 4</p>
                                {
                                    (Player_three_name!=="") &&
                                    <Select 
                                    onChange={(item) => {
                                        console.log("id_pareja: "+ JSON.stringify(item.userId));
                                        setId_player_four(item.userId);
                                    }}
                                    options = {ColoresParejasDropdown}
                                    styles = {customStyles}
                                    placeholder = {IsLoadingColoresParejasDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                                    defaultValue = {{label: Player_four_name}}
                                    /> 
                                }
                                
                            </div>
                            <div className="coloresMatchRightSide">

                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchDate">Fecha</label>
                                    <input value={moment(Fecha).format('YYYY-MM-DD')} type="date" id="matchDate" onChange={(e)=>setFecha(e.target.value)} required/>
                                </div>

                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchCancha">Cancha</label>
                                    <select value={IdCancha} type="number" id="matchCancha" onChange={(e)=>setIdCancha(e.target.value)} required>
                                        {
                                            CanchasTennis.map((can, index)=>(
                                                <option key={index} value={can.id_cancha}>{can.nombre_cancha}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="coloresMatchRonda">
                                <label htmlFor="cantPersonas">Horario</label>
                                <select value={IdHorario} type="number" id="cantPersonas" onChange={(e)=>setIdHorario(e.target.value)} required>
                                        {
                                            Horarios.map((h, index)=>(
                                                <option key={index} value={h.id_horario}>{h.hora_inicio}</option>
                                            ))
                                        }
                                </select>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="ColoresMatchRonda">Ronda</label>
                                    <select value={IdRonda} id="ColoresMatchRonda" className='ColoresMatchRondaInput' onChange={(e)=>setIdRonda(e.target.value)} required>
                                        {
                                            Rondas.map((rond, index)=>(
                                                <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="coloresMatchRonda">
                                    <label htmlFor="matchResult">Resultado</label>
                                    <input value={Resultado} type="Text" id="matchResult" onChange={(e)=>setResultado(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className='btnCreateColoresMatchContainer'>
                            <button type="submit">Guardar Cambios</button>
                        </div>
                        <p>{Confirmation}</p>
                    </form>
                </div>
            </div>
    </div>
  )
}
