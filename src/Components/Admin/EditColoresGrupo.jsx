import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import './EditColoresEquipos.css'
import './EditColoresGrupo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'react-responsive-modal';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function EditColoresGrupo() {

    const [NombreGrupo, setNombreGrupo] = useState("")
    const [IsCreatingGrupo, setIsCreatingGrupo] = useState(false)
    const [IsLoadingGrupo, setIsLoadingGrupo] = useState(false)

    const [modalIsOpen, setIsOpen] = useState(false);


    const params = useParams();

    const getColoresGrupoById = async ()=> {
        setIsLoadingGrupo(true)
        try {
            //const result = await axios.get(`http://localhost:4000/api/getColoresGrupoById/${params.id_bombo}`);
            const result = await axios.get(`http://localhost:4000/api/getColoresGrupoById/${params.id_bombo}`);
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
            const result = await axios.put(`http://localhost:4000/api/UpdateColoresGrupo/${params.id_bombo}`,
            {
                id_torneo: params.id,
                nombre_bombo: NombreGrupo
            });
            if(result.data.success===true){
                setIsOpen(true)
                setIsCreatingGrupo(false)
            }else{
                alert("Ha ocurrido un error guardando los cambios")
                setIsCreatingGrupo(false)
            }
        }catch (error) {
            alert("Ha ocurrido un error guardando los cambios")
            setIsCreatingGrupo(false)
        }
    }
    
    
    function closeModal() {
        setIsOpen(false);
        window.location.reload()
    }

    useEffect(() => {
      getColoresGrupoById();
    }, [])
    

  return (
    <div className='UpdateGruposColoresFormContainer'>
        <Modal
        open={modalIsOpen}
        onClose={closeModal}
        center
    >
        <h2>Se ha actualizado el grupo exitosamente</h2>
        <div className="modal_container">
        <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
        <button onClick={closeModal}>Aceptar</button>
        </div>

    </Modal>
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
