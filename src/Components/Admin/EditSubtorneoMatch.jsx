import React, { useState, useEffect } from 'react'
import './SubtorneoMatches.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'
import { RotatingLines } from  'react-loader-spinner'
import moment from 'moment'
import Select from 'react-select';

export default function EditSubtorneoMatch() {

    const [GroupsMembers, setGroupsMembers] = useState([])
    const [Id_player_uno, setId_player_uno] = useState(0)
    const [Id_player_dos, setId_player_dos] = useState(0)
    const [Id_player_tres, setId_player_tres] = useState(0)
    const [Id_player_cuatro, setId_player_cuatro] = useState(0)
    const [Fecha, setFecha] = useState(new Date().toLocaleDateString("EN-US"))
    const [IDHorario, setIDHorario] = useState(0)
    const [Resultado, setResultado] = useState("")
    const [Rondas, setRondas] = useState([])
    const [Horarios, setHorarios] = useState([])
    const [Canchas, setCanchas] = useState([])

    const [IDCancha, setIDCancha] = useState(0)
    const [IdRonda, setIdRonda] = useState(0)

    const [IsLoadingMatches, setIsLoadingMatches] = useState(false)
    const [IsAddingMatch, setIsAddingMatch] = useState(false)

    const [Player_one_name, setPlayer_one_name] = useState("")
    const [Player_two_name, setPlayer_two_name] = useState("")
    const [Player_three_name, setPlayer_three_name] = useState("")
    const [Player_four_name, setPlayer_four_name] = useState("")
    /* const [NombreCancha, setNombreCancha] = useState("")
    const [Player_four_name, setPlayer_four_name] = useState("") */

    const [SelectDropdown, setSelectDropdown] = useState([])
    const [IsLoadingSelectDropdown, setIsLoadingSelectDropdown] = useState(false)


    const params = useParams();

    const GetSubtorneoMatchById = async () =>{
        try {
            //setIsAddingMatch(true)
            //const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatchesById/${params.id_partido}`)
            const result = await axios.get(`http://localhost:4000/api/GetSubtorneoMatchesById/${params.id_partido}`)
            console.log("GetSubtorneoMatchById: " + JSON.stringify(result.data));
            setPlayer_one_name(result.data[0].nombres + " " + result.data[0].apellidos)
            setPlayer_two_name(result.data[1].nombres + " " + result.data[1].apellidos)
            setPlayer_three_name(result.data[2] === undefined ? "" : result.data[2].nombres + " " + result.data[2].apellidos)
            setPlayer_four_name(result.data[3] === undefined ? "" : result.data[3].nombres + " " + result.data[3].apellidos)
            setId_player_uno(result.data[0].id)
            setId_player_dos(result.data[1].id)
            setId_player_tres(result.data[2] === undefined ? 0 : result.data[2].id)
            setId_player_cuatro(result.data[3] === undefined ? 0 : result.data[3].id)
            setIDCancha(result.data[0].id_cancha)
            setIDHorario(result.data[0].id_horario)
            setFecha(result.data[0].fecha)
            setIdRonda(result.data[0].id_ronda)
            //setIsAddingMatch(false)
        } catch (error) {
            alert(error.message)
        }
      }

    const GetGruposMembers = async () =>{
        try {
            //setIsAddingMatch(true)
            //const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.id_subtorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.id_subtorneo}`)
            setGroupsMembers(result.data);
            //console.log("GroupsMembers: " + JSON.stringify(result.data));
            //setIsAddingMatch(false)
        } catch (error) {
            alert(error.message)
        }
      }

    const GetRondas = async () =>{
        try {
            setIsLoadingMatches(true)
            //const result = await axios.get(`http://localhost:4000/api/getRondas`)
            const result = await axios.get(`http://localhost:4000/api/getRondas`)
            setRondas(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            alert(error.message)
        }
      }
    const GetHorarios = async () =>{
        try {
            setIsLoadingMatches(true)
            //const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            const result = await axios.get(`http://localhost:4000/api/GetAllHorarios`)
            setHorarios(result.data);
            //console.log("GetSubtorneoMatches: " + JSON.stringify(result.data));
            setIsLoadingMatches(false)
        } catch (error) {
            alert(error.message)
        }
      }

      const GetAllCanchas = async () => {
        try {
            //const result = await axios.get('http://localhost:4000/api/getAllCanchas');
            const result = await axios.get('http://localhost:4000/api/getAllCanchas');
            setCanchas(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
    }
    
    const UpdateSubtorneoMatch = async (e) =>{
        e.preventDefault()
        try {
            setIsAddingMatch(true)
            const result = await axios.put(`http://localhost:4000/api/UpdateSubtorneoMatch/${params.id_partido}`, {
                idSubtorneo: params.idSubtorneo,
                id_player_uno: Id_player_uno,
                id_player_dos: Id_player_dos,
                id_player_tres: Id_player_tres,
                id_player_cuatro: Id_player_cuatro,
                resultado: Resultado,
                fecha: Fecha,
                hora: IDHorario,
                ronda: IdRonda,
                id_cancha: IDCancha
            })
            /* const result = await axios.put(`http://localhost:4000/api/UpdateSubtorneoMatch/${params.id_partido}`, {
                idSubtorneo: params.idSubtorneo,
                id_player_uno: Id_player_uno,
                id_player_dos: Id_player_dos,
                id_player_tres: Id_player_tres,
                id_player_cuatro: Id_player_cuatro,
                resultado: Resultado,
                fecha: Fecha,
                hora: IDHorario,
                ronda: IdRonda,
                id_cancha: IDCancha
            }) */
            setIsAddingMatch(false)
            
            if(result.data.success===true){
                await CreateReservation();
                window.location.reload();
            }else{
                alert("Ha ocurrido un error creando el enfrentamiento")  
            }
        } catch (error) {
            setIsAddingMatch(false)
            alert(error.message)
        }
      }

      const CreateReservation = async (e) => {
        alert("Creando Reservacion");
        try { 
          const result = await axios.post(`http://localhost:4000/api/createReservation`,{
            idCancha: IDCancha,
            idHorario: IDHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: Fecha,
            id_inv_uno: Id_player_uno,
            id_inv_dos: Id_player_dos,
            descripcion: "Torneo Regular"
          })
          /* const result = await axios.post(`http://localhost:4000/api/createReservation`,{
            idCancha: IDCancha,
            idHorario: IDHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: Fecha,
            id_inv_uno: Id_player_uno,
            id_inv_dos: Id_player_dos,
            descripcion: "Torneo Regular"
          }) */
          console.log("CreateReservation-> " + JSON.stringify(result.data));
        } catch (error) {
          alert(error.message)
        }
      }

      const GetSelectDropdown = async () => {
        setIsLoadingSelectDropdown(true)
        try { 
            const arr = [];
          //const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.id_subtorneo}`)
          const result = await axios.get(`http://localhost:4000/api/getGruposMembers/${params.id_subtorneo}`)
          //console.log("result.data " + JSON.stringify(result.data));
          let response = result.data;
          response.map((user, index) => {
          return arr.push({label: user.id_pareja + ' - ' + user.nombres + ' ' + user.apellidos , userId: user.id});
        });
          setSelectDropdown(arr)
          setIsLoadingSelectDropdown(false)
        } catch (error) {
          alert(error.message)
        }
      }

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

    useEffect(() => {
        GetGruposMembers();
        GetRondas();
        GetHorarios();
        GetAllCanchas();
        GetSubtorneoMatchById();
        GetSelectDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div className="addMatch_form_container" style={{marginLeft:"2rem", marginTop:"1.5rem"}}>
    <h3>Editar enfrentamiento</h3>
    <form onSubmit={UpdateSubtorneoMatch} className="form_add_matches" >
        <div className="add_matches_left_right_side">
        
        <div className="add_matches_left_side">
            <div className="inputs_container">
                <label htmlFor="cantPersonas">Jugador No. 1</label>
                {
                    (Player_one_name!== "") &&

                    <Select 
                    onChange={(item) => {
                        console.log("Id_player_uno: "+ JSON.stringify(item.userId));
                        setId_player_uno(item.userId);
                    }}
                    options = {SelectDropdown}
                    styles = {customStyles}
                    placeholder = {IsLoadingSelectDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                    defaultValue = {{label: Player_one_name}}
                    />} 
            </div>

            <div className="inputs_container">
                <label htmlFor="cantPersonas">Jugador No.2 </label>
                {
                    (Player_two_name!== "") &&

                    <Select 
                    onChange={(item) => {
                        console.log("Id_player_dos: "+ JSON.stringify(item.userId));
                        setId_player_dos(item.userId);
                    }}
                    options = {SelectDropdown}
                    styles = {customStyles}
                    placeholder = {IsLoadingSelectDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                    defaultValue = {{label: Player_two_name}}
                    />} 
            </div>

            {
                (Player_three_name!=="" || Player_four_name!=="") &&
                <>
                    <div className="inputs_container">
                    <label htmlFor="cantPersonas">Jugador No.3 </label>
                    {
                    (Player_three_name!== "") &&

                    <Select 
                    onChange={(item) => {
                        console.log("Id_player_tres: "+ JSON.stringify(item.userId));
                        setId_player_tres(item.userId);
                    }}
                    options = {SelectDropdown}
                    styles = {customStyles}
                    placeholder = {IsLoadingSelectDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                    defaultValue = {{label: Player_three_name}}
                    />} 
                </div>

                <div className="inputs_container">
                    <label htmlFor="cantPersonas">Jugador No.4</label>
                    {
                    (Player_four_name!== "") &&

                    <Select 
                    onChange={(item) => {
                        console.log("Id_player_cuatro: "+ JSON.stringify(item.userId));
                        setId_player_cuatro(item.userId);
                    }}
                    options = {SelectDropdown}
                    styles = {customStyles}
                    placeholder = {IsLoadingSelectDropdown ? "Cargando usuarios..." : "Buscar por nombre"}
                    defaultValue = {{label: Player_four_name}}
                    />} 
                </div>
            </>
            }
            
        </div>

        <div className="add_matches_right_side">
        <div className="inputs_container">
                <label htmlFor="cantPersonas">Cancha</label>
                <select value={IDCancha} id="cantPersonas" onChange={(e)=>setIDCancha(e.target.value)} required>
                    <option value="">-----Seleccione una opcion-----</option>
                    {
                        Canchas.map((can, index)=>(
                            <option key={index} value={can.id_cancha}>{can.nombre_cancha}</option>
                        ))
                    }
                </select>
            </div>
            
            <div className="inputs_container">
                <label htmlFor="cantPersonas">Fecha</label>
                <input value={moment(Fecha).format('YYYY-MM-DD')} type="date" id="cantPersonas" onChange={(e)=>setFecha(e.target.value)} required/>
            </div>
            <div className="inputs_container">
                <label htmlFor="cantPersonas">Horario</label>
                <select value={IDHorario} id="cantPersonas" onChange={(e)=>setIDHorario(e.target.value)} required>
                <option value="">-----Seleccione una opcion-----</option>
                    {
                        Horarios.map((h, index)=>(
                            <option key={index} value={h.id_horario}>{h.hora_inicio}</option>
                        ))
                    }
                </select>
            </div>
            <div className="inputs_container">
                <label htmlFor="cantPersonas">Ronda</label>
                <select value={IdRonda} type="number" id="cantPersonas" onChange={(e)=>setIdRonda(e.target.value)} required>
                <option value="">-----Seleccione una opcion-----</option>
                    {
                        Rondas.map((rond, index)=>(
                            <option key={index} value={rond.id_ronda}>{rond.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div className="inputs_container">
                <label htmlFor="cantPersonas">Resultado</label>
                <input type="text" id="cantPersonas" onChange={(e)=>setResultado(e.target.value)}/>
            </div>
        </div>
        </div>


        <div className="btn_addCancha_container">
            <button type="submit">Guardar cambios</button>
            {IsAddingMatch &&
            <>
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="35"
                    visible={true}/>
            </>}
        </div>
    </form>
</div>
  )
}
