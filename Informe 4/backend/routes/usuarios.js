const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bcrypt = require('bcrypt')

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.json(results)
  })
})

// Obtener usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err })
    if (result.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    res.json(result[0])
  })
})

// Registrar nuevo usuario
router.post('/', async (req, res) => {
  const { registro_academico, nombres, apellidos, correo, contrasena } = req.body

  if (!registro_academico || !nombres || !apellidos || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10)
    db.query(
      'INSERT INTO Usuarios (registro_academico, nombres, apellidos, correo, contrasena) VALUES (?, ?, ?, ?, ?)',
      [registro_academico, nombres, apellidos, correo, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: err })
        res.json({ mensaje: 'Usuario registrado', id: result.insertId })
      }
    )
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
})

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { registro_academico, nombres, apellidos, correo, contrasena } = req.body

  if (!registro_academico || !nombres || !apellidos || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10)
    db.query(
      'UPDATE Usuarios SET registro_academico = ?, nombres = ?, apellidos = ?, correo = ?, contrasena = ? WHERE id_usuario = ?',
      [registro_academico, nombres, apellidos, correo, hashedPassword, id],
      (err) => {
        if (err) return res.status(500).json({ error: err })
        res.json({ mensaje: 'Usuario actualizado', id })
      }
    )
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
})

// Eliminar usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err })
    res.json({ mensaje: 'Usuario eliminado' })
  })
})

// Login de usuario
router.post('/login', (req, res) => {
    const { registro_academico, contrasena } = req.body;

    if (!registro_academico || !contrasena) {
        return res.status(400).json({ mensaje: 'Registro académico y contraseña son requeridos' });
    }

    db.query(
        'SELECT * FROM Usuarios WHERE registro_academico = ?',
        [registro_academico],
        async (err, result) => {
            if (err) return res.status(500).json({ error: err });
            if (result.length === 0) {
                return res.status(401).json({ mensaje: 'Usuario no encontrado' });
            }

            const usuario = result[0];
            const match = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

            // Eliminamos la contraseña antes de enviar la respuesta
            delete usuario.contrasena;
            res.json({ mensaje: 'Login exitoso', usuario });
        }
    );
});

// Obtener usuario por registro_academico
router.get('/registro/:registro_academico', (req, res) => {
  const { registro_academico } = req.params
  db.query(
    'SELECT * FROM Usuarios WHERE registro_academico = ?',
    [registro_academico],
    (err, result) => {
      if (err) return res.status(500).json({ error: err })
      if (result.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' })
      }
      res.json(result[0])
    }
  )
})


module.exports = router
