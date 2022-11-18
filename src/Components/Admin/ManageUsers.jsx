import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './EditSubtorneo.css'
import { RotatingLines } from  'react-loader-spinner'
import './ManageUsers.css'

export default function ManageUsers() {

    const [Users, setUsers] = useState([])
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
            <Link to="/admin/addNewUser" className="add_user_btn">Nuevo Usuario</Link>
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
                        </tr>
                    </thead>
                    <tbody>
                            {
                                Users.map((user, index) =>(
                                    <tr>
                                    <td key={index}>{user.username}</td>
                                    <td key={index}>{user.nombres}</td>
                                    <td key={index}>{user.apellidos}</td>
                                    <td key={index}>{user.cedula}</td>
                                    <td key={index}>{user.accion}</td>
                                    <td key={index}>{new Date(user.fecha_nacimiento).toLocaleDateString('es-MX')}</td>
                                    <td key={index}>{user.correo_electronico}</td>
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
