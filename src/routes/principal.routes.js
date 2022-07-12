const express = require('express');
const principalController = require('../controllers/principal.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

// ver sin token
api.get("/verhotelesGeneral", principalController.verHoteles);

// ver habitaciones
api.get('/verhabitacionesGeneral/:hotel', principalController.verHabitacionesHotel);

// ver serviciosAgregar
api.get('/verServiciosTodos/:hotel', principalController.verServiciosPorHotel);

// ver eventos
api.get('/verEventosTodos/:hotel', principalController.verEventosPorHotel);

// ver hoteles id
api.get('/verHotelesId/:idHotel', principalController.HotelesId);




module.exports = api;
