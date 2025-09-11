import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from './config'

function Register() {
    const [registro, setRegistro] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setMensaje('')
        setError('')

        try {
            const response = await axios.post(`${API_URL}/usuarios`, {
                registro_academico: registro,
                nombres,
                apellidos,
                correo,
                contrasena
            })

            setMensaje(response.data.mensaje || 'Usuario registrado correctamente')
            // Limpiar campos
            setRegistro('')
            setNombres('')
            setApellidos('')
            setCorreo('')
            setContrasena('')

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (err) {
            console.error('Error al registrar usuario:', err)
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error)
            } else {
                setError('No se pudo conectar con el servidor')
            }
        }
    }

    return (
    <div className="login-container">
        <div className="form-container">
            <h2>Registrar Usuario</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Registro Académico"
                    value={registro}
                    onChange={(e) => setRegistro(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nombres"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Apellidos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
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
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    </div>
    )
}

export default Register
