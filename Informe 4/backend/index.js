require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ✅ Importamos cors
const app = express();
const db = require('./config/db'); // mi pool de conexiones

// Importamos las rutas
const usuariosRoutes = require('./routes/usuarios');
const profesoresRoutes = require('./routes/profesores');
const cursosRoutes = require('./routes/cursos');
const forgotPasswordRoutes = require('./routes/forgotPassword');
const publicacionesRoutes = require('./routes/publicaciones');
const comentariosRouter = require('./routes/comentarios')

//Habilitar CORS para React
app.use(cors({
    origin: 'http://localhost:3000', // puerto donde corre tu React
    credentials: true
}));

app.use(express.json());

// Ruta de prueba a la base de datos
app.get('/test-db', (req, res) => {
    db.query('SELECT NOW() AS fecha', (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta', details: err });
        }
        res.json({ mensaje: 'Conexión exitosa con la base de Datos', resultado: result });
    });
});

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/cursos', cursosRoutes);
app.use('/forgot-password', forgotPasswordRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/comentarios', comentariosRouter)


// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
