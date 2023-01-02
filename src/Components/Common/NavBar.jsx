import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'



export default function NavBar() {

  
  const [CurrentColores, setCurrentColores] = useState([])

  const navigate = useNavigate();

  const getCurrentTorneoColores = async ()=> {
    try {
        const result = await axios.get('http://localhost:4000/api/getTorneoColores');
        setCurrentColores(result.data);
        //console.log("result.data: " + JSON.stringify(result.data));
    }catch (error) {
    alert(error.message)

    }
}

useEffect(() => {
  getCurrentTorneoColores();
  //console.log(sessionStorage.getItem('userRole'));
},[])

  const Logout = () => {
    sessionStorage.setItem("userId", "null");
    sessionStorage.setItem("userRole", "null");
    navigate("/");
  }
  
  return (
    <div className='navbar'>
      <div>
        <Link to="/home">Inicio</Link>

        { sessionStorage.getItem('userId')!=="null" &&
          <Link to={`/Profile/${sessionStorage.getItem('userId')}`}>Mi Cuenta</Link>
        }

        { sessionStorage.getItem('userRole')==="ADMIN" &&
          
          <Link to="/admin">Admin Panel</Link>
        
        }
        <div className="dropdown">
          <button className="dropbtn">Juegos 
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
              <Link to="/Reservaciones">Reservas</Link>
              <Link to="/torneos">Torneos Regulares</Link>
              <Link to={`/torneoColores/${CurrentColores.id_torneo}`}>Torneo Colores</Link>
          </div>
        </div> 
      </div>
      { sessionStorage.getItem('userId')!=="null" &&
        <div className="logout_btn_container">
          <button className="logout_btn" onClick={Logout}>Cerrar Sesión</button>
        </div>
      }
    </div>
  )
}
