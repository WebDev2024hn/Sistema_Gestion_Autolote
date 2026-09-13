const express = require('express');
const router = express.Router();
const conexionDB = require('../config/db');

router.get('/', (req, res)=>{
    const sql = "SELECT * FROM clientes";

    conexionDB.query(sql, (error, results)=>{
        if(error){
            res.status(500).json({status: 500, message: "Error en la consulta"});
        }
        else{
            res.status(200).json({status: 200, message: "Consulta exitosa", data: results});
        }
    })
})

router.post('/', (req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;

    const sql = "INSERT INTO clientes (nombre, apellido, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?)";
    const params = [nombre, apellido, correo, telefono, direccion];

    conexionDB.query(sql, params, (error, results)=>{
        if(error){
            res.status(400).json({status: 400, message: "Error en el ingreso de datos"});
        }
        else{
            res.status(201).json({status: 201, message: "Cliente ingresado exitosamente", data: params});
        }
    })
});

router.put('/:id', (req, res)=>{
    const id= req.params.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;

    const sql = "UPDATE clientes set nombre=?, apellido=?, correo=?, telefono=?, direccion=? WHERE id_cliente=?";
    const params = [nombre, apellido, correo, telefono, direccion, id];

    conexionDB.query(sql, params, (error, results)=>{
        if(error){
            res.status(400).json({status: 400, message: "Error en la modificacion de datos"});
        }
        else{
            res.status(200).json({status: 200, message: "Cliente modificado con exito", data: params});
        }
    })
});

router.delete('/:id', (req, res)=>{
    const id = req.params.id;

    const sql = "DELETE FROM clientes WHERE id_cliente=?";

    conexionDB.query(sql, [id], (error, results)=>{
        if(error){
            res.status(400).json({status: 400, message: "Error en la eliminacion"});
        }
        else{
            res.status(200).json({status: 200, message: "Cliente eliminado con exito", data: [id]});
        }
    })
})


module.exports = router;