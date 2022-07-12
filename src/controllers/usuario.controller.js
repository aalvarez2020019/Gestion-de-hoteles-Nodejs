// CONTROLADOR DE USUARIOS
const Usuarios = require('../models/usuario.model');
const Hoteles = require("../models/hoteles.model");
const Habitaciones = require("../models/habitacion.model");
const Eventos = require("../models/eventos.model");
const Reservaciones = require("../models/reservaciones.model");
const Servicios = require("../models/servicios.model");

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


// eliminar reservaciones
function eliminarHabitacion(req, res){

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  var idHab = req.params.idHab;

  Habitaciones.findByIdAndDelete(idHab, (err, eliminarHab) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!eliminarHab) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: eliminarHab});
  })

} 


// ver factura
function getUsuarioAdmin(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  Usuarios.find({rol: "ROL_USUARIO"}, (err, usuariosEncontrados) => {

    if (err) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })
    
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: usuariosEncontrados })
})
  
}

// ver reservaciones por id del usuario
function getUsuarioId(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  var idUsuario = req.params.idUsuario;

  Usuarios.findById(idUsuario, (err, servicioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!servicioEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: servicioEncontrado }

      );
  })
}


// ver reservaciones por id del usuario
function getReservacionesId(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  const usuario = req.params.usuario;

  Reservaciones.find({ usuario: usuario },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}


// eliminar reservaciones
function eliminarReservacion(req, res){

  
  
  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  

  var idReserv = req.params.idReserv;

 

  Reservaciones.findByIdAndDelete(idReserv, (err, eliminarReservacion) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!eliminarReservacion) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: eliminarReservacion});

  })


  

} 

// ver habitaciones ocupadas

function verhabitacionesOcupadas(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  

  Habitaciones.find({estado: "Ocupado"},(err, encontrarUsuarios) => {

    if (err) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })
    if (!encontrarUsuarios) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: encontrarUsuarios })
})

    
}

// ver controles arreglar
function verUsuarios(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  Usuarios.find({rol: "ROL_USUARIO"}, (err, usuariosEncontrados) => {

      if (err) return res.status(500).send({ mensaje: "Error interno al buscar usuarios" });
      if (!usuariosEncontrados)
        return res.status(500).send({ mensaje: "No hay usuarios registrados" });

      return res.status(200).send({ Usuario: usuariosEncontrados });
    });
  
}


function EditarUsuario(req, res) {

  var idUsuario = req.params.idUsuario;
  var parametros = req.body;

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  Usuarios.findByIdAndUpdate(idUsuario, parametros,{ new: true },(err, editarUsuario) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarUsuario) return res.status(403).send({ mensaje: "Error al editar la empresa" });

      return res.status(200).send({ Usuario: editarUsuario });

    }
  );
}

// obtener habitaciones por el id
function usuarioGetId(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  var idUsuario = req.params.idUsuario;

  Usuarios.findById(idUsuario, (err, usuarioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!usuarioEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: usuarioEncontrado }

      );
  })
}

// Eliminar Usuarios
function eliminarUsuarios(req, res){

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  var idUsuario = req.params.idUsuario;

  Usuarios.findByIdAndDelete(idUsuario, (err, usuarioEncontrado) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!usuarioEncontrado) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: usuarioEncontrado});
  })
} 


// Editar Habitaciones hiba en el rol usuario
function editarHabitacionesRolAdmin(req, res) {

  var idUser = req.params.idHabitacion;
  var parametros = req.body;
  // let habitacionModel = new Habitaciones();

  //habitacionModel.totalHab = habitacionModel.stockNoches * habitacionModel.precio;


  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  Habitaciones.findByIdAndUpdate(idUser, parametros, { new: true },(err, editarHabitaciones) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarHabitaciones) return res.status(403).send({ mensaje: "Error al editar la empresa" });

      return res.status(200).send({ Usuario: editarHabitaciones });

    }
  );
}


// ver por el id hotel
function hotelVerId(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  var idHotel = req.params.idHotel;

  Hoteles.findById(idHotel, (err, encontrarHotel) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!encontrarHotel) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: encontrarHotel }

      );
  })
}



// ver por el id de la habitacion
function verIdHabitacion(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  var idHab = req.params.idHab;

  Habitaciones.findById(idHab, (err, habEncontrada) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!habEncontrada) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: habEncontrada }

      );
  })
}

