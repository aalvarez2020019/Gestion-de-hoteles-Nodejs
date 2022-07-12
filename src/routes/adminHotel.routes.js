const express = require('express');
const adminHotelController = require('../controllers/adminHotel.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// ver id hotel
api.get('/verIdHotel/:idHotel', md_autenticacion.Auth, adminHotelController.verIdHotel);

// ver factura por id habitacion
api.get('/getFactura/:habitacion', md_autenticacion.Auth, adminHotelController.getFactura);

// eliminar factura
api.delete('/eliminarFactura/:idFactura', md_autenticacion.Auth,adminHotelController.eliminarFactura);

// ver usuarios segun reservacion

// api.get('/veruserReservaciones/:usuario', md_autenticacion.Auth, adminHotelController.obtenerUsuariosReservacion);


api.get("/rolUsuarioGet", md_autenticacion.Auth,adminHotelController.rolUsuarioGet);



// agregar noches
// api.post("/registrarNoches/:idHab", md_autenticacion.Auth, adminHotelController.AgregarhabitacionesId);


/* CRUD EVENTOS */
api.put('/editarEvento/:idEvento', md_autenticacion.Auth, adminHotelController.editarEvento);
api.delete('/eliminarEvento/:idEvento', md_autenticacion.Auth,adminHotelController.eliminarEvento);
api.get('/obtenerIdEvento/:idEvento', md_autenticacion.Auth,adminHotelController.EventosId);
api.get("/obtenerEventos", md_autenticacion.Auth,adminHotelController.obtenerEventos);

// Por id hotel no 
api.get('/obtenerEventosHotel/:hotel', md_autenticacion.Auth, adminHotelController.ObtenerEventosHotel);


/* CRUD SERVICIOS */
api.put('/editarServicio/:idServicio', md_autenticacion.Auth, adminHotelController.editarServicios);
api.delete('/eliminarServicio/:idServicio', md_autenticacion.Auth,adminHotelController.eliminarServicios);
api.get('/obtenerIdServicio/:idServicio', md_autenticacion.Auth,adminHotelController.ServiciosId);
api.get("/obtenerServicios", md_autenticacion.Auth,adminHotelController.obtenerServiciosAll);

// Por el id hotel
api.get('/obtenerServiciosHotel/:hotel', md_autenticacion.Auth, adminHotelController.obtenerServiciosHotel);


/* CRUD HABITACIONES */
api.put('/editarHabitaciones/:idHabitaciones', md_autenticacion.Auth, adminHotelController.editarHabitaciones);
api.delete('/eliminarHabitaciones/:idHab', md_autenticacion.Auth,adminHotelController.eliminarHabitaciones);
api.get('/obtenerIdHabitacionnn/:idHab', md_autenticacion.Auth,adminHotelController.HabitacionesId);
api.get("/obtenerHabitaciones", md_autenticacion.Auth,adminHotelController.obtenerHabitacionesTodas);

// Por el id del hotel
api.get('/obtenerHabitacionesHotel/:hotel', md_autenticacion.Auth, adminHotelController.obtenerHabitacionesHotel);




// Ver Hoteles
api.get("/verHotelesDelAdmin", md_autenticacion.Auth, adminHotelController.ObtenerHoteles);

// Registrar Habitaciones oficial
api.post("/registrarHabitaciones", md_autenticacion.Auth, adminHotelController.habitacionesAgregar);

// Registrar eventos oficial
api.post("/registrarEventos", md_autenticacion.Auth, adminHotelController.eventosAgregar);

// Registrar servicios oficial
api.post("/registrarServicios", md_autenticacion.Auth, adminHotelController.serviciosAgregar);



// disponibilidad
// api.get("/verHabitacionesDisponibles", md_autenticacion.Auth, adminHotelController.verHabitacionesDisponibles);


// ver eventos
api.get('/verEventos', md_autenticacion.Auth, adminHotelController.verEventos);



// ver servicios
api.get('/verServicios', md_autenticacion.Auth, adminHotelController.verServicios);

// ver habitaciones disponibles
api.get('/habitacionesDisponibles', md_autenticacion.Auth, adminHotelController.verHabitacionesDisponibles);

// ver reservaciones
api.get('/verReservaciones', md_autenticacion.Auth, adminHotelController.verReservaciones);

// obtener reservaciones opcion 2
api.get('/obtenerReservaciones/:idHotel', md_autenticacion.Auth, adminHotelController.ObtenerReservaciones);

// buscar hospedajes
api.post("/buscarHospedajes", md_autenticacion.Auth, adminHotelController.buscarHospedajes);

// ver hospedajes
api.get("/verHospedajes", md_autenticacion.Auth, adminHotelController.verHospedajes);

// factura
api.post("/factura/:idReservacion", md_autenticacion.Auth, adminHotelController.facturar);



// Agregar servicios nuevo
// api.post("/agregarServiciosNuevo/:hotelID", md_autenticacion.Auth, adminHotelController.agregarServiciosNuevo);



module.exports = api;
