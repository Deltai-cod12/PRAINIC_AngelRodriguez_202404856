import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from './config'
import './PantallaInicial.css'

function PantallaInicial() {
  const [publicaciones, setPublicaciones] = useState([])
  const [todasPublicaciones, setTodasPublicaciones] = useState([])
  const [usuario, setUsuario] = useState(null)
  const [filtro, setFiltro] = useState('')
  const [valorBusqueda, setValorBusqueda] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    if (!usuarioLogueado) {
      navigate('/')
      return
    }
    setUsuario(usuarioLogueado)

    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get(`${API_URL}/publicaciones`)
        setPublicaciones(response.data)
        setTodasPublicaciones(response.data)
      } catch (error) {
        console.error('Error al cargar publicaciones:', error)
      }
    }

    fetchPublicaciones()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    navigate('/')
  }

  const verComentarios = (id_publicacion) => {
    navigate(`/publicacion/${id_publicacion}`)
  }

  const aplicarFiltro = () => {
    if (!filtro) {
      setPublicaciones(todasPublicaciones)
      return
    }

    let filtradas = todasPublicaciones

    switch (filtro) {
      case 'curso':
        filtradas = todasPublicaciones.filter(pub => pub.nombre_curso?.toLowerCase().includes(valorBusqueda.toLowerCase()))
        break
      case 'catedratico':
        filtradas = todasPublicaciones.filter(pub =>
          `${pub.nombre_profesor} ${pub.apellido_profesor}`.toLowerCase().includes(valorBusqueda.toLowerCase())
        )
        break
      case 'nombreCurso':
        filtradas = todasPublicaciones.filter(pub => pub.nombre_curso?.toLowerCase() === valorBusqueda.toLowerCase())
        break
      case 'nombreCatedratico':
        filtradas = todasPublicaciones.filter(pub =>
          `${pub.nombre_profesor} ${pub.apellido_profesor}`.toLowerCase() === valorBusqueda.toLowerCase()
        )
        break
      default:
        filtradas = todasPublicaciones
    }

    setPublicaciones(filtradas)
  }

  const limpiarFiltros = () => {
    setFiltro('')
    setValorBusqueda('')
    setPublicaciones(todasPublicaciones)
  }

  return (
    <div className="pantalla-inicial">
      <header className="header">
        <h1>{usuario ? `Bienvenido, ${usuario.nombres}` : 'Bienvenido'}</h1>
        <nav>
          <ul>
            <li>Inicio</li>
            <li onClick={() => navigate('/crear-publicacion')}>Crear Publicación</li>
            <li onClick={() => navigate(`/perfil/${usuario.registro_academico}`)}>Perfil</li>
            <li>Cursos Aprobados</li>
            <li onClick={handleLogout}>Salir</li>
          </ul>
        </nav>
      </header>

      {/* Barra de filtros */}
      <div className="buscador-perfil">
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">-- Selecciona un filtro --</option>
          <option value="curso">Filtrar por Curso</option>
          <option value="catedratico">Filtrar por Catedrático</option>
          <option value="nombreCurso">Nombre exacto del Curso</option>
          <option value="nombreCatedratico">Nombre exacto del Catedrático</option>
        </select>
        <input
          type="text"
          placeholder="Ingrese valor a buscar"
          value={valorBusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
        />
        <button className="btn-aplicar" onClick={aplicarFiltro}>Aplicar</button>
        <button className="btn-limpiar" onClick={limpiarFiltros}>Limpiar Filtros</button>
      </div>

      <main className="contenido">
        {publicaciones.length === 0 ? (
          <p>No hay publicaciones aún.</p>
        ) : (
          publicaciones.map((pub) => (
            <div key={pub.id_publicacion} className="publicacion-card">
              <div className="publicacion-header">
                <span className="usuario">{pub.nombres} {pub.apellidos}</span>
                <span className="fecha">{new Date(pub.fecha_creacion).toLocaleString()}</span>
              </div>
              <div className="mensaje">{pub.mensaje}</div>
              <div className="publicacion-footer">
                Curso: {pub.nombre_curso || 'N/A'} | Profesor: {pub.nombre_profesor ? `${pub.nombre_profesor} ${pub.apellido_profesor}` : 'N/A'}
              </div>
              <button
                className="boton-comentarios"
                onClick={() => verComentarios(pub.id_publicacion)}
              >
                Ver Comentarios
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  )
}

export default PantallaInicial
