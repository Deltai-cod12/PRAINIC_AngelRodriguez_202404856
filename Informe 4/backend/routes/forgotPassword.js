const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Reestablecer contraseña
router.put('/', async (req, res) => {
    const { registro_academico, correo, nueva_contrasena } = req.body;

    if (!registro_academico || !correo || !nueva_contrasena) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar que el usuario exista
        db.query(
            'SELECT * FROM Usuarios WHERE registro_academico = ? AND correo = ?',
            [registro_academico, correo],
            async (err, result) => {
                if (err) return res.status(500).json({ error: err });
                if (result.length === 0) {
                    return res.status(404).json({ error: 'Usuario no encontrado o datos incorrectos' });
                }

                // Hashear la nueva contraseña
                const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);

                // Actualizar contraseña
                db.query(
                    'UPDATE Usuarios SET contrasena = ? WHERE registro_academico = ? AND correo = ?',
                    [hashedPassword, registro_academico, correo],
                    (err2) => {
                        if (err2) return res.status(500).json({ error: err2 });
                        res.json({ mensaje: 'Contraseña reestablecida correctamente' });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Error al reestablecer contraseña' });
    }
});

module.exports = router;
