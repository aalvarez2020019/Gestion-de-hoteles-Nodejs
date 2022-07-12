const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// eliminar habitaciones
api.delete("/habiEliminar/:idHab", md_autenticacion.Auth, usuarioController.eliminarHabitacion);

// get usuarios id
api.get("/getUsuarioAdmin", md_autenticacion.Auth, usuarioController.getUsuarioAdmin);

// usuario idget
api.get("/usuarioIdGet/:idUsuario", md_autenticacion.Auth, usuarioController.getUsuarioId);



// ver reservaciones por el id del usuario
api.get("/getReservacionesId/:usuario", md_autenticacion.Auth, usuarioController.getReservacionesId);

// eliminar reservaciones
api.delete("/eliminarReservacion/:idReserv", md_autenticacion.Auth, usuarioController.eliminarReservacion);


// ver habitaciones ocupadas
api.get("/habitacionesOcupadas", md_autenticacion.Auth, usuarioController.verhabitacionesOcupadas);


// editar habitaciones para reservar
api.put('/editarHabitacionesReserva/:idHabitacion', md_autenticacion.Auth, usuarioController.editarHabitacionesRolAdmin);

/* VER EN MODAL LOS EVENTOS, SERVICIOS Y HOTELES */
api.get('/verEventosHotel/:hotel', md_autenticacion.Auth, usuarioController.verEventosHotel);
api.get('/verServicios/:hotel', md_autenticacion.Auth, usuarioController.verServiciosHotel);
api.get("/obtenerHoteles", md_autenticacion.Auth, usuarioController.getHoteles);
api.get("/verHabitaciones/:hotel", md_autenticacion.Auth, usuarioController.verHabitacionesHotel);

// editar usuario
api.put('/usuarioEditar/:idUsuario', md_autenticacion.Auth, usuarioController.EditarUsuario);
api.get('/usuarioGetId/:idUsuario', md_autenticacion.Auth, usuarioController.usuarioGetId);
api.delete('/usuarioEliminar/:idUsuario', md_autenticacion.Auth, usuarioController.eliminarUsuarios);

api.get("/usuariosVer", md_autenticacion.Auth, usuarioController.verUsuarios);



// habitaciones por el id de la habitacion
api.get('/verIdHabitacion/:idHab', md_autenticacion.Auth, usuarioController.verIdHabitacion);

// hoteles id
api.get("/hotelesId/:idHotel", md_autenticacion.Auth, usuarioController.hotelVerId);


// ver hoteles id
api.get('/obtenerIdHotel/:idHotel', md_autenticacion.Auth, usuarioController.getIdHotel);

// ver habitaciones id
api.get('/obtenerIdHabitacion/:idHab', md_autenticacion.Auth, usuarioController.getIdHabitacion);


// ver reservaciones
api.get('/verReservaciones', md_autenticacion.Auth, usuarioController.reservacionesVer);


// ver habitaciones usuario
api.get('/verHabitaciones', md_autenticacion.Auth, usuarioController.verHabitacionesUsuario);


// Obtener por el id del usuario
api.get("/obtenerUsuarioId/:idUsuario", md_autenticacion.Auth, usuarioController.obtenerUsuarioId);

// Obtener Usuarios
// api.get("/obtenerUsuarios", md_autenticacion.Auth, usuarioController.obtenerUsuarios);

// Logearse
api.post("/login", usuarioController.login);

// Registrar usuarios
api.post("/registrarUsuarios", usuarioController.usuariosRegistrar);

// Buscar las habitaciones
api.post("/buscarHabitacionesHotel", md_autenticacion.Auth, usuarioController.buscarHabitacionesHotel);

// Buscar eventos
api.post("/buscarEventosHotel", md_autenticacion.Auth, usuarioController.buscarEventosHotel);

// Reservacion
api.post("/reservar/:habitacionID", md_autenticacion.Auth, usuarioController.reservacion);


module.exports = api;
