// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();


// IMPORTACIONES RUTAS
const UsuarioRutas = require('./src/routes/usuario.routes');


// MIDDLEWARE INTERMEDIARIO
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERA
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api', UsuarioRutas);


module.exports = app;


