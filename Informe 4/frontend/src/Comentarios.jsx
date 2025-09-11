import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from './config'
import './Comentarios.css'

function Comentarios() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [comentarios, setComentarios] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const fetchComentarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/comentarios/${id}`)
      setComentarios(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchComentarios()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setExito('')

    if (!mensaje.trim()) {
      setError('Escribe un mensaje')
      return
    }

    try {
      await axios.post(`${API_URL}/comentarios`, {
        id_publicacion: id,
        id_usuario: usuario.id_usuario,
        mensaje
      })
      setExito('Comentario agregado correctamente')
      setMensaje('')
      fetchComentarios()
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Error al agregar comentario')
    }
  }

  return (
    <div className="comentarios-page">
      <header className="header-comentarios">
        <h2>Comentarios de la Publicación</h2>
        <button className="boton-regresar" onClick={() => navigate('/inicio')}>
          Regresar
        </button>
      </header>

      <main className="contenido-comentarios">
        {comentarios.length === 0 && <p>No hay comentarios aún.</p>}
        {comentarios.map(c => (
          <div key={c.id_comentario} className="comentario-card">
            <div className="comentario-header">
              <span className="usuario">{c.nombres} {c.apellidos}</span>
              <span className="fecha">{new Date(c.fecha_creacion).toLocaleString()}</span>
            </div>
            <div className="mensaje">{c.mensaje}</div>
          </div>
        ))}

        <form className="form-comentario" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          {exito && <p className="exito">{exito}</p>}
          <textarea
            placeholder="Escribe un comentario..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button type="submit">Agregar Comentario</button>
        </form>
      </main>
    </div>
  )
}

export default Comentarios
