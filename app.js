const express = require('express');
const app = express();
const pool = require('./config/db.js');
const AuthRoute = require('./routes/AuthRoute.js');

const PORT = 3000;

const verificarToken = require('./middleware/authMiddleware.js');
const vehiculos = require('./routes/vehiculos');
const clientes = require('./routes/clientes');
const consultas = require('./routes/consultas');
const apitercero = require('./routes/apitercero');

app.use(express.json());

app.use('/', AuthRoute);
app.use('/vehiculos', vehiculos);
app.use('/clientes', clientes);
app.use('/consultas', consultas);
app.use('/apitercero', apitercero);

app.get('/perfil', verificarToken, (req, res) => {
    res.json({
        status: 200,
        message: 'Acceso autorizado',
        usuario: req.user
    });
});

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Sistema de Gestión para Autolote funcionando'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});