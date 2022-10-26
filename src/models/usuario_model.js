const mongoose = require ('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    nombre: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        required:true
    },
    imagen: {
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Usuario', usuarioSchema);