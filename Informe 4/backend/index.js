require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db'); // tu pool de conexiones

app.use(express.json());

// Ruta de prueba a la base de datos
app.get('/test-db', (req, res) => {
    db.query('SELECT NOW() AS fecha', (err, result) => {
    if (err) {
        console.error('❌ Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la consulta', details: err });
    }
    res.json({ mensaje: '✅ Conexión exitosa 🚀', resultado: result });
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

