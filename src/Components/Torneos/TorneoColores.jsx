import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import './TorneoColores.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


export default function TorneoColores() {

  const [Users, setUsers] = useState([])
  const [ParejaId, setParejaId] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false);

  const [IsCreatingInscripcion, setIsCreatingInscripcion] = useState(false)

  const params = useParams();

    const [ColoresParticipantes, setColoresParticipantes] = useState([])
    const [ColoresEquipos, setColoresEquipos] = useState([])
    const [IdEquipo, setIdEquipo] = useState(0)

    /* const getColoresParejas = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresParejas/${params.id}`);
            setColoresParejas(result.data);
            console.log("getColoresParejas: " + JSON.stringify(result.data));
        }catch (error) {
          alert(error.message)
        }
    } */

    const getColoresParticipantes = async ()=> {
      try {
          const result = await axios.get(`http://localhost:4000/api/getColoresParticipantes/${params.id}`);
          console.log("getColoresParticipantes: " + JSON.stringify(result.data));
          setColoresParticipantes(result.data);
      }catch (error) {
          alert(error.message)
      }
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  
  
/*   const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '2px solid #F8F8F8',
      color: state.isSelected ? 'black' : 'black',
      backgroundColor: state.isSelected ? 'white' : 'white',
      width: "100%"
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "0%",
    })
  } */

/*   const GetUsers = async () => {
    try { 
        const arr = [];
      //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
      const result = await axios.get(`http://localhost:4000/api/getAllUsers`)
      //console.log("result.data " + JSON.stringify(result.data));
      let response = result.data;
      response.map((user) => {
      return arr.push({label: user.accion + ' - ' + user.nombres + ' ' + user.apellidos, user_id: user.id});
    });
      setUsers(arr)
    } catch (error) {
      alert(error.message)
    }
  } */

  const MakeColoresInscripcion = async (e) => {
    const valid_inscripcion = ColoresParticipantes.find(p => p.id===parseInt(sessionStorage.getItem("userId")))
    e.preventDefault()
    if(valid_inscripcion!== undefined) {
      alert("Usted ya se encuentran inscritos en el torneo");
    }else{
      setIsCreatingInscripcion(true)
      try { 
        //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
        const result = await axios.post(`http://localhost:4000/api/MakeColoresInscripcion`,
        {
          id_torneo: params.id,
          user_id: sessionStorage.getItem("userId")
        })
        if(result.data.success===true){
          setIsCreatingInscripcion(false)
          setIsOpen(true)
        }else{
          setIsCreatingInscripcion(false)
        }
      } catch (error) {
        alert(error.message)
        setIsCreatingInscripcion(false)
      }
    }

  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #838080'
    },
  };
  
  useEffect(() => {
    /* getColoresParejas(); */
    getColoresParticipantes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="TorneoColoresMainContainer">
      <div className="TorneoColoresSubContainer">
          <div className="inscripcionColoresFormContainer">
          <Modal
            open={modalIsOpen}
            /* onAfterOpen={afterOpenModal} */
            onClose={closeModal}
            style={customStyles}
            /* contentLabel="Example Modal" */
          >
            <h2>Su inscripcion se ha realizado correctamente</h2>
            <div className="modal_container">
              <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
              <button onClick={closeModal}>Aceptar</button>
            </div>
          </Modal>

            <form className="inscripcionColoresForm" onSubmit={MakeColoresInscripcion}>
              {/* <p>Seleccione una pareja</p>
              <Select 
              onChange={(item) => {
                console.log("Item: "+ JSON.stringify(item.user_id));
                setParejaId(item.user_id);
              }}
              options = {Users}
              styles = {customStyles}
              placeholder = "Buscar por nombre o accion"
              /> */}
              <div className="ColoresInscripcionBtnContainer">
                <button type="submit" className="ColoresInscripcionBtn">Inscribirme</button>
                { IsCreatingInscripcion && 
                        <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}
                    />}
              </div>
            </form>
            <div className="btnColoresNextEnfretamientos">
              <Link to="enfrentamientos" className='goToColoresEnfrentamientos'>Enfrentamientos</Link>
              <Link to={`/EquiposColores/${params.id}`} className='goToColoresEnfrentamientos'>Equipos</Link>
            </div>
          </div>
      </div>
      {/* <div className="coloresParticipantsContainer">

            {
                ColoresParejas.map((p, index)=>(
                    <div key={index} >
                        <div className="aux">
                            <GetColoresParejasMembers id_pareja={p.id_pareja} id_torneo={params.id} key={index} />
                        </div>
                </div>
                    ))
                }
      </div> */}
    </div>
  )
}
