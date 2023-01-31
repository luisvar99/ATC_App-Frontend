import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import './EditColoresEquipos.css'
import './EditColoresGrupo.css'

export default function EditColoresGrupo() {

    const [NombreGrupo, setNombreGrupo] = useState("")
    const [IsCreatingGrupo, setIsCreatingGrupo] = useState(false)
    const [IsLoadingGrupo, setIsLoadingGrupo] = useState(false)

    const params = useParams();

    const getColoresGrupoById = async ()=> {
        setIsLoadingGrupo(true)
        try {
            //const result = await axios.get(`http://localhost:4000/api/getColoresGrupoById/${params.id_bombo}`);
            const result = await axios.get(`https://atcapp-backend-production.up.railway.app/api/getColoresGrupoById/${params.id_bombo}`);
            setNombreGrupo(result.data[0].nombre_bombo);
            setIsLoadingGrupo(false)
        }catch (error) {
            setIsLoadingGrupo(false)
            alert(error.message)
        }
    }

    const UpdateGrupo = async (e)=> {
        e.preventDefault();
        setIsCreatingGrupo(true)
        try {
            const result = await axios.put(`https://atcapp-backend-production.up.railway.app/api/UpdateColoresGrupo/${params.id_bombo}`,
            {
                id_torneo: params.id,
                nombre_bombo: NombreGrupo
            });
            /* const result = await axios.put(`http://localhost:4000/api/UpdateColoresGrupo/${params.id_bombo}`,
            {
                id_torneo: params.id,
                nombre_bombo: NombreGrupo
            }); */
            setIsCreatingGrupo(false)
            window.location.reload()
        }catch (error) {
            alert(error.message)
            setIsCreatingGrupo(false)
        }
    }
    useEffect(() => {
      getColoresGrupoById();
    }, [])
    

  return (
    <div className='UpdateGruposColoresFormContainer'>
                {
                    IsLoadingGrupo ? 
                    <RotatingLines
                            strokeColor="green"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="35"
                            visible={true}
                    />  
                    :
                    <form className="UpdateGrupoColoresForm" onSubmit={UpdateGrupo}>
                    <div className="nombre_bombo_container">
                        <label htmlFor="nombre_bombo">Nombre del Grupo</label>
                        <input value={NombreGrupo} type="text" id="nombre_bombo" onChange={(e)=> setNombreGrupo(e.target.value)} required/>
                    </div>
                    <div className="btnCreateGrupoColores">
                        <button>Guardar Cambios</button>
                        { IsCreatingGrupo && 
                            <RotatingLines
                            strokeColor="green"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="35"
                            visible={true}
                        />}
                    </div>
                </form>}
            </div>
  )
}
