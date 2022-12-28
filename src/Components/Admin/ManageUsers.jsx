import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'
import { RotatingLines } from  'react-loader-spinner'
import './ManageUsers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function ManageUsers() {

    const [Users, setUsers] = useState([])
    const [Apellido, setApellido] = useState('')
    const [LoadingUsers, setLoadingUsers] = useState(false)

    const GetUsers = async () => {
        try { 
            setLoadingUsers(true)
            //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getAllUsers`)
            //console.log("result.data " + JSON.stringify(result.data));
            setUsers(result.data)

            setLoadingUsers(false)
        
        } catch (error){
            alert(error.message)
        }
        
      }
    const GetUsersByApellido = async () => {
        try { 
            setLoadingUsers(true)
            //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
            const result = await axios.get(`http://localhost:4000/api/getUsersByApellido/${Apellido.toLowerCase()}`)
            setUsers(result.data)

            setLoadingUsers(false)
        
        } catch (error){
            alert(error.message)
        }
        
      }

    const DeleteUser = async (id) => {
        try {
            //const result = await axios.post(`https://atcbackend.herokuapp.com/api/getSubtorneoGrupos/${params.idSubtorneo}`)
            const result = await axios.delete(`http://localhost:4000/api/deleteUser/${id}`)
            const filter = Users.filter(u => u.id !== id )
            //console.log(result.data);
            setUsers(filter);
            //console.log("Rondas: " + JSON.stringify(result.data));
        } catch (error) {
            alert(error.message)
        }
      }

    useEffect(() => {
    GetUsers();
    }, [])

      

  return (
    <div className='manage_users_main_container'>
        {
            LoadingUsers ?
            <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
                />
                :
        <div className='manage_users_second_container'>
            <>
            <h3>Listado de usuarios</h3>
            <Link to="/admin/addNewUser" className="add_user_btn" id="add_user_btn">Nuevo Usuario</Link>
            <form style={{marginTop:"2rem"}} onSubmit={GetUsersByApellido}>
                <input placeholder="Ingrese un apellido" type="text" className="search_users_by_name" onChange={(e)=>setApellido(e.target.value)} required/>
                <button className="search_users_by_nameBtn" type="submit">Buscar</button>
                <span className="cancel_btn" onClick={GetUsers}>Cancelar</span>
            </form>
            <div className='manage_users_table_container'>
                <table>
                    <thead>
                        <tr>
                            <td>Usuario</td>
                            <td>Nombres</td>
                            <td>Apellidos</td>
                            <td>Cedula</td>
                            <td>Nro Accion</td>
                            <td>Fecha de Nacimiento</td>
                            <td>Correo</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                Users.map((user, index) =>(
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.nombres}</td>
                                        <td>{user.apellidos}</td>
                                        <td>{user.cedula}</td>
                                        <td>{user.accion}</td>
                                        <td>{new Date(user.fecha_nacimiento).toLocaleDateString('es-MX')}</td>
                                        <td>{user.correo_electronico}</td>
                                        <td style={{padding: "10px 15px"}}><Link to={`editUser/${user.id}`}> <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{color: "#515151"}}/> </Link></td>
                                        <td style={{padding: "10px 15px"}}><FontAwesomeIcon icon={faTrash} size="2x" onClick={(e) => DeleteUser(user.id)} style={{cursor: "pointer", color: "#515151"}}/></td>                            
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>
            </>
        </div>
        }
    </div>
  )
}
