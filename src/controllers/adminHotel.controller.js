const Habitaciones = require("../models/habitacion.model");
const Hoteles = require("../models/hoteles.model");
const Eventos = require("../models/eventos.model");
const Servicios = require("../models/servicios.model");
const Reservaciones = require("../models/reservaciones.model");
const Usuarios = require("../models/usuario.model");
const Factura = require("../models/factura.model");

// eliminar factura para
function eliminarFactura(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  var idFactura = req.params.idFactura;

    Factura.findByIdAndDelete(idFactura, (err, usuarioEliminado) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!usuarioEliminado) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: usuarioEliminado});
  })
}


// ver factura
function getFactura(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  const habitacion = req.params.habitacion;

  Factura.find({ habitacion: habitacion },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );
  
}

// ver usuarios ROL_USARIO
function rolUsuarioGet(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  Usuarios.find({rol: "ROL_USUARIO"}, (err, usuariosEncontrados) => {

      if (err) return res.status(500).send({ mensaje: "Error interno al buscar usuarios" });
      if (!usuariosEncontrados)
        return res.status(500).send({ mensaje: "No hay usuarios registrados" });

      return res.status(200).send({ Usuario: usuariosEncontrados });
    });
  
}


// Obtener hoteles Admin
function obtenerUsuariosReservacion(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  const usuario = req.params.usuario;

  Reservaciones.find({ usuario: usuario },(err, usuarioEncontrado) => {

      return res.status(200).send({ Usuario: usuarioEncontrado });
    }
  );

}




// obtener id del hotel
function verIdHotel(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }
  
  var idHotel = req.params.idHotel;

  Hoteles.findById(idHotel, (err, encontrarHotel) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!encontrarHotel) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: encontrarHotel }

      );
  })
}

/* CRUD, EDITAR, ELIMINAR, GETID, GET EVENTO */

// editar evento
function editarEvento(req, res) {

  var idUser = req.params.idEvento;
  var parametros = req.body;

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }
  
  Eventos.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarEventos) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarEventos) return res.status(403).send({ mensaje: "Error al editar la empresa" });

      return res.status(200).send({ Usuario: editarEventos });

    }
  );
}

// eliminar evento
function eliminarEvento(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  var idProd = req.params.idEvento;

    Eventos.findByIdAndDelete(idProd, (err, usuarioEliminado) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!usuarioEliminado) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: usuarioEliminado});
  })
}

// Get Id
function EventosId(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }
  
  var idEvento = req.params.idEvento;

  Eventos.findById(idEvento, (err, eventoEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!eventoEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: eventoEncontrado }

      );
  })
}

// get todos los eventos
function obtenerEventos(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  Eventos.find({ idUsuario: req.user.sub }, (err, obtenerEventos) => {

    return res.status(200).send({ Usuario: obtenerEventos })
  })


}

// Obtener hoteles Admin
function ObtenerEventosHotel(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  const hotel = req.params.hotel;

  Eventos.find({ hotel: hotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}


/* CRUD, EDITAR, ELIMINAR, GETID, GET SERVICIOS */

// EDITAR SERVICIOS
function editarServicios(req, res) {

  var idUser = req.params.idServicio;
  var parametros = req.body;

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }
  
  Servicios.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarServicios) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarServicios) return res.status(403).send({ mensaje: "Error al editar la empresa" });

      return res.status(200).send({ Usuario: editarServicios });

    }
  );
}

// Eliminar servicios
function eliminarServicios(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  var idProd = req.params.idServicio;

  Servicios.findByIdAndDelete(idProd, (err, servicioEliminado) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!servicioEliminado) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: servicioEliminado});
  })
}

// Get Id
function ServiciosId(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }
  
  var idServicio = req.params.idServicio;

  Servicios.findById(idServicio, (err, servicioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!servicioEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: servicioEncontrado }

      );
  })
}

