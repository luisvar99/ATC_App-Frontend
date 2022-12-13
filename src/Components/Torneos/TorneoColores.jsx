import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import './TorneoColores.css'


export default function TorneoColores() {

  const [Users, setUsers] = useState([])
  const [ParejaId, setParejaId] = useState(0)

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
      return arr.push({label: user.accion + ' - ' + user.nombres + ' ' + user.apellidos, user_id: user.id});
    });
      setUsers(arr)
    } catch (error) {
      
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
            <form className="inscripcionColoresForm">
              <label htmlFor="pareja"></label>
              <Select 
              /* value={Users} */
              onChange={(item) => {
                console.log("Item: "+ JSON.stringify(item.user_id));
                setParejaId(item.user_id);
              }}
              options = {Users}
              styles = {customStyles}
              placeholder = "Seleccione un jugador"
              />
            </form>
          </div>
      </div>
    </div>
  )
}
