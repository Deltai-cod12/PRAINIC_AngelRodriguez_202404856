const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los cursos
router.get('/', (req, res) => {
  const sql = `
    SELECT c.id_curso, c.nombre_curso, c.seccion, 
           p.id_profesor, p.nombres AS profesor_nombres, p.apellidos AS profesor_apellidos
    FROM Cursos c
    LEFT JOIN Profesores p ON c.id_profesor = p.id_profesor
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener curso por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT c.id_curso, c.nombre_curso, c.seccion, 
           p.id_profesor, p.nombres AS profesor_nombres, p.apellidos AS profesor_apellidos
    FROM Cursos c
    LEFT JOIN Profesores p ON c.id_profesor = p.id_profesor
    WHERE c.id_curso = ?
  `;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: 'Curso no encontrado' });
    res.json(result[0]);
  });
});

// Agregar curso
router.post('/', (req, res) => {
  const { nombre_curso, seccion, id_profesor } = req.body;
  if (!nombre_curso) return res.status(400).json({ error: 'El nombre del curso es obligatorio' });

  db.query(
    'INSERT INTO Cursos (nombre_curso, seccion, id_profesor) VALUES (?, ?, ?)',
    [nombre_curso, seccion || null, id_profesor || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Curso agregado', id: result.insertId });
    }
  );
});

// Actualizar curso
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_curso, seccion, id_profesor } = req.body;

  db.query(
    'UPDATE Cursos SET nombre_curso = ?, seccion = ?, id_profesor = ? WHERE id_curso = ?',
    [nombre_curso, seccion || null, id_profesor || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Curso no encontrado' });
      res.json({ mensaje: 'Curso actualizado' });
    }
  );
});

// Eliminar curso
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Cursos WHERE id_curso = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Curso no encontrado' });
    res.json({ mensaje: 'Curso eliminado' });
  });
});

module.exports = router;
