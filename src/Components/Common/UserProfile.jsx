import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import moment from 'moment'
import './UserProfile.css'

export default function UserProfile() {

    const [Nombres, setNombres] = useState("")
    const [Apellidos, setApellidos] = useState("")
    const [Correo, setCorreo] = useState("")
    const [Cedula, setCedula] = useState("")
    const [Accion, setAccion] = useState("")
    const [FNacimiento, setFNacimiento] = useState("")
    const [Sexo, setSexo] = useState("")
    const [Contrasena, setContrasena] = useState("")
    const [User, setUser] = useState("")
    const [Role, setRole] = useState("")

    const [Confirmation, setConfirmation] = useState("")

    const params = useParams();

    const GetUserById = async () => {
        try{
            const result = await axios.get(`http://localhost:4000/api/GetUserById/${params.user_id}`)
            console.log("GetUserById -> " + JSON.stringify(result.data));
            setNombres(result.data[0].nombres)
            setApellidos(result.data[0].apellidos)
            setCorreo(result.data[0].correo_electronico)
            setCedula(result.data[0].cedula)
            setAccion(result.data[0].accion)
            setFNacimiento(result.data[0].fecha_nacimiento)
            setSexo(result.data[0].sexo)
            setContrasena(result.data[0].passhash)
            setUser(result.data[0].username)
            setRole(result.data[0].rol)
        }catch(error){
            alert("GetUserById: " + error.message);
        }
    }
    
    const EditPassword = async (e) =>{
        e.preventDefault();
        if(Sexo==="empty" || Role==="empty"){
            setConfirmation("Complete todos los campos")
        }else{
            setConfirmation("Editando Usuario")
            try {
                const result = await axios.put(`http://localhost:4000/api/ChangePassword/${params.user_id}`,
                {
                    password: Contrasena,
                })
                if(result.data.loggedIn === false){
                    alert("Ha ocurrido un error")
                    setConfirmation("No se ha podido realizar el registro")
                }else{
                    setConfirmation("Se ha actualizado la contrasena correctamente")
                }
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
        }  
    }

    
    useEffect(() => {
        GetUserById();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

  return (
    <div className="main_addUser_container">
        <h3>Mis Datos Personales</h3>
        <div className="myProfile_container">
            <form onSubmit={EditPassword} className="form_myProfile">
                <div className="left_right_side_container">
                <div className="left_side_container">
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Nombres</label>
                        <input readOnly value={Nombres} type="text" id="name" onChange={(e)=>setNombres(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Usuario</label>
                        <input readOnly value={User} type="text" id="name" onChange={(e)=>setUser(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Correo</label>
                        <input readOnly value={Correo} type="email" id="name" onChange={(e)=>setCorreo(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Cedula</label>
                        <input readOnly value={Cedula} type="text" id="name" onChange={(e)=>setCedula(e.target.value)} required/>
                    </div>
{/*                     <div className="name_input_container">
                        <label htmlFor="sexo">Sexo</label>
                        <input readOnly value={Sexo} type="text" id="name" onChange={(e)=>setCedula(e.target.value)} required/>
                    </div> */}
                </div>
                <div className="right_side_container">
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Apellidos</label>
                        <input readOnly value={Apellidos} type="text" id="name" onChange={(e)=>setApellidos(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Contrasena</label>
                        <input type="text" id="" className='password' onChange={(e)=>setContrasena(e.target.value)} minlength="8" required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Accion</label>
                        <input readOnly value={Accion} type="text" id="name" onChange={(e)=>setAccion(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Fecha de nacimiento</label>
                        <input readOnly value={moment(FNacimiento).format('YYYY-MM-DD')} type="date" id="name" onChange={(e)=>setFNacimiento(e.target.value)} required/>
                    </div>
{/*                     <div className="name_input_container">
                        <label htmlFor="sexo">Rol</label>
                        <select value={Role} id="sexo" onChange={(e)=>setRole(e.target.value)} required>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Usuario Regular</option>
                        </select>
                    </div> */}
                    <p style={{fontSize:"14px"}}>{Confirmation}</p>
                </div>
            </div>

                <div className="btn_addCancha_container">
                    <button type="submit">Agregar</button>
                    <Link to="/admin/manageUsuarios" className="link_go_back">Volver</Link>
                </div>

            </form>
        </div>
    </div>
  )
}
