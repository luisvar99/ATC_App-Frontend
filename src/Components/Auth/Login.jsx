import React, { useState } from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'

export default function Login() {
    axios.defaults.withCredentials = true

    const navigate = useNavigate();

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [IsLoading, setIsLoading] = useState(false)


    const HandleLogin = async(e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const logged = await axios.post('http://localhost:4000/api/login',
            {
                username: Username,
                password: Password
            })
            setIsLoading(false)
            //console.log(logged.loggedIn.data);
            if(logged.data.loggedIn===true){
                sessionStorage.setItem('userId', logged.data.id)
                sessionStorage.setItem('userRole', logged.data.role)
                console.log("ROLE DESDE LOGIN " + sessionStorage.getItem('userRole'));
                if(sessionStorage.getItem('userRole')==="ADMIN"){
                    navigate("/admin")
                }else{
                    navigate("/home")
                }
            }else if(logged.data.badUsername===true){
                alert("El usuario es incorrecto");
            }else if(logged.data.wrongPassword===true){
                alert("La contrasena es incorrecta")
            }else{
                alert("Ha ocurrido un error")
                setIsLoading(false)
            }
            //setConfirmation("Se ha agregado la cancha correctamente")
        } catch (error) {
            //setConfirmation("Ha ocurrido un error")
            alert(error.message);
            setIsLoading(false)
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
            <Link to="/resetPassword" className="forgot_password_link">He olvidado mi contraseña</Link>
            <Link to="" className="forgot_password_link">FALTA MOSTRAR BOMBOS CON EQUIPOS COLORES A LOS USARIOS REGULARES: FILTRARLOS POR ISPUBLICADO</Link>
            <Link to="" className="forgot_password_link">TERMINAR EDIT_COLORES_ENFRETAMIENTOS</Link>
            
        </div>
    </div>
  )
}
