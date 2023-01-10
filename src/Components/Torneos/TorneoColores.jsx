import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import './TorneoColores.css'
import GetColoresParejasMembers from './GetColoresParejasMembers'



export default function TorneoColores() {

  const [Users, setUsers] = useState([])
  const [ParejaId, setParejaId] = useState(0)

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

useEffect(() => {
  /* getColoresParejas(); */
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


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
    const valid_inscripcion = ColoresParticipantes.find(p => p.id_user_one===parseInt(sessionStorage.getItem("userId")))
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
        console.log(result.data)
        setIsCreatingInscripcion(false)
        window.location.reload();
      } catch (error) {
        alert(error.message)
        setIsCreatingInscripcion(false)
      }
    }

  }
  

  return (
    <div className="TorneoColoresMainContainer">
      <div className="TorneoColoresSubContainer">
          <div className="inscripcionColoresFormContainer">
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
                <button type="submit" className="ColoresInscripcionBtn">Completar Inscripcion</button>
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
          </div>
        <div className="btnColoresNextEnfretamientos">
          <Link to="enfrentamientos" className='goToColoresEnfrentamientos'>Enfrentamientos</Link>
          <Link to={`/EquiposColores/${params.id}`} className='goToColoresEnfrentamientos'>Equipos</Link>
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
