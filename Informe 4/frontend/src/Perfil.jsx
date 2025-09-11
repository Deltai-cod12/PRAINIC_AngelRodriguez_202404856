import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from './config'
import './Perfil.css'

function Perfil() {
  const { registro } = useParams() // se obtiene de la ruta /perfil/:registro
  const [usuario, setUsuario] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    registro_academico: '',
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios/registro/${registro}`)
        setUsuario(response.data)
        setFormData({
          registro_academico: response.data.registro_academico,
          nombres: response.data.nombres,
          apellidos: response.data.apellidos,
          correo: response.data.correo,
          contrasena: '' // vacío para que el usuario ingrese una nueva si quiere
        })

        // Si el perfil es del usuario logueado → habilitar edición
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
        if (usuarioLogueado && usuarioLogueado.registro_academico === registro) {
          setEditMode(true)
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error)
        alert('No se encontró el usuario.')
        navigate('/inicio')
      }
    }

    fetchUsuario()
  }, [registro, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/usuarios/${usuario.id_usuario}`, formData)
      alert('Perfil actualizado correctamente')
      navigate('/inicio')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      alert('Hubo un error al actualizar el perfil')
    }
  }

  if (!usuario) {
    return <p className="perfil-cargando">Cargando perfil...</p>
  }

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>

      <div className="perfil-form">
        <label>Registro Académico</label>
        <input
          type="text"
          name="registro_academico"
          value={formData.registro_academico}
          disabled
        />

        <label>Nombres</label>
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Apellidos</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          disabled={!editMode}
        />

        {editMode && (
          <>
            <label>Nueva Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Ingrese nueva contraseña"
            />
          </>
        )}

        <div className="perfil-actions">
          <button onClick={() => navigate('/inicio')} className="btn-regresar">
            Regresar
          </button>
          {editMode && (
            <button onClick={handleUpdate} className="btn-guardar">
              Guardar Cambios
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Perfil