// Obtener Servicios
function obtenerServiciosAll(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  Servicios.find({ idUsuario: req.user.sub }, (err, obtenerServicios) => {

    return res.status(200).send({ Usuario: obtenerServicios })
  })

}

// servicios por id del hotel no
function obtenerServiciosHotel(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  const hotel = req.params.hotel;

  Servicios.find({ hotel: hotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}

/* CRUD, EDITAR, ELIMINAR, GETID, GET HABITACIONES */

// Editar Habitaciones
function editarHabitaciones(req, res) {

  var idUser = req.params.idHabitaciones;
  var parametros = req.body;

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }
  
  Habitaciones.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarServicios) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarServicios) return res.status(403).send({ mensaje: "Error al editar la empresa" });

      return res.status(200).send({ Usuario: editarServicios });

    }
  );
}

// Eliminar habitaciones
function eliminarHabitaciones(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  var idProd = req.params.idHab;

  Habitaciones.findByIdAndDelete(idProd, (err, habEliminada) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!habEliminada) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: habEliminada});
  })
}


// obtener habitaciones por el id
function HabitacionesId(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }
  
  var idHab = req.params.idHab;

  Habitaciones.findById(idHab, (err, servicioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!servicioEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: servicioEncontrado }

      );
  })
}

// Obtener todas las habitaciones
function obtenerHabitacionesTodas(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  Habitaciones.find({ idUsuario: req.user.sub }, (err, obtenerEventos) => {

    return res.status(200).send({ Usuario: obtenerEventos })
  })

}