// Obtener eventos habitacion 
function verEventosHotel(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  const hotel = req.params.hotel;

  Eventos.find({ hotel: hotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}

// obtener servicios habitacion
function verServiciosHotel(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  const hotel = req.params.hotel;

  Servicios.find({ hotel: hotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}

// obtener hoteles
function getHoteles(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

    Hoteles.find((err, hotelesEncontrados) => {

      if (err) return res.status(500).send({ mensaje: "Error al buscar" });
      if (hotelesEncontrados) {
        return res.status(200).send({ Usuario: hotelesEncontrados });
      } else {
        return res.status(500).send({ mensaje: "No hay hoteles disponibles" });
      }
    });
  
}

function verHabitacionesHotel(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }

  const hotel = req.params.hotel;

  Habitaciones.find({ hotel: hotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}

// obtener id del hotel
function getIdHotel(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  var idHotel = req.params.idHotel;

  Hoteles.findById(idHotel, (err, hotelEncontrada) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!hotelEncontrada) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: hotelEncontrada }

      );
  })
}

// obtener id habitacion
function getIdHabitacion(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el usuario tiene permisos" });
  }
  
  var idHab = req.params.idHab;

  Habitaciones.findById(idHab, (err, servicioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!servicioEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: servicioEncontrado }

      );
  })
}


// obtener habitaciones
function verHabitacionesUsuario(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }

  Habitaciones.find({estado: "Disponible"}, (err, encontrarHabitaciones) => {
    if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
    if (!encontrarHabitaciones) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: encontrarHabitaciones })
})

}

// Ver reservaciones
function reservacionesVer(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }

  Reservaciones.find((err, encontrarReservaciones) => {
    if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
    if (!encontrarReservaciones) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: encontrarReservaciones })
})

}



// Buscar usuario por id
function obtenerUsuarioId(req, res) {

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }

  var idUsuario = req.params.idUsuario;

  Usuarios.findById(idUsuario, (err, idEncontrado) => {
    if (err)return res.status(500).send({ mensaje: "Error en la peticion del Usuario" });
    if (!idEncontrado) return res.status(500).send({ mensaje: "Error al obtener los datos" });
    return res.status(200).send({ Usuarios: idEncontrado });
  });
}

// Registrar administrador por default
function registrarAdmin() {

  var modeloUsuario = new Usuarios();

  Usuarios.find({ nombreUsuario: "AdminApp" }, (err, usuarioEncontrado) => {

    if (usuarioEncontrado.length > 0) {

    } else {

      modeloUsuario.nombreUsuario = "AdminApp";
      modeloUsuario.email = "AdminApp";
      modeloUsuario.rol = "ROL_ADMIN";

      bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {

        modeloUsuario.password = passwordEncriptada;

        modeloUsuario.save((err, usuarioGuardado) => {


          if (err) return console.log("Error en la peticion");

          if (!usuarioGuardado) return console.log("Error al registrar Admin");

          return console.log("usuario registrado");

        });
      });
    }
  });
}


// Registrar Usuarios
function usuariosRegistrar(req, res) {
    let params = req.body;
    let usuariosModel = new Usuarios();

    if (params.nombreUsuario && params.email && params.password) {
      usuariosModel.nombreUsuario = params.nombreUsuario;
      usuariosModel.email = params.email;
      usuariosModel.password = params.password;
      usuariosModel.hotelHospedado = null;
      usuariosModel.estado = "No hospedado";
      usuariosModel.rol = "ROL_USUARIO";

    Usuarios.find({$and: [{ email: usuariosModel.email }]}).exec((err, usuarioEncontrado) => {

        if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
            
          return res.status(500).send({ mensaje: "El email ya existe" });

        } else {
          bcrypt.hash(params.password, null, null, (err, passwordencriptada) => {

            usuariosModel.password = passwordencriptada;
            usuariosModel.save((err, usuarioRegistrado) => {
              if (usuarioRegistrado) {
                return res.status(200).send({ Usuarios: usuarioRegistrado });
              } else {
                return res.status(500).send({ mensaje: "No se puede registrar" });
              }
            });
          });
        }
      });

     } else {
      return res.status(500).send({ mensaje: "Porfavor llenar todos los campos" });
    } 

   
}

// Logearse
function login(req, res) {

  var parametros = req.body;

  Usuarios.findOne({ email: parametros.email }, (err, emailEncontrado) => {

    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

    if (emailEncontrado) {

      bcrypt.compare(parametros.password, emailEncontrado.password,

        (err, verificacionPassword) => {
          
          if (verificacionPassword) {

            if (parametros.obtenerToken === "true") {

              return res.status(200).send({ token: jwt.crearToken(emailEncontrado) });

            } else {

              emailEncontrado.password = undefined;
              return res.status(200).send({ email: emailEncontrado });
            }
          } else {
            return res.status(500).send({ mensaje: "Las contrasena no coincide" });
          }
        }
      );
    } else {
      return res.status(500).send({ mensaje: "Error, el correo no se encuentra registrado" });
    }
  });
}

