import React, { useState, useEffect } from 'react'
import './AddUser.css'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function AddUser() {

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
    const [Categoria, setCategoria] = useState(0)

    const [Confirmation, setConfirmation] = useState("")

    useEffect(() => {
      //console.log(Role);
    }, [Role])
    
    const AddNewUser = async (e) =>{
        e.preventDefault();
        if(Sexo==="empty" || Role==="empty"){
            setConfirmation("Complete todos los campos")
        }else{
            setConfirmation("Agregando Usuario")
            try {
                /* const result = await axios.post('http://localhost:4000/api/addUser',
                {
                    username: User.toLowerCase(),
                    password: Contrasena,
                    nombres: Nombres,
                    apellidos: Apellidos,
                    cedula: Cedula,
                    accion: Accion,
                    fecha_nacimiento: FNacimiento,
                    correo_electronico: Correo,
                    sexo: Sexo,
                    role:Role,
                    categoria: Categoria
                }) */
                const result = await axios.post('http://localhost:4000/api/addUser',
                {
                    username: User.toLowerCase(),
                    password: Contrasena,
                    nombres: Nombres,
                    apellidos: Apellidos,
                    cedula: Cedula,
                    accion: Accion,
                    fecha_nacimiento: FNacimiento,
                    correo_electronico: Correo,
                    sexo: Sexo,
                    role:Role,
                    categoria: Categoria
                })
                if(result.data.loggedIn === false){
                    alert("El usuario ya pertence a otra persona")
                    setConfirmation("No se ha podido realizar el registro")
                }else{
                    setConfirmation("Se ha agregado el usuario correctamente")
                }
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                alert(error.message);
            }
        }  
    }

  return (
    <div className="main_addUser_container">
        <h3>Agregar nuevo usuario</h3>
        <div className="Add_userform_container">
            <form onSubmit={AddNewUser} className="form_add_users">
                <div className="left_right_side_container">
                <div className="left_side_container">
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Nombres</label>
                        <input type="text" id="name" onChange={(e)=>setNombres(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Usuario</label>
                        <input type="text" id="name" onChange={(e)=>setUser(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Correo</label>
                        <input type="email" id="name" onChange={(e)=>setCorreo(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Cedula</label>
                        <input type="text" id="name" onChange={(e)=>setCedula(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="sexo">Sexo</label>
                        <select id="sexo" onChange={(e)=>setSexo(e.target.value)} required>
                            <option value="empty">----Seleccione una opcion----</option>
                            <option value="0">Masculino</option>
                            <option value="1">Femenino</option>
                        </select>
                    </div>
                </div>
                <div className="right_side_container">
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Apellidos</label>
                        <input type="text" id="name" onChange={(e)=>setApellidos(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Contrasena</label>
                        <input type="text" id="name" onChange={(e)=>setContrasena(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Accion</label>
                        <input type="text" id="name" onChange={(e)=>setAccion(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Fecha de nacimiento</label>
                        <input type="date" id="name" onChange={(e)=>setFNacimiento(e.target.value)} required/>
                    </div>

                    <div className="name_input_container">
                        <label htmlFor="sexo">Categoria</label>
                        <select id="sexo" onChange={(e)=>setCategoria(e.target.value)} required>
                            <option value="empty">----Seleccione una opcion----</option>
                            <option value="1">Primera</option>
                            <option value="2">Segunda</option>
                            <option value="3">Tercera</option>
                            <option value="4">Cuarta</option>
                            <option value="5">Quinta</option>
                            <option value="6">Sexta</option>
                        </select>
                    </div>

                    <div className="name_input_container">
                        <label htmlFor="sexo">Rol</label>
                        <select id="sexo" onChange={(e)=>setRole(e.target.value)} required>
                            <option value="empty">----Seleccione una opcion----</option>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Usuario Regular</option>
                        </select>
                    </div>
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
