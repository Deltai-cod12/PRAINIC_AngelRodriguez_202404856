import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from './config'

function ForgotPassword() {
  const [registro, setRegistro] = useState('')
  const [correo, setCorreo] = useState('')
  const [nuevaContrasena, setNuevaContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const handleReset = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')

    try {
      const response = await axios.put(`${API_URL}/forgot-password`, {
        registro_academico: registro,
        correo,
        nueva_contrasena: nuevaContrasena
      })

      setMensaje(response.data.mensaje)
      setRegistro('')
      setCorreo('')
      setNuevaContrasena('')
    } catch (err) {
      console.error('Error al reestablecer contraseña:', err)
      if (err.response && err.response.data && err.response.data.mensaje) {
        setError(err.response.data.mensaje)
      } else {
        setError('No se pudo conectar con el servidor')
      }
    }
  }

  return (
    <div className="form-container">
      <h2>Reestablecer Contraseña</h2>
      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Registro Académico"
          value={registro}
          onChange={(e) => setRegistro(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          required
        />
        <button type="submit">Reestablecer</button>
      </form>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default ForgotPassword
