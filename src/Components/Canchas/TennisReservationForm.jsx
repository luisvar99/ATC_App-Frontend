import React, { useState, useEffect } from 'react'
import './TennisReservationForm.css'
import Select from 'react-select';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
/* import Modal from 'react-modal'; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


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

    const [modalIsOpen, setIsOpen] = useState(false);

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
          return arr.push({label: user.accion + ' ' + user.nombres + ' ' + user.apellidos, user_id: user.id});
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
        if(IsDobles===false && UserOne===0){
          alert("Debe seleccionar un participante")
        }else if(IsDobles===true && (UserOne===0 || UserTwo===0)){
          alert("Debe seleccionar dos participantes")
        }else{

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
            if(result.data.validReservation===false){
              alert("Usted ha excedido el limite de reservaciones el dia de hoy")
              setIsLoadingReservation(false)
            }else{
              setIsLoadingReservation(false)
              setIsOpen(true)
              console.log("CreateReservation-> " + JSON.stringify(result.data));
              
            }
          } catch (error) {
            setIsLoadingReservation(false)
            alert(error.message)
          }
        }
      }

      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
        navigate(-1)
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
                  <div className="modal_wrapper">
                    <Modal
                      open={modalIsOpen}
                      /* onAfterOpen={afterOpenModal} */
                      onClose={closeModal}
                      classNames={{
                        modal: 'customModal',
                      }}
                      center
                      /* className="Modal" */
                    >
                      <h3>Se ha realizado la reserva de forma correcta</h3>
                      <div className="modal_container">
                        <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
                        <button onClick={closeModal}>Aceptar</button>
                      </div>
                    </Modal>
                  </div>
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
