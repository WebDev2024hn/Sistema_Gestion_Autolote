const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db.js');

require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post('/login', async (req, res) => {
    const user = req.body;

    const sql = `
        SELECT id_usuario, nombre, apellido, correo, password_hash, rol
        FROM usuarios
        WHERE correo = ?
    `;

    pool.query(sql, [user.correo], async (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: 'Ocurrió un error en la ejecución de la consulta'
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                status: 401,
                message: 'Credenciales inválidas'
            });
        }

        const cUser = results[0];

        const isMatch = await bcrypt.compare(
            user.password,
            cUser.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                message: 'Credenciales inválidas'
            });
        }

        const token = jwt.sign(
            {
                id: cUser.id_usuario,
                correo: cUser.correo,
                rol: cUser.rol
            },
            JWT_SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            status: 200,
            message: 'Success',
            data: token
        });
    });
});

module.exports = router;