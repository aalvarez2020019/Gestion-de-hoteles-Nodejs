const Hoteles = require("../models/hoteles.model");
const Habitaciones = require("../models/habitacion.model");
const Eventos = require("../models/eventos.model");
const Reservaciones = require("../models/reservaciones.model");
const Servicios = require("../models/servicios.model");


function verHoteles(req, res) {

    Hoteles.find((err, usuariosEncontrados) => {
  
        if (err) return res.status(500).send({ mensaje: "Error interno al buscar usuarios" });
        if (!usuariosEncontrados)
          return res.status(500).send({ mensaje: "No hay usuarios registrados" });
        return res.status(200).send({ Usuario: usuariosEncontrados });
      });
    
}


function verHabitacionesHotel(req, res) {

  
    const hotel = req.params.hotel;
  
    Habitaciones.find({ hotel: hotel },(err, hotelesEncontrados) => {
  
        return res.status(200).send({ Usuario: hotelesEncontrados });
      }
    );
  
  }

  function verServiciosPorHotel(req, res) {
  
    const hotel = req.params.hotel;
  
    Servicios.find({ hotel: hotel },(err, serviciosEncontrados) => {
  
        return res.status(200).send({ Usuario: serviciosEncontrados });
      }
    );
  
  }

function verEventosPorHotel(req, res) {
  
    const hotel = req.params.hotel;
  
    Eventos.find({ hotel: hotel },(err, hotelesEncontrados) => {
  
        return res.status(200).send({ Usuario: hotelesEncontrados });
      }
    );
  
}

// get id hoteles
function HotelesId(req, res) {

    
    
    var idHotel = req.params.idHotel;
  
    Hoteles.findById(idHotel, (err, hotelEncontrado) => {
  
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!hotelEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });
  
        return res.status(200).send({ Usuario: hotelEncontrado }
  
        );
    })
}

module.exports = {
    verHoteles,
    verHabitacionesHotel,
    verServiciosPorHotel,
    verEventosPorHotel,
    HotelesId
}
  