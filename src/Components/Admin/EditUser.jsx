import React, { useState, useEffect } from 'react'
import './AddUser.css'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import moment from 'moment'
import { RotatingLines } from  'react-loader-spinner'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function EditUser() {
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
    const [IsUpdatingUser, setIsUpdatingUser] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    

    const params = useParams();


    const GetUserById = async () => {
        try{
            const result = await axios.get(`http://localhost:4000/api/GetUserById/${params.user_id}`)
            //const result = await axios.get(`http://localhost:4000/api/GetUserById/${params.user_id}`)
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
            setCategoria(result.data[0].categoria)
        }catch(error){
            alert("GetUserById: " + error.message);
        }
    }
    
    const EditUsers = async (e) =>{
        e.preventDefault();
        if(Sexo==="empty" || Role==="empty"){
            setConfirmation("Complete todos los campos")
        }else{
            try {
                setIsUpdatingUser(true)
                const result = await axios.put(`http://localhost:4000/api/EditUsers/${params.user_id}`,
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
                /* const result = await axios.put(`http://localhost:4000/api/EditUsers/${params.user_id}`,
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
                if(result.data.loggedIn === false){
                    alert("El usuario ya pertence a otra persona")
                    setConfirmation("No se ha podido realizar el registro")
                }else{
                    if(result.data.success===true){
                        setIsUpdatingUser(false)
                    }
                    setIsOpen(true)
                    setIsUpdatingUser(false)
                }
            } catch (error) {
                setConfirmation("Ha ocurrido un error")
                setIsUpdatingUser(false)
                alert(error.message);
            }
        }  
    }
    function closeModal() {
        setIsOpen(false);
      }
    
    useEffect(() => {
        GetUserById();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

  return (
    <div className="main_addUser_container">
        <h3>Editar Usuario</h3>
        <div className="Add_userform_container">
        <Modal
            open={modalIsOpen}
            onClose={closeModal}
            center
          >
            <h2>El usuario ha sido actualizado exitosamente</h2>
            <div className="modal_container">
              <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
              <button onClick={closeModal}>Aceptar</button>
            </div>

          </Modal>
            <form onSubmit={EditUsers} className="form_add_users">
                <div className="left_right_side_container">
                <div className="left_side_container">
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Nombres</label>
                        <input value={Nombres} type="text" id="name" onChange={(e)=>setNombres(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Usuario</label>
                        <input disabled value={User} type="text" id="name" onChange={(e)=>setUser(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Correo</label>
                        <input value={Correo} type="email" id="name" onChange={(e)=>setCorreo(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Cedula</label>
                        <input value={Cedula} type="text" id="name" onChange={(e)=>setCedula(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="sexo">Sexo</label>
                        <select value={Sexo} id="sexo" onChange={(e)=>setSexo(e.target.value)} required>
                            <option value="0">Masculino</option>
                            <option value="1">Femenino</option>
                        </select>
                    </div>
                </div>
                <div className="right_side_container">
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Apellidos</label>
                        <input value={Apellidos} type="text" id="name" onChange={(e)=>setApellidos(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Contrasena</label>
                        <input /* value={Contrasena} */ type="text" id="name" onChange={(e)=>setContrasena(e.target.value)}/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Accion</label>
                        <input value={Accion} type="text" id="name" onChange={(e)=>setAccion(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="nameCancha">Fecha de nacimiento</label>
                        <input value={moment(FNacimiento).format('YYYY-MM-DD')} type="date" id="name" onChange={(e)=>setFNacimiento(e.target.value)} required/>
                    </div>
                    <div className="name_input_container">
                        <label htmlFor="sexo">Categoria</label>
                        <select value={Categoria} id="sexo" onChange={(e)=>setCategoria(e.target.value)} required>
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
                        <select value={Role} id="sexo" onChange={(e)=>setRole(e.target.value)} required>
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Usuario Regular</option>
                        </select>
                    </div>
                    <p style={{fontSize:"14px"}}>{Confirmation}</p>
                </div>
            </div>

                <div className="btn_addCancha_container">
                {IsUpdatingUser && 
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="35"
                        visible={true}
                        />
                }
                    <button type="submit">Guardar Cambios</button>
                    <Link to="/admin/manageUsuarios" className="link_go_back">Volver</Link>
                </div>

            </form>
        </div>
    </div>
  )
}
