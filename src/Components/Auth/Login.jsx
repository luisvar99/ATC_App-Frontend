import React, { useState, useEffect } from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'

export default function Login() {

    const navigate = useNavigate();

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [IsLoading, setIsLoading] = useState(false)

    const HandleLogin = async(e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const logged = await axios.post('https://atcbackend.herokuapp.com/api/login',
            {
                username: Username,
                password: Password
            })
            setIsLoading(false)
            //console.log(logged.loggedIn.data);
            if(logged.data.loggedIn===true){
                sessionStorage.setItem('userId', logged.data.id)
                navigate("/home")
            }else{
                alert("Ha ocurrido un error")
            }
            //setConfirmation("Se ha agregado la cancha correctamente")
        } catch (error) {
            //setConfirmation("Ha ocurrido un error")
            alert(error.message);
        }
    }

  return (
    <div className="login_main_container">
        <div className="login_form_container">
            <form onSubmit={HandleLogin}>
                <div className="atc_logo_container">
                    <img src="https://http2.mlstatic.com/D_NQ_NP_663732-MLV45985217656_052021-C.jpg" alt="" />
                </div>
                <div className="userName_container">
                    <FontAwesomeIcon icon={faUser} size="lg" className="usernameIcon"/>
                    <input type="text" id="username" placeholder='Usuario' onChange={(e)=>setUsername(e.target.value)} required/>
                </div>
                <div className="password_container">
                    <FontAwesomeIcon icon={faKey} size="lg" className="passwordIcon"/>
                    <input type="password" id="password" placeholder='Contrasena' onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <button className="btn_login" type="submit">Iniciar sesion</button>
            </form>
            {IsLoading && <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
            />
                }
            <Link to="dashboard" className="forgot_password_link">He olvidado mi contraseña</Link>
            <Link to="/admin" className="forgot_password_link">Admin Panel</Link>
            <Link to="/signup" className="forgot_password_link">Crear una cuenta</Link>
            
        </div>
    </div>
  )
}
