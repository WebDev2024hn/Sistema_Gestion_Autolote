const express = require('express');
const router = express.Router();
const conexionDB = require('../config/db');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, (req, res) => {
    const id_cliente = req.body.id_cliente;
    const id_vehiculo = req.body.id_vehiculo;
    const fecha = req.body.fecha; 
    const descripcion = req.body.descripcion; 
    const estado = req.body.estado; 

    const sql = "INSERT INTO consultas (id_cliente, id_vehiculo, fecha, descripcion, estado) VALUES (?, ?, ?, ?, ?)";
    const params = [id_cliente, id_vehiculo, fecha, descripcion, estado];

    conexionDB.query(sql, params, (error, results) => {
        if (error) {
            res.status(400).json({ status: 400, message: "Error en el ingreso" });
        } else {
            res.status(201).json({ status: 201, message: "Consulta de cliente guardada", data: params });
        }
    });
});

router.get('/historial/:id_cliente', verificarToken, (req, res) => {
    const id_cliente = req.params.id_cliente;
    
    const sql = "SELECT * FROM consultas WHERE id_cliente = ?";

    conexionDB.query(sql, [id_cliente], (error, results) => {
        if (error) {
            res.status(500).json({ status: 500, message: "Error en la consulta" });
        } else {
            res.status(200).json({ status: 200, message: "Consulta exitosa", data: results });
        }
    });
});

module.exports = router;