// Buscar habitaciones por nombre del hotel
function buscarHabitacionesHotel(req, res) {
  let params = req.body;

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }

    if (params.nombre) {
      Hoteles.findOne({ nombre: params.nombre }, (err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error interno en la peticion" });
        if (hotelEncontrado) {
          Habitaciones.find({ hotel: hotelEncontrado._id }, (err, habitacionesEncontradas) => {
              if (err)
                return res.status(500).send({ mensaje: "Error interno en la peticion" });
              if (habitacionesEncontradas) {
                return res.status(200).send({ Usuarios: habitacionesEncontradas });
              } else {
                return res.status(500).send({ mensaje: "No encontraron habitaciones" });
              }
            }
          );
        } else {
          return res.status(500).send({ mensaje: "No se encontro el hotel" });
        }
      }

      );
    }
  
}

// Buscar eventos por nombre del hotel, review
function buscarEventosHotel(req, res) {
  let params = req.body;

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }
  
    if (params.nombre) {
      Hoteles.findOne({ nombre: params.nombre }, (err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error interno al buscar eventos" });
        if (hotelEncontrado) {
          console.log(hotelEncontrado);
          Eventos.find({ hotel: hotelEncontrado._id },(err, eventoEncontrado) => {
              if (err) return res.status(500).send({ mensaje: "Error interno al buscar eventos" });
              if (eventoEncontrado) {
                return res.status(200).send({ Usuarios: eventoEncontrado });
              } else {
                return res.status(500).send({ mensaje: "El hotel no tiene eventos" });
              }
            }
          );
        } else {
          return res.status(500).send({ mensaje: "El hotel no existe" });
        }
      });
    } else {
      return res.status(500).send({ mensaje: "Llene el campo obligatorio" });
    }
  
}

// Reservaciones con el id de la habitacion

function reservacion(req, res) {
  let habitacionID = req.params.habitacionID;
  let reservacionesModel = new Reservaciones();
  let params = req.body;

  if (req.user.rol !== "ROL_USUARIO") {
    return res.status(500).send({ mensaje: "Solo el rol usuario tiene permisos" });
  }

    if (req.user.estado != "Hospedado") {

      reservacionesModel.fechaInicio = params.fechaInicio;
      reservacionesModel.fechaFin = params.fechaFin;

      Usuarios.findOneAndUpdate({ _id: req.user.sub }, { estado: "Hospedado" }, { new: true, useFindAndModify: true }, (err, usuarioActualizado) => {

          if (err)
            return res.status(500).send({ mensaje: "Error al cambiar el estado del usuario" });
          if (usuarioActualizado) {
            reservacionesModel.usuario = usuarioActualizado._id;

            Habitaciones.findOneAndUpdate({ _id: habitacionID }, { estado: "Ocupado" }, { new: true, useFindAndModify: true }, (err, habitacionActualizada) => {

                if (err) return res.status(500).send({mensaje: "No se pudo cambiar el estado de la habitacion"});
                if (habitacionActualizada) {
                  reservacionesModel.habitacion = habitacionActualizada._id;

                  Usuarios.findOneAndUpdate({ _id: req.user.sub },{ hotelHospedado: habitacionActualizada.hotel }, { new: true, useFindAndModify: true }, (err, hotelActualizado) => {
                      if (err) return res.status(500).send({mensaje: "No se pudo actualizar el hotel"});
                      if (hotelActualizado) {
                        Usuarios.findOneAndUpdate();

                        reservacionesModel.save((err, reservacionGuardada) => {
                          if (reservacionGuardada) {
                            return res.status(200).send({ Usuarios: reservacionGuardada });
                          } else {
                            return res.status(500).send({mensaje: "No se pudo guardar la reservacion"});
                          }
                        });
                      } else {
                        return res.status(500).send({ mensaje: "Error al actualizar hotel" });
                      }
                    }
                  );
                }
              }
            );
          } else {
            return res.status(500).send({ mensaje: "No se pudo actualizar" });
          }
        }
      );
    } else {
      return res.status(500).send({ mensaje: "Ya se encuentra hospedado en un hotel" });
    }
  
}

module.exports = {
    registrarAdmin,
    usuariosRegistrar,
    login,
    buscarHabitacionesHotel,
    buscarEventosHotel,
    obtenerUsuarioId,
    reservacion,
    verHabitacionesUsuario,
    reservacionesVer,
    getIdHotel,
    getIdHabitacion,
    verEventosHotel,
    verServiciosHotel,
    getHoteles,
    verHabitacionesHotel,
    editarHabitacionesRolAdmin,
    verIdHabitacion,
    hotelVerId,
    EditarUsuario,
    usuarioGetId,
    eliminarUsuarios,
    verUsuarios,
    verhabitacionesOcupadas,
    eliminarReservacion,
    getReservacionesId,
    getUsuarioAdmin,
    getUsuarioId,
    eliminarHabitacion

    // obtenerUsuarios,
    
    
    
}
