const express = require('express');
const router = express.Router();
const conexionDB = require('../config/db');

/* router.get('/', (req, res) => {
    const sql = "SELECT * FROM vehiculos";

    conexionDB.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({ status: 500, message: "Error en la consulta" });
        }
        else {
            res.status(200).json({ status: 200, message: "Consulta exitosa", data: results });
        }
    })
}); */

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM vehiculos WHERE id_vehiculo=?";

    conexionDB.query(sql, [id], (error, results) => {
        if (error) {
            res.status(400).json({ status: 400, message: "Error en la consulta" });
        }
        else {
            res.status(200).json({ status: 200, message: "Consulta exitosa", data: results });
        }
    });
});

// FILTROS
router.get('/', (req, res) => {
    const sql = "SELECT * FROM vehiculos";

    conexionDB.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ status: 500, message: "Error en la consulta" });
        } else {
            const marcaFiltro = req.query.marca;
            const modeloFiltro = req.query.modelo;
            const precioFiltro = req.query.precio;
            const disponibilidadFiltro = req.query.disponibilidad;

            const resultadoFiltrado = results.filter(vehiculo => {
                if (marcaFiltro && vehiculo.marca.toLowerCase() !== marcaFiltro.toLowerCase()) return false;
                if (modeloFiltro && vehiculo.modelo.toLowerCase() !== modeloFiltro.toLowerCase()) return false;
                if (precioFiltro && parseFloat(vehiculo.precio) > parseFloat(precioFiltro)) return false;
                if (disponibilidadFiltro && vehiculo.disponibilidad.toLowerCase() !== disponibilidadFiltro.toLowerCase()) return false;
                return true;
            });

            res.status(200).json({ status: 200, message: "Consulta exitosa", data: resultadoFiltrado });
        }
    });
});


router.post('/', (req, res) => {
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const anio = req.body.anio;
    const precio = req.body.precio;
    const disponibilidad = req.body.disponibilidad;
    const imagen_url = req.body.imagen_url;

    const sql = "INSERT INTO vehiculos (marca, modelo, anio, precio, disponibilidad, imagen_url) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [marca, modelo, anio, precio, disponibilidad, imagen_url];

    conexionDB.query(sql, params, (error, results) => {
        if (error) {
            res.status(400).json({ status: 400, message: "Error en el ingreso de datos" });
        }
        else {
            res.status(201).json({ status: 201, message: "Vehiculo ingresado exitosamente", data: params });
        }
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const anio = req.body.anio;
    const precio = req.body.precio;
    const disponibilidad = req.body.disponibilidad;
    const imagen_url = req.body.imagen_url;

    const sql = "UPDATE vehiculos SET marca=?, modelo=?, anio=?, precio=?, disponibilidad=?, imagen_url=? WHERE id_vehiculo=?";
    const params = [marca, modelo, anio, precio, disponibilidad, imagen_url, id];

    conexionDB.query(sql, params, (error, results) => {
        if (error) {
            res.status(400).json({ status: 400, message: "Error en la modificacion de datos" });
        }
        else {
            res.status(200).json({ status: 200, message: "Vehiculo modificados con exito", data: params });
        }
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM vehiculos WHERE id_vehiculo=?";

    conexionDB.query(sql, [id], (error, results) => {
        if (error) {
            res.status(400).json({ status: 400, message: "Error en la eliminacion" });
        }
        else {
            res.status(200).json({ status: 200, message: "Vehiculo eliminado con exito", data: [id] });
        }
    })
});

module.exports = router;