// obtener habitaciones por el id del hotel
function obtenerHabitacionesHotel(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  const hotel = req.params.hotel;

  Habitaciones.find({ hotel: hotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}



/* PARTES DE AGREGAR */
// Agregar Habitaciones
function habitacionesAgregar (req,res){

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  let habitacionModel = new Habitaciones();
  let params = req.body;

  habitacionModel.nombreHabitacion = params.nombreHabitacion;
  habitacionModel.descripcion = params.descripcion;
  habitacionModel.hotelServicios = params.hotelServicios;
  habitacionModel.stockNoches = params.stockNoches;
  habitacionModel.estado = "Disponible";
  habitacionModel.precio = params.precio;
  habitacionModel.totalHab = habitacionModel.precio * habitacionModel.stockNoches;
  habitacionModel.nit = params.nit;
  habitacionModel.hotel = params.hotel;
  habitacionModel.idUsuario = req.user.sub;

  if (params.nombreHabitacion == '' || params.descripcion == '' || params.hotelServicios == '' || params.stockNoches == '' || 
     params.precio == '' || params.totalHab == '' || params.nit == '' || params.hotel == ''){

      return res.status(500).send({mensaje:'No puede hacer la peticion con campos vacios'})
  }

  Habitaciones.findOne({nombreHabitacion: habitacionModel.nombreHabitacion}, (err, servicioEncontrado)=>{

      if (err) return res.status(500).send({mensaje:'Error al consultar el hotel'})
      if (servicioEncontrado) return res.status(500).send({mensaje:'Ya fue creado el hotel'})

      habitacionModel.save((err, habGuardada)=>{
          if (err) return res.status(500).send({mensaje:'Error al guardar la habitacion'})

          if (!habGuardada) return res.status(500).send({mensaje:'La peticion esta vacia'})

          return res.status(200).send({habGuardada})
      })
  })
}

// agregar eventos
function eventosAgregar (req,res){

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  let eventosModel = new Eventos();
  let params = req.body;

  eventosModel.nombre = params.nombre;
  eventosModel.descripcion = params.descripcion;
  eventosModel.hotel = params.hotel;
  eventosModel.idUsuario = req.user.sub;

  

  if (params.nombre == '' || params.descripcion == '' || params.hotel == ''){

      return res.status(500).send({mensaje:'No puede hacer la peticion con campos vacios'})
  }

  Eventos.findOne({nombre: eventosModel.nombre}, (err, servicioEncontrado)=>{

      if (err) return res.status(500).send({mensaje:'Error al consultar el evento'})
      if (servicioEncontrado) return res.status(500).send({mensaje:'Ya fue creado el evento'})

      eventosModel.save((err, eventoGuardado)=>{
          if (err) return res.status(500).send({mensaje:'Error al guardar la habitacion'})

          if (!eventoGuardado) return res.status(500).send({mensaje:'La peticion esta vacia'})

          return res.status(200).send({eventoGuardado})
      })
  })
}

// agregar servicios
function serviciosAgregar (req,res){

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  let serviciosModel = new Servicios();
  let params = req.body;

  serviciosModel.nombreServicio = params.nombreServicio;
  serviciosModel.descripcionServicio = params.descripcionServicio;
  serviciosModel.hotel = params.hotel;
  serviciosModel.idUsuario = req.user.sub;
  

  if (params.nombreServicio == '' || params.descripcionServicio == '' || params.hotel == ''){

      return res.status(500).send({mensaje:'No puede hacer la peticion con campos vacios'})
  }

  Servicios.findOne({nombreServicio: serviciosModel.nombreServicio}, (err, servicioEncontrado)=>{

      if (err) return res.status(500).send({mensaje:'Error al consultar el evento'})
      if (servicioEncontrado) return res.status(500).send({mensaje:'Ya fue creado el evento'})

      serviciosModel.save((err, servicioGuardado)=>{
          if (err) return res.status(500).send({mensaje:'Error al guardar la habitacion'})

          if (!servicioGuardado) return res.status(500).send({mensaje:'La peticion esta vacia'})

          return res.status(200).send({servicioGuardado})
      })
  })
}

// Obtener Sucursales

function ObtenerHoteles(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  Hoteles.find({ administradorHotel: req.user.sub }, (err, sucursalEmpresaEncontrada) => {

    return res.status(200).send({ AdminApp: sucursalEmpresaEncontrada })
  })

}




// Ver eventos
function verEventos(req, res) {

    if (req.user.rol !== "ADMIN_HOTEL") {
        return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
    }

      Hoteles.findOne({ administradorHotel: req.user.sub }, (err, adminEncontrado) => {
          if (err)
            return res.status(500).send({ mensaje: "Erro interno al verificar el hotel" });
          if (adminEncontrado) {
            Eventos.find({ hotel: adminEncontrado._id }, (err, eventoEncontrado) => {
                if (err)
                  return res.status(500).send({ mensaje: "Error interno al buscar habitaciones" });
                if (eventoEncontrado) {
                  return res.status(200).send({ AdminHotel: eventoEncontrado });
                } else {
                  return res.status(500).send({ mensaje: "Todas las habitaciones estan ocupadas" });
                }
              }
            );
          }
        }
      );
    
}


// ver servicios
function verServicios(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

    Hoteles.findOne({ administradorHotel: req.user.sub }, (err, adminEncontrado) => {

        if (err) return res.status(500).send({ mensaje: "Error al verificar el hotel" });
        if (adminEncontrado) {
          Servicios.find({ hotel: adminEncontrado._id },(err, servicioEncontrados) => {
              if (err) return res.status(500).send({ mensaje: "Error al buscar las habitaciones" });
              if (servicioEncontrados) {
                return res.status(200).send({ AdminHotel: servicioEncontrados });
              } else {
                return res.status(500).send({ mensaje: "Las habitaciones estan ocupadas" });
              }
            }
          );
        }
      }
    );
  
}

// buscar habitaciones disponibles, no esta bien, arreglarlo
function verHabitacionesDisponibles(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }
  

  Habitaciones.find({estado: "Disponible"},(err, usuariosEncontrados) => {

    if (err) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ AdminHotel: usuariosEncontrados })
})
  
  

    
}
  


