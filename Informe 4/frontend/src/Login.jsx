import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from './config'

function Login() {
    const [registro, setRegistro] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('') // limpiar error previo

        try {
            const response = await axios.post(`${API_URL}/usuarios/login`, {
                registro_academico: registro,
                contrasena
            })

            // Login exitoso
            console.log('Login exitoso:', response.data)
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
            setRegistro('')
            setContrasena('')
            navigate('/inicio') // Redirigir a la página principal
        } catch (err) {
            console.error('Error login:', err)

            if (err.response && err.response.data && err.response.data.mensaje) {
                // Mostrar el mensaje exacto que envía el backend
                setError(err.response.data.mensaje)
            } else if (err.request) {
                // No hubo respuesta del servidor
                setError('No se pudo conectar con el servidor')
            } else {
                // Otro tipo de error
                setError('Ocurrió un error inesperado')
            }
        }
    }

    return (
    <div className="login-container">
        <div className="form-container">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Registro Académico"
                    value={registro}
                    onChange={(e) => setRegistro(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="links">
                <Link to="/register">Registrar usuario</Link>
                <Link to="/forgot-password">¿Olvidó contraseña?</Link>
            </div>
        </div>
    </div>
    )
}

export default Login
