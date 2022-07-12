const express = require('express');
const adminAppController = require('../controllers/adminApp.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// ver reservaciones por habitacion
api.get('/obtenerReservaciones/:habitacion', md_autenticacion.Auth, adminAppController.verReservacionesHotel);

// ver habitaciones id
api.get('/obtenerHabId/:idHab', md_autenticacion.Auth, adminAppController.getHabId);


// get habitaciones por hotel
api.get('/obtenerHabiHotel/:hotel', md_autenticacion.Auth, adminAppController.verHabitacionesHotel);


// Obtener Hoteles por el rol admin
api.get("/ObtenerHotelesRolAdmin", md_autenticacion.Auth, adminAppController.ObtenerHotelesRolAdmin)


// Obtener Hoteles Id
api.get('/hotelesAdmin/:idHotel', md_autenticacion.Auth, adminAppController.HotelesUsuarios);


// Registrar hotel
api.post("/registrarHotel", md_autenticacion.Auth, adminAppController.agregarHotelAdmin);


// Eliminar Rol Admin Hotel
api.delete("/rolAdminHotelEliminar/:idUsuario", md_autenticacion.Auth, adminAppController.rolAdminHotelEliminar);

// Obtener Hoteles Admin
api.get('/obtenerHotelesAdmin/:administradorHotel', md_autenticacion.Auth, adminAppController.ObtenerHotelesAdmin);


// Eliminar usuarios

api.delete("/usuariosEliminar/:idUsuario", md_autenticacion.Auth, adminAppController.usuariosEliminar);

// Obtener id ROL_ADMIN_HOTEL
api.get('/obtenerAdminHotel/:idUsuario', md_autenticacion.Auth, adminAppController.getIdAdminHotel);

// Editar Usuarios
api.put('/editarRolAdminHotel/:idUsuario', md_autenticacion.Auth, adminAppController.EditarUsuarios);


// Obtener usuarios por el id
api.get('/obtenerIdUsuario/:idUsuario', md_autenticacion.Auth, adminAppController.UsuariosId);

// Obtener Usuarios
api.get("/obtenerUsuarios", md_autenticacion.Auth, adminAppController.obtenerUsuarios);


// usuarios admin hotel
api.get("/obtenerUsuariosAdminHotel", md_autenticacion.Auth, adminAppController.obtenerUsuariosAdminHotel);

// Ver usuarios rol admin
api.get("/verUsuarios", md_autenticacion.Auth, adminAppController.verUsuarios);

// Agregar administrador hotel
api.post("/agregarAdminHotel", md_autenticacion.Auth, adminAppController.agregarAdministradorHotel);

// Agregar hotel
// api.post("/agregarHotel/:administradorID", md_autenticacion.Auth, adminAppController.agregarHotel);

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

// ver hoteles todos
api.get("/obtenerHotelesTodos", md_autenticacion.Auth, adminAppController.obtenerHotelesTodos);



// ver control agregar
api.post("/registrarControl", md_autenticacion.Auth, adminAppController.controlAgregar);



api.get("/verControles", md_autenticacion.Auth, adminAppController.verControles);


api.get("/verControlNuevo", md_autenticacion.Auth, adminAppController.verControles);

api.put("/editarControles/:idUsuario", md_autenticacion.Auth, adminAppController.editarControles);

// control por id

api.get('/idControlador/:idHab', md_autenticacion.Auth, adminAppController.getControlesId);


// eliminar
api.delete("/eliminarControl/:idControl", md_autenticacion.Auth, adminAppController.eliminarControl);


module.exports = api;


