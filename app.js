const express = require('express');
const app = express();
const PORT = 3000;

const vehiculos = require('./routes/vehiculos');
const clientes = require('./routes/clientes');
const consultas = require('./routes/consultas');
const apitercero = require('./routes/apitercero');

app.use(express.json());

app.use('/vehiculos', vehiculos);
app.use('/clientes', clientes);
app.use('/consultas', consultas);
app.use('/apitercero', apitercero);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Sistema de Gestión para Autolote funcionando'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});