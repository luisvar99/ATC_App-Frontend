import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
        <h2>Error 404</h2>
        <h4>Pagina no encontrada</h4>
        <Link to="/home">Volver al inicio</Link>
    </>
  )
}
