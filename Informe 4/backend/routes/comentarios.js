const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Obtener todos los comentarios de una publicación
router.get('/:id_publicacion', (req, res) => {
    const { id_publicacion } = req.params
    const query = `
        SELECT c.id_comentario, c.mensaje, c.fecha_creacion,
                u.id_usuario, u.nombres, u.apellidos
        FROM Comentarios c
        JOIN Usuarios u ON c.id_usuario = u.id_usuario
        WHERE c.id_publicacion = ?
        ORDER BY c.fecha_creacion ASC
    `
    db.query(query, [id_publicacion], (err, results) => {
        if (err) return res.status(500).json({ error: err })
        res.json(results)
    })
})

// Crear un nuevo comentario
router.post('/', (req, res) => {
    const { id_publicacion, id_usuario, mensaje } = req.body
    if (!id_publicacion || !id_usuario || !mensaje) {
        return res.status(400).json({ error: 'Datos incompletos' })
    }

    const query = `
        INSERT INTO Comentarios (id_publicacion, id_usuario, mensaje, fecha_creacion)
        VALUES (?, ?, ?, NOW())
    `
    db.query(query, [id_publicacion, id_usuario, mensaje], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        res.json({ mensaje: 'Comentario creado', id: result.insertId })
    })
})

module.exports = router
