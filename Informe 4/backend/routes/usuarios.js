const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
    });
});

// Crear un usuario
router.post('/', (req, res) => {
    const { registro_academico, nombres, apellidos, correo, contrasena } = req.body;
    const sql = 'INSERT INTO Usuarios (registro_academico, nombres, apellidos, correo, contrasena) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [registro_academico, nombres, apellidos, correo, contrasena], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario creado', id: results.insertId });
    });
});

module.exports = router;
