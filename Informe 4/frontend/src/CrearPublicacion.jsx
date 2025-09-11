import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from './config'
import { useNavigate } from 'react-router-dom'
import './CrearPublicacion.css';

function CrearPublicacion({ onNuevaPublicacion }) {
  const [tipo, setTipo] = useState('Profesor')
  const [profesores, setProfesores] = useState([])
  const [cursos, setCursos] = useState([])
  const [seleccion, setSeleccion] = useState('')
  const [contenido, setContenido] = useState('')
  const [mensajeError, setMensajeError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  useEffect(() => {
    axios.get(`${API_URL}/profesores`)
      .then(res => setProfesores(res.data))
      .catch(err => console.error(err))

    axios.get(`${API_URL}/cursos`)
      .then(res => setCursos(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensajeError('')
    setMensajeExito('')

    if (!seleccion || !contenido.trim()) {
      setMensajeError('Todos los campos son obligatorios')
      return
    }

    try {
      const data = {
        id_usuario: usuario.id_usuario,
        id_curso: tipo === 'Curso' ? seleccion : null,
        id_profesor: tipo === 'Profesor' ? seleccion : null,
        mensaje: contenido
      }

      await axios.post(`${API_URL}/publicaciones`, data)
      setMensajeExito('Publicación creada correctamente')
      setContenido('')
      setSeleccion('')
      onNuevaPublicacion() // actualizar PantallaInicial
    } catch (err) {
      console.error(err)
      setMensajeError(err.response?.data?.error || 'Error al crear publicación')
    }
  }

  const handleRegresar = () => {
    navigate('/inicio') // redirige a Pantalla Inicial
  }

  return (
    <div className="crear-publicacion">
      <h3>Crear Publicación</h3>
      {mensajeError && <p className="error">{mensajeError}</p>}
      {mensajeExito && <p className="exito">{mensajeExito}</p>}

      <form onSubmit={handleSubmit}>
        <label>Tipo:</label>
        <select value={tipo} onChange={e => { setTipo(e.target.value); setSeleccion('') }}>
          <option value="Profesor">Profesor</option>
          <option value="Curso">Curso</option>
        </select>

        {tipo === 'Profesor' && (
          <>
            <label>Profesor:</label>
            <select value={seleccion} onChange={e => setSeleccion(e.target.value)}>
              <option value="">--Seleccione--</option>
              {profesores.map(p => (
                <option key={p.id_profesor} value={p.id_profesor}>
                  {p.nombres} {p.apellidos}
                </option>
              ))}
            </select>
          </>
        )}

        {tipo === 'Curso' && (
          <>
            <label>Curso:</label>
            <select value={seleccion} onChange={e => setSeleccion(e.target.value)}>
              <option value="">--Seleccione--</option>
              {cursos.map(c => (
                <option key={c.id_curso} value={c.id_curso}>
                  {c.nombre_curso}
                </option>
              ))}
            </select>
          </>
        )}

        <label>Mensaje:</label>
        <textarea
          value={contenido}
          onChange={e => setContenido(e.target.value)}
          placeholder="Escribe tu publicación..."
        />

        <div className="botones">
          <button type="submit">Publicar</button>
          <button type="button" onClick={handleRegresar}>Regresar</button>
        </div>
      </form>
    </div>
  )
}

export default CrearPublicacion