// Ver reservaciones dependiendo del administrador del hotel, se podran ver
function verReservaciones(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

    Hoteles.findOne({ administradorHotel: req.user.sub }, (err, hotelAdmin) => {
        if (err) return res.status(500).send({ mensaje: "Erro interno al verificar el hotel" });
        if (hotelAdmin) {
          Habitaciones.findOne({ hotel: hotelAdmin._id }, (err, habitacionEncontrada) => {
              if (err) return res.status(500).send({ mensaje: "Error al verificar" });
              if (habitacionEncontrada) {
                Reservaciones.find({ habitacion: habitacionEncontrada._id }, (err, reservacionesEncontradas) => {
                    if (err) return res.status(500).send({mensaje: "Error interno al buscar reservaciones"});
                    if (reservacionesEncontradas) {
                      return res.status(200).send({ AdminHotel: reservacionesEncontradas });
                    } else {
                      return res.status(500).send({mensaje: "No hay reservaciones hechas en este hotel",});
                    }
                  }
                );
              } else {
                return res.status(500).send({ mensaje: "Error al verificar" });
              }
            }
          );
        } else {
          return res.status(500).send({ mensaje: "El administrador no esta a cargo de un hotel" });
        }
      }
    );
  
}

// Opcion b de obtener las reservaciones
function ObtenerReservaciones(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  const idHotel = req.params.idHotel;

  Reservaciones.find({ idHotel: idHotel },(err, reservacionEncontrada) => {

      return res.status(200).send({ AdminHotel: reservacionEncontrada });
    }
  );

}

// Datos del rol usuario al momento de buscar hospedado método post
function buscarHospedajes(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  let params = req.body;
    Hoteles.findOne({ administradorHotel: req.user.sub },(err, hotelAdmin) => {
        if (err)
          return res.status(500).send({ mensaje: "Error interno al verificar hotel" });
        if (hotelAdmin) {

        Usuarios.findOne({$and: [{ usuario: params.buscar }, { hotelHospedado: hotelAdmin._id }],}).exec((err, usuarioEncontrado) => {
            if (err)
              return res.status(500).send({ mensaje: "Error interno al verificar cliente" });
            if (usuarioEncontrado) {
              return res.status(200).send({ AdminHotel: usuarioEncontrado });
            } else {
              return res.status(500).send({ mensaje: "El cliente no se encuentra en su hotel" });
            }
          });
        } else {
          return res.status(500).send({ mensaje: "Usted no esta acargo de ningun hotel" });
        }
      }
    );
  
}

// Ver hospedaje método get
function verHospedajes(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

    Hoteles.findOne({ administradorHotel: req.user.sub }, (err, hotelAdmin) => {

        if (err) return res.status(500).send({mensaje: "No se pudo verificar el administrador del hotel"});
        if (hotelAdmin) {
          Usuarios.find({ hotelHospedado: hotelAdmin._id }, (err, hospedajesEncontrados) => {
              if (err)
                return res.status(500).send({ mensaje: "No se pudo verificar los usuarios" });
              if (hospedajesEncontrados) {
                return res.status(200).send({ AdminHotel: hospedajesEncontrados });
              } else {
                return res.status(500).send({ mensaje: "No hay clientes en este hotel" });
              }
            }
          );
        } else {
          return res.status(500).send({ mensaje: "No esta a cargo de ningún hotel" });
        }
      }
    );
  
}


