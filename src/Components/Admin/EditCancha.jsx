import React,{ useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

import { RotatingLines } from  'react-loader-spinner'
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function EditCancha() {

    const [Name, setName] = useState("")
    const [Category, setCategory] = useState("")
    const [Status, setStatus] = useState("")
    const [Confirmation, setConfirmation] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const [UpdatingCancha, setUpdatingCancha] = useState(false);

    const params = useParams();


      const GetCanchaById = async (e) =>{
            try {
                //const result = await axios.get(`http://localhost:4000/api/getSingleCancha/${params.idCancha}`)
                const result = await axios.get(`http://localhost:4000/api/getSingleCancha/${params.idCancha}`)
                setName(result.data[0].nombre_cancha)
                setCategory(result.data[0].id_categoriacancha)
                setStatus(result.data[0].estatus_cancha)
                
            } catch (error) {
                alert(error.message);
            }
        }
    
      
      const EditCancha = async (e) =>{
          e.preventDefault();
          if(Category==="" || Status===""){
              alert("Por favor, complete todos los campos")
          }else{
              try {
                setUpdatingCancha(true)
                  const result = await axios.put(`http://localhost:4000/api/editCancha/${params.idCancha}`,
                  {
                      nombre_cancha: Name,
                      id_categoriacancha: Category,
                      estatus_cancha: Status,
                  })
                  if(result.data.success===true){
                    setIsOpen(true)
                    setUpdatingCancha(false)
                  }else{
                    setUpdatingCancha(false)
                    setConfirmation("Ha ocurrido un error")
                  }
              } catch (error) {
                    setUpdatingCancha(false)
                    setConfirmation("Ha ocurrido un error")
                    alert(error.message);
              }
          }
      }

      function closeModal() {
        setIsOpen(false);
      }

      
    useEffect(() => {
        GetCanchaById();
      }, [])

  return (
    <div className="main_addCancha_container">
        <h3>Editar Cancha </h3>
        <Modal
            open={modalIsOpen}
            onClose={closeModal}
            center
          >
            <h2>La cancha ha sido actualizada exitosamente</h2>
            <div className="modal_container">
              <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{color: "#0D8641"}}/>
              <button onClick={closeModal}>Aceptar</button>
            </div>

          </Modal>
        <div className="Addform_container">
            <form onSubmit={EditCancha} className="form_add_canchas">
                <div className="name_input_container">
                    <label htmlFor="nameCancha">Nombre</label>
                    <input value={Name} type="text" id="name" onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="category_input_container">
                <label htmlFor="categoryCancha">Categoria</label>
                    <select value={Category} id="ecategoryCancha" className="" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">---Seleccione una Categoria---</option>
                        <option value="0">Tennis</option>
                        <option value="1">Padel</option>
                    </select>
                </div>
                <div className="status_input_container">
                    <label htmlFor="estatusCancha">Estatus</label>
                    <select value={Status} id="estatusCancha" className="" onChange={(e)=>setStatus(e.target.value)}>
                        <option value="">---Seleccione un Estatus---</option>
                        <option value="1">Abierta</option>
                        <option value="0">Cerrada</option>
                    </select>
                    <p style={{fontSize:"14px"}}>{Confirmation}</p>
                </div>
                <div className="btn_addCancha_container">
                {
                    UpdatingCancha &&

                    <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="35"
                    visible={true}
                    />
                }
                    <button type="submit">Actualizar</button>
                    <button type="submit"><Link to="/admin/manageCanchas" className="link_go_back">Volver</Link></button>
                </div>
            </form>
        </div>
    </div>
    
  )
}
