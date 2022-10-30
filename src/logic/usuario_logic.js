const Usuario = require('../models/usuario_model');
const Joi = require ('@hapi/joi');


//validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[ A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
    .pattern (/^[a-zA-Z0-9]{3,30}$/),
    
    email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow:['com','net','edu','co']}})
});

//Funcion asincrona para crear un objeto de tipo Usuario
async function crearUsuario(body){
    let usuario = new Usuario ({
        email    : body.email,
        nombre   : body.nombre,
        password : body.password
    });
    return await usuario.save();
}

//Funcion asyncronica para eliminar un usuario
async function desactivarUsuario(email){
    let usuario =await Usuario.findOneAndUpdate({"email" : email},{
    $set : {
        estado:false
    }
}, {new: true});
return usuario;
}

async function actualizarUsuario(email, body){
    let usuario = await Usuario.findOneAndUpdate({"email":email},{
        $set: {
            nombre : body.nombre,
            password: body.password
        }
    }, {new: true});
    return usuario;
}


//Funcion asincrona para listar todos los usuarios activos
async function listarUsuarioActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}

module.exports = {
    schema,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuarioActivos
}