// Factura
function facturar(req, res) {
  let idReservacion = req.params.idReservacion;
  var facturaModel = new Factura();

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

    Factura.findOne({ reservacion: idReservacion }, (err, facturaEncontrada) => {
        if (!facturaEncontrada) {

          Reservaciones.findById(idReservacion, (err, reservacionEncontrada) => {
              if (err) return res.status(500).send({ mensaje: "Error interno" });
              if (reservacionEncontrada) {
                facturaModel.reservacion = reservacionEncontrada._id;
                facturaModel.usuario = reservacionEncontrada.usuario;
                facturaModel.fechaFin = reservacionEncontrada.fechaFin;
                facturaModel.fechaInicio = reservacionEncontrada.fechaInicio;


                


                Habitaciones.findById({ _id: reservacionEncontrada.habitacion }, (err, habitacionEncontrada) => {

                  
                    if (err) return res.status(500).send({ mensaje: "Error interno" });
                    if (habitacionEncontrada) {

                      facturaModel.habitacion = habitacionEncontrada._id;
                      facturaModel.total = habitacionEncontrada.totalHab;
                      facturaModel.servicioHotel = habitacionEncontrada.hotelServicios;
                      facturaModel.noNit = habitacionEncontrada.nit;

                      // si no sirve quitarlo
                      facturaModel.precioDeHabitacion = habitacionEncontrada.precio;
                      facturaModel.noNoches = habitacionEncontrada.stockNoches;
                      

                      Hoteles.findById( habitacionEncontrada.hotel, (err, hotelEncontrado) => {
                          if (err) return res.status(500).send({ mensaje: "Error interno" });
                          if (hotelEncontrado) {

                            Servicios.find({ hotel: hotelEncontrado._id },(err, serviciosEncontrados) => {

                              //facturaModel.servicioHotel = serviciosEncontrados.nombreServicio;

                                if (err) return res.status(500).send({ mensaje: "Error interno" });
                                if (serviciosEncontrados) {


                                  var servicios; 
                                  for ( let i = 0; i < serviciosEncontrados.length; i++) {
                                    servicios = serviciosEncontrados[i]._id;
                                    //servicios = serviciosEncontrados[i].nombreServicio;
                                    facturaModel.servicios.push(
                                      serviciosEncontrados[i]._id,
                                      // serviciosEncontrados[i].nombreServicio,
                                  
                                    );
                                    facturaModel.save(
                                      (err, facturaGuardada) => {
                                        if (err)return res.status(500).send({mensaje: "Error en la petición"});

                                        if (!facturaGuardada)
                                          return res.status(500).send({mensaje: "Error al guardar la factura"});

                                        return res.status(200).send({ AdminHotel: facturaGuardada });
                                      }
                                    );
                                  }
                                } else {
                                  return res.status(500).send({ mensaje: "No hay servicios" });
                                }


                              }
                            );

                            

                            
                          } else {
                            return res.status(500).send({ mensaje: "No hay hotel" });
                          }
                        }
                      );


                                                   


                    } else {
                      return res.status(500).send({ mensaje: "No se encontro la habitacion" });
                    }

                  
                  }
                );

              
                
              } else {
                return res.status(500).send({ mensaje: "Error interno" });
              }
            

            }
          );

          
        } else {
          return res.status(500).send({ mensaje: "Ya existe una factura creada" });
        }
      }
    )
  
}






module.exports = {
    // agregarHabitaciones,
    //agregarEventos,
    verEventos,
    // agregarServicios,
    verServicios,
    verHabitacionesDisponibles,
    verReservaciones,
    ObtenerReservaciones,
    buscarHospedajes,
    verHospedajes,
    facturar,
    // agregarHabitacionesNuevo,
    ObtenerHoteles,
    editarEvento,
    eliminarEvento,
    EventosId,
    obtenerEventos,
    ObtenerEventosHotel,
    editarServicios,
    eliminarServicios,
    ServiciosId,
    obtenerServiciosAll,
    obtenerServiciosHotel,
    editarHabitaciones,
    eliminarHabitaciones,
    HabitacionesId,
    habitacionesAgregar,
    obtenerHabitacionesTodas,
    obtenerHabitacionesHotel,
    eventosAgregar,
    serviciosAgregar,
    verIdHotel,
    obtenerUsuariosReservacion,
    rolUsuarioGet,
    getFactura,
    eliminarFactura
    
}