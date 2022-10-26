const express = require ('express');
const Usuario = require ('../models/usuario_model');
const Joi = require('@hapi/joi');
const ruta = express.Router();

//validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú]{3,30}$/),

    password: Joi.string()
    .pattern (/^[a-zA-Z0-9]{3,30}$/),
    
    email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow:['com','net','edu','co']}})
});

ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de USUARIOS funcionando correctamente...');
});

async function crearUsuario(body){
    let usuario = new Usuario ({
        email    : body.email,
        nombre   : body.nombre,
        password : body.password
    });
    return await usuario.save();
}

ruta.post('/',(req, res)=>{
    let body = req.body;

const {error, value} = schema.validate({nombre: body.nombre, email: body.email});
if(!error){
    let resultado = crearUsuario(body);

    resultado.then( user => {
        res.json({
            valor: user
        })
    }).catch (err => {
        res.status(400).json({
            err
        })
    });
}else{
    res.status(400).json({
        error
    })
}});


module.exports = ruta;
