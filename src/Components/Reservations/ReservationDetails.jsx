import React, { useState, useEffect } from 'react'
//import './TennisReservationForm.css'
import Select from 'react-select';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'


export default function ReservationDetails() {
    const [Users, setUsers] = useState([])
    const [ReservationDetails, setReservationDetails] = useState([])
    const [UserOne, setUserOne] = useState(0)
    const [UserTwo, setUserTwo] = useState(0)
    const [IsDobles, setIsDobles] = useState(false)
    const [HorarioInicio, setHorarioInicio] = useState("")
    const [HorarioFin, setHorarioFin] = useState("")
    const [CanchaName, setCanchaName] = useState("")
    const [IdSocio, setIdSocio] = useState(0)
    const [InvitadoUno, setInvitadoUno] = useState("")
    const [InvitadoDos, setInvitadoDos] = useState("")
    
    const [IsLoadingReservation, setIsLoadingReservation] = useState(false)

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

      const GetReservationDetails = async () => {

        try { 
          //const result = await axios.post(`https://atcbackend.herokuapp.com/api/createReservation`)
          const result = await axios.get(`http://localhost:4000/api/getReservaDetails/${params.idReserva}`)
          setReservationDetails(result.data)
          setUserOne(result.data[0].invitados)
          setUserTwo(result.data[1].invitados)
          setHorarioInicio(result.data[0].inicio)
          setHorarioFin(result.data[0].fin)
          setCanchaName(result.data[0].cancha)
          setIdSocio(result.data[0].id_socio)
          setInvitadoUno(result.data[0].invitados)
          setInvitadoDos(result.data[1].invitados)
          console.log(result.data[0].invitados);
          console.log(result.data[1].invitados);
          console.log("Reservation Found: " + JSON.stringify(result.data));
          
        }catch (error) {

        }
    }
      

      const UpdateReservation = async () => {

        try { 
          //const result = await axios.post(`https://atcbackend.herokuapp.com/api/createReservation`)
          const result = await axios.put(`http://localhost:4000/api/updateReservation/${params.idReservation}`,{
            idCancha: params.idCancha,
            idHorario: params.idHorario,
            idSocio: sessionStorage.getItem('userId'),
            fecha: new Date().toLocaleDateString('en-US'),
            id_inv_uno: UserOne,
            id_inv_dos: UserTwo
          })
          console.log("CreateReservation-> " + JSON.stringify(result.data));
          navigate(`/Reservaciones/tennis/idCancha=${params.idCancha}`)
        } catch (error) {
          
        }
      }
      
      useEffect(() => {
        GetReservationDetails();
        GetUsers();
        //console.log("Users" + JSON.stringify(Users) );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <div className="make_reservation_main_container">
        <div className="make_reservation_second_main_container">
            <div className="make_reservation_form_container">
              <h3>Nueva reservacion</h3>
                <div className="make_reservation_form">
                  <form onSubmit={UpdateReservation}>
                      <div className='modalidad_reservation'>
                        
                        
                        <p>Modalidad</p>
                        <input type="radio" id="modalidad" value="single" name="modalidad" onChange={()=> setIsDobles(false)} required/>
                        <label htmlFor="singles">Singles</label>
                        <br />
                        
                        <input type="radio" id="modalidad" value="dobles" name="modalidad" onChange={()=> setIsDobles(true)} required/>
                        <label htmlFor="dobles">Dobles</label>
                        <br />
                        <br />
                      <div className="horasReserva">
                        <label htmlFor="horaInicio">Hora Inicio</label>
                        <input type="text" id="horaInicio" value={HorarioInicio} readOnly/>
                        <label htmlFor="horaFin">Hora Fin</label>
                        <input type="text" id="horaFin" value={HorarioFin} readOnly/>

                      </div>
                      {IsLoadingReservation && <RotatingLines
                          strokeColor="green"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="30"
                          visible={true}
                        />
                        }

                      { 
                        parseInt(IdSocio) === parseInt(sessionStorage.getItem('userId')) &&
                        <>
                          <button className='btn_make_reservation' type="submit">Actualizar</button>
                          <button className='btn_make_reservation' type="submit">Eliminar</button>
                        </>
                      }
                      </div>
                    <div className="select_container">
                      <p>Participantes</p>
                      {
                        InvitadoUno!="" &&
                        <Select 
                          /* value={Users} */
                          onChange={(item) => {
                            console.log("Item: "+ JSON.stringify(item.user_id));
                            setUserOne(item.user_id);
                          }}
                          options = {Users}
                          styles = {customStyles}
                          placeholder = "Seleccione un jugador"
                          defaultValue={{label: InvitadoUno}}
                        />}
                      {
                        (ReservationDetails.length>2 || IsDobles) &&
                        <>
                          <Select 
                          /* value={Users} */
                          onChange={(item) => {
                            console.log("Item: "+ JSON.stringify(item.user_id));
                            
                          }}
                          options = {Users}
                          styles = {customStyles}
                          placeholder = "Seleccione un jugador"
                          defaultValue = {{label:InvitadoDos }}
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
