import React, { useState, useEffect } from 'react'
import './TennisReservationForm.css'
import Select from 'react-select';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'


export default function TennisReservationForm() {

    const [Users, setUsers] = useState([])
    const [UserOne, setUserOne] = useState(0)
    const [UserTwo, setUserTwo] = useState(0)
    const [IsDobles, setIsDobles] = useState(false)
    const [HorarioInicio, setHorarioInicio] = useState("")
    const [HorarioFin, setHorarioFin] = useState("")
    const [CanchaName, setCanchaName] = useState("")
    const [IsLoadingReservation, setIsLoadingReservation] = useState(false)
    const [Descripcion, setDescripcion] = useState("")
    const navigate = useNavigate();
    const params = useParams();

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '2px solid #F8F8F8',
          color: state.isSelected ? 'black' : 'black',
          backgroundColor: state.isSelected ? 'white' : 'white',
          width: "100%"
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "5%",
        })
      }

      const GetUsers = async () => {
        try { 
            const arr = [];
          //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
          const result = await axios.get(`http://localhost:4000/api/getAllUsers`)
          //console.log("result.data " + JSON.stringify(result.data));
          let response = result.data;
          response.map((user) => {
          return arr.push({label: user.username, user_id: user.id});
        });
          setUsers(arr)
        } catch (error) {
          
        }
      }
      const GetHorarioDetails = async () => {
        try { 
           
          //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
          const result = await axios.get(`http://localhost:4000/api/getSingleHorario/${params.idHorario}`)
          console.log("result.data " + JSON.stringify(result.data));
          setHorarioInicio(result.data[0].inicio);
          setHorarioFin(result.data[0].fin);
          
        } catch (error) {
          
        }
      }
      const GetCanchaName = async () => {
        try { 
           
          //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
          const result = await axios.get(`http://localhost:4000/api/getSingleCancha/${params.idCancha}`)
          //console.log("result.data " + JSON.stringify(result.data));
          setCanchaName(result.data[0].nombre_cancha);
          
        } catch (error) {
          
        }
      }
      const CreateReservation = async (e) => {
        e.preventDefault();
        console.log("Creando Reservacion");
        setIsLoadingReservation(true)
        try { 
          //const result = await axios.post(`https://atcbackend.herokuapp.com/api/createReservation`)
          const result = await axios.post(`http://localhost:4000/api/createReservation`,{
            idCancha: params.idCancha,
            idHorario: params.idHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: params.ano+'/'+params.mes+'/'+params.dia,
            id_inv_uno: UserOne,
            id_inv_dos: UserTwo,
            descripcion: Descripcion
          })
          setIsLoadingReservation(false)
          console.log("CreateReservation-> " + JSON.stringify(result.data));
          navigate(-1)
        } catch (error) {
          
        }
      }
      
      useEffect(() => {
        GetHorarioDetails();
        GetUsers();
        GetCanchaName();
        //console.log("Users" + JSON.stringify(Users) );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <div className="make_reservation_main_container">
        <div className="make_reservation_second_main_container">
            <div className="make_reservation_form_container">
              <h3>Nueva reservacion</h3>
                <div className="make_reservation_form">
                  <form onSubmit={CreateReservation}>
                      <div className='modalidad_reservation'>
                        <button className='btn_make_reservation' type="submit">Crear</button>
                        {IsLoadingReservation && <RotatingLines
                          strokeColor="green"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="30"
                          visible={true}
                        />
                        }
                        <p></p>
                        {
                          parseInt(params.categoriaCancha)===0 &&
                          <>
                            <input type="radio" id="modalidad" value="single" name="modalidad" onChange={()=> setIsDobles(false)} required/>
                            <label htmlFor="singles">Singles</label>
                            <br />
                          
                            <input type="radio" id="modalidad" value="dobles" name="modalidad" onChange={()=> setIsDobles(true)} required/>
                            <label htmlFor="dobles">Dobles</label> 
                            <br />
                            <br />
                          </>
                        }
                        
                      <div className="horasReserva">
                        <label htmlFor="horaInicio">Hora Inicio</label>
                        <input type="text" id="horaInicio" value={HorarioInicio} onChange={()=> setIsDobles(true)} readOnly/>
                        <label htmlFor="horaFin">Hora Fin</label>
                        <input type="text" id="horaFin" value={HorarioFin} onChange={()=> setIsDobles(true)} readOnly/>

                      </div>
                        
                      </div>
                    <div className="select_container">
                      <p>Participantes</p>
                      <Select 
                          /* value={Users} */
                          onChange={(item) => {
                            console.log("Item: "+ JSON.stringify(item.user_id));
                            setUserOne(item.user_id);
                          }}
                          options = {Users}
                          styles = {customStyles}
                          placeholder = "Seleccione un jugador"
                          required = {true}
                        />
                      {
                        IsDobles &&
                        <>
                          <Select 
                          /* value={Users} */
                          onChange={(item) => {
                            console.log("Item: "+ JSON.stringify(item.user_id));
                            setUserTwo(item.user_id);
                          }}
                          options = {Users}
                          styles = {customStyles}
                          placeholder = "Seleccione un jugador"
                          />
                        
                          </>
                      }
                      <p className="nombreCancha">{CanchaName}</p>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}
