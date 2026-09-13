const mysql = require('mysql2');
require('dotenv').config();

const conexionBD = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

conexionBD.getConnection((error, conexion)=>{
    if(error){
        console.log("Error en la conexion a la base de datos");
    }
    else{
        console.log("Conexion exitosa a la base de datos");
    }
})

module.exports = conexionBD;