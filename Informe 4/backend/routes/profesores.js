const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los profesores
router.get('/', (req, res) => {
  db.query('SELECT * FROM Profesores', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener profesor por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Profesores WHERE id_profesor = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ mensaje: 'Profesor no encontrado' });
    res.json(result[0]);
  });
});

// Agregar profesor
router.post('/', (req, res) => {
  const { nombres, apellidos } = req.body;
  if (!nombres || !apellidos) return res.status(400).json({ error: 'Todos los campos son obligatorios' });

  db.query(
    'INSERT INTO Profesores (nombres, apellidos) VALUES (?, ?)',
    [nombres, apellidos],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Profesor agregado', id: result.insertId });
    }
  );
});

// Actualizar profesor
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos } = req.body;

  db.query(
    'UPDATE Profesores SET nombres = ?, apellidos = ? WHERE id_profesor = ?',
    [nombres, apellidos, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Profesor no encontrado' });
      res.json({ mensaje: 'Profesor actualizado' });
    }
  );
});

// Eliminar profesor
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Profesores WHERE id_profesor = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Profesor no encontrado' });
    res.json({ mensaje: 'Profesor eliminado' });
  });
});

module.exports = router;
