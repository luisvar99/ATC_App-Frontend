import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
import axios from 'axios'
import './Home.css'


export default function Home() {

  const [CurrentColores, setCurrentColores] = useState([])

  const getCurrentTorneoColores = async ()=> {
    try {
        const result = await axios.get('http://localhost:4000/api/getTorneoColores');
        setCurrentColores(result.data);
        console.log("result.data: " + JSON.stringify(result.data));
    }catch (error) {
    alert(error.message)

    }
}

useEffect(() => {
  getCurrentTorneoColores();
},[])

  return (
    <div className="main_admin_dashboard_container">
        <div className="options_container">
          <div className="atc_admin_logo_container">
            <img src="https://http2.mlstatic.com/D_NQ_NP_663732-MLV45985217656_052021-C.jpg" alt="" />
          </div>
          <Link className="optionsLinksHome" to='/Reservaciones'>Reservaciones</Link>
          <Link className="optionsLinksHome" to='/torneos'>Torneos Regulares</Link>
          <Link className="optionsLinksHome" to={`/torneoColores/${CurrentColores.id_torneo}`}>Torneo Colores</Link>
        </div>
    </div>
  )
}
