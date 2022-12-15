import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import './TorneoColores.css'


export default function TorneoColores() {

  const [Users, setUsers] = useState([])
  const [ParejaId, setParejaId] = useState(0)

  const [IsCreatingInscripcion, setIsCreatingInscripcion] = useState(false)

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
      marginTop: "0%",
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
      return arr.push({label: user.accion + ' - ' + user.nombres + ' ' + user.apellidos, user_id: user.id});
    });
      setUsers(arr)
    } catch (error) {
      alert(error.message)
    }
  }

  const MakeInscripcion = async (e) => {
    e.preventDefault()
    setIsCreatingInscripcion(true)
    try { 
      //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
      const result = await axios.post(`http://localhost:4000/api/getAllUsers`)
      console.log(result.data)
      setIsCreatingInscripcion(false)
    } catch (error) {
      alert(error.message)
    }
  }
        
  useEffect(() => {
    GetUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

  return (
    <div className="TorneoColoresMainContainer">
      <div className="TorneoColoresSubContainer">
          <div className="inscripcionColoresFormContainer">
            <form className="inscripcionColoresForm" onSubmit={MakeInscripcion}>
              <p>Seleccionar una pareja</p>
              <Select 
              /* value={Users} */
              onChange={(item) => {
                console.log("Item: "+ JSON.stringify(item.user_id));
                setParejaId(item.user_id);
              }}
              options = {Users}
              styles = {customStyles}
              placeholder = "Buscar por nombre o accion"
              />
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
      </div>
    </div>
  )
}
