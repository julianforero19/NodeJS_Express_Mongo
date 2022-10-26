const express = require ('express');
const mongoose = require ('mongoose');

// Conexion a la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/userscoursesdb',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB...',err));


//MIDDLEWARE
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutandose...');
})
