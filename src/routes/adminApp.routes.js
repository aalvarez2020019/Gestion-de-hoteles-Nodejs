const express = require('express');
const adminAppController = require('../controllers/adminApp.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// Ver usuarios rol admin
api.get("/verUsuarios", md_autenticacion.Auth, adminAppController.verUsuarios);

// Agregar administrador hotel
api.post("/agregarAdminHotel", md_autenticacion.Auth, adminAppController.agregarAdministradorHotel);

// Agregar hotel
api.post("/agregarHotel/:administradorID", md_autenticacion.Auth, adminAppController.agregarHotel);

// Ver los hoteles
api.get("/verHotelesAdmin", md_autenticacion.Auth, adminAppController.verHotelesAdminApp);

// Editar usuarios
api.put("/editarUsuarios/:usuarioID", md_autenticacion.Auth, adminAppController.editarUsuarios);

// Eliminar usuarios
api.delete("/eliminarUsuarios/:usuarioID", md_autenticacion.Auth, adminAppController.eliminarUsuarios);

// Editar hoteles
api.put("/editarHotel/:hotelID", md_autenticacion.Auth, adminAppController.editarHoteles);

// Eliminar hoteles
api.delete("/eliminarHotel/:hotelID", md_autenticacion.Auth, adminAppController.eliminarHoteles);

// Contador
//api.get('/buscarHabitaciones', md_autenticacion.Auth, adminAppController.HotelesContando);


module.exports = api;

