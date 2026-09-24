const express = require('express');
const router = express.Router();
const axios = require('axios');
const conexionDB = require('../config/db');

router.get('/:id_vehiculo', (req, res) => {
    const id = req.params.id_vehiculo;
    const sql = "SELECT * FROM vehiculos WHERE id_vehiculo = ?";

    conexionDB.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ status: 500, message: "Error en la consulta" });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: 404, message: "Vehiculo no encontrado" });
        }

        const precioDolares = parseFloat(results[0].precio);
        
        const urlAPI = process.env.APICONEXION;

        axios.get(urlAPI)
            .then((apiResponse) => {
                const tasaHNL = apiResponse.data.conversion_rates.HNL;
                res.status(200).json({status:200, message: "Consulta exitosa", data: {
                        vehiculo: `${results[0].marca} ${results[0].modelo}`,
                        precio_USD: precioDolares,
                        precio_HNL: parseFloat((precioDolares * tasaHNL).toFixed(2))
                    }});
            })
            .catch((apiError) => {
                console.error("Error en Axios:", apiError.message);
                res.status(502).json({ status: 502, message: "Error API externa" });
            });
    });
});

module.exports = router;
