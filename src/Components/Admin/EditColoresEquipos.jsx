import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import './EditColoresEquipos.css'

export default function EditColoresEquipos() {

    const [ColoresGrupos, setColoresGrupos] = useState([])
    const [NombreColoresEquipo, setNombreColoresEquipo] = useState()
    const [ColorColoresEquipo, setColorColoresEquipo] = useState()
    const [GrupoColoresEquipo, setGrupoColoresEquipo] = useState()

    const [IsCreatingEquipo, setIsCreatingEquipo] = useState(false)

    const params = useParams();

    const getColoresGrupos = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/GetColoresGrupo/${params.id}`);
            setColoresGrupos(result.data);
            //console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }

    const getColoresEquipoById = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/api/getColoresEquipoById/${params.id}/${params.id_equipo}`);
            setNombreColoresEquipo(result.data[0].nombre_equipo);
            setColorColoresEquipo(result.data[0].color);
            setGrupoColoresEquipo(result.data[0].id_bombo);
            //console.log("result.data: " + JSON.stringify(result.data));
        }catch (error) {
        alert(error.message)
    
        }
    }

    const UpdateEquipo = async (e)=> {
        e.preventDefault();
        setIsCreatingEquipo(true)
        try {
            const result = await axios.put(`http://localhost:4000/api/UpdateColoresEquipo/${params.id}/${params.id_equipo}`,
            {
                nombre_equipo: NombreColoresEquipo,
                id_bombo: GrupoColoresEquipo,
                id_torneo: params.id,
                ispublicado:0,
                color: ColorColoresEquipo,
            });
            
            console.log("result.data: " + JSON.stringify(result.data));
            setIsCreatingEquipo(false)
            window.location.reload()
        }catch (error) {
            alert(error.message)
            setIsCreatingEquipo(false)
    
        }
    }

    useEffect(() => {
        getColoresEquipoById();
        getColoresGrupos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className='editEquiposColoresFormContainer'>
        <form className="EditEquipoColoresForm" onSubmit={UpdateEquipo}>
            <div className="nombre_bombo_container">
                <label htmlFor="nombre_bombo">Nombre del Equipo</label>
                <input value={NombreColoresEquipo} type="text" id="nombre_bombo" onChange={(e)=> setNombreColoresEquipo(e.target.value)} required/>
            </div>
            <br/>
            <div className="nombre_bombo_container">
                <label htmlFor="color_equipo">Color del Equipo</label>
                <input value={ColorColoresEquipo} type="color" id="color_equipo" onChange={(e)=> setColorColoresEquipo(e.target.value)} required/>
                <input value={`Codigo color: ${ColorColoresEquipo}`} type="text" id="color_equipo" disabled/>
            </div>
            <br />
            <div className="nombre_bombo_container">
                <label htmlFor="grupo_equipo">Grupo del Equipo</label>
                <select value={GrupoColoresEquipo} type="color" id="grupo_equipo" onChange={(e)=> setGrupoColoresEquipo(e.target.value)} required>
                    {
                        ColoresGrupos.map((grupo, index)=> (
                            <option key={index} value={grupo.id_bombo}>{grupo.nombre_bombo}</option>
                        ))
                    }
                </select>
            </div>
            <div className="btnCreateGrupoColores">
                <button>Guardar Cambios</button>
                { IsCreatingEquipo && 
                    <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="35"
                    visible={true}
                />}
            </div>
        </form>
    </div>
  )
}
