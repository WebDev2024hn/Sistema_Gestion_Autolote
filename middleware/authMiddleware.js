const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 401,
            message: 'Token no proporcionado'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'Token inválido o expirado'
        });
    }
};

module.exports = verificarToken;