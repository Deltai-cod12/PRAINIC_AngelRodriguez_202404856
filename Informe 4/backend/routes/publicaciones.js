// routes/publicaciones.js
const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Obtener todas las publicaciones, más recientes primero
router.get('/', (req, res) => {
    const query = `
    SELECT 
        p.id_publicacion, 
        p.mensaje, 
        p.fecha_creacion, 
        u.id_usuario, u.nombres, u.apellidos,
        c.id_curso, c.nombre_curso,
        pr.id_profesor, pr.nombres AS nombre_profesor, pr.apellidos AS apellido_profesor
    FROM Publicaciones p
    JOIN Usuarios u ON p.id_usuario = u.id_usuario
    LEFT JOIN Cursos c ON p.id_curso = c.id_curso
    LEFT JOIN Profesores pr ON p.id_profesor = pr.id_profesor
    ORDER BY p.fecha_creacion DESC
    `
    db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.json(results)
    })
})

// Crear una nueva publicación
router.post('/', (req, res) => {
    const { id_usuario, id_curso, id_profesor, mensaje } = req.body

    if (!id_usuario || !mensaje || (!id_curso && !id_profesor)) {
    return res.status(400).json({ error: 'Datos incompletos' })
    }

    const query = `
    INSERT INTO Publicaciones (id_usuario, id_curso, id_profesor, mensaje, fecha_creacion)
    VALUES (?, ?, ?, ?, NOW())
    `
    db.query(query, [id_usuario, id_curso || null, id_profesor || null, mensaje], (err, result) => {
    if (err) return res.status(500).json({ error: err })
    res.json({ mensaje: 'Publicación creada', id: result.insertId })
    })
})

module.exports = router
