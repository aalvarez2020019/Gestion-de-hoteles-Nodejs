const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post("/registrarUsuarios", usuarioController.usuariosRegistrar);


module.exports = api;
