import React, { useState, useEffect, useContext } from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'


export default function SignUp() {

    const navigate = useNavigate();

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [IsLoading, setIsLoading] = useState(false)

    const HandleSignUp = async(e) => {
        e.preventDefault();
        try {
            const logged = await axios.post('https://localhost:4000/api/signup',
            {
                username: Username,
                password: Password
            })
            console.log(logged.data);
            if(logged.data.loggedIn===true){
                sessionStorage.setItem('userId', logged.data.id)
                navigate("/home")
            }else{
                alert("El usuario ya pertenece a una persona")
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
            <form onSubmit={HandleSignUp}>
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
                <button className="btn_login" type="submit">Crear cuenta</button>
                {IsLoading && <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
                />
                }
            </form>
        </div>
    </div>
  )
}
