const Usuarios = require("../models/usuario.model");
const Hoteles = require("../models/hoteles.model");
const bcrypt = require("bcrypt-nodejs");
const Control = require("../models/control.model");
const Habitaciones = require("../models/habitacion.model");
const Reservaciones = require("../models/reservaciones.model");

// ver reservaciones por habitacion

function verReservacionesHotel(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }


  const habitacion = req.params.habitacion;

  Reservaciones.find({ habitacion: habitacion },(err, reservaEncontradas) => {

      return res.status(200).send({ Usuario: reservaEncontradas });
    }
  );

}


// obtener habitaciones por el id
function getHabId(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }
  
  var idHab = req.params.idHab;

  Habitaciones.findById(idHab, (err, servicioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!servicioEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: servicioEncontrado }

      );
  })
}


// ver hoteles por rol admin
function verHabitacionesHotel(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }


  const hotel = req.params.hotel;

  Habitaciones.find({ hotel: hotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ Usuario: hotelesEncontrados });
    }
  );

}


// ver controles nuevo
function controlNuevoVer(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

  Control.find((err, controlesEncontrados) => {

      if (err) return res.status(500).send({ mensaje: "Error interno al buscar usuarios" });
      if (!controlesEncontrados)
        return res.status(500).send({ mensaje: "No hay usuarios registrados" });
      return res.status(200).send({ Usuario: controlesEncontrados });
    });
  
}


// Editar controles
function editarControles(req, res) {

  var idUser = req.params.idUsuario;
  var parametros = req.body;

  if (req.user.rol !== "ROL_ADMIN") {
      return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  Control.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarControl) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarControl) return res.status(403).send({ mensaje: "Error al editar el control" });

      return res.status(200).send({ Usuario: editarControl });

    }
  );
}

// obtener habitaciones por el id
function getControlesId(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }
  
  var idHab = req.params.idHab;

  Control.findById(idHab, (err, servicioEncontrado) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!servicioEncontrado) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ Usuario: servicioEncontrado }

      );
  })
}

// Eliminar Usuarios
function eliminarControl(req, res){

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  var idControl = req.params.idControl;

    Control.findByIdAndDelete(idControl, (err, controlEliminado) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!controlEliminado) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ Usuario: controlEliminado});
  })
} 


// ver controles arreglar
function verControles(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

  Control.find((err, controlesEncontrados) => {

      if (err) return res.status(500).send({ mensaje: "Error interno al buscar usuarios" });
      if (!controlesEncontrados)
        return res.status(500).send({ mensaje: "No hay usuarios registrados" });
      return res.status(200).send({ Usuario: controlesEncontrados });
    });
  
}

// agregar control
function controlAgregar (req,res){

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
}

  let controModel = new Control();
  let params = req.body;

  controModel.nombreHotel = params.nombreHotel;
  controModel.cantidad = params.cantidad;
  controModel.idUsuario = req.user.sub;

  if (params.nombreHotel == '' || params.cantidad == '' ){

      return res.status(500).send({mensaje:'No puede hacer la peticion con campos vacios'})
  }

  Control.findOne({nombreHotel: controModel.nombreHotel}, (err, controlEncontrado)=>{

      if (err) return res.status(500).send({mensaje:'Error al consultar el hotel'})
      if (controlEncontrado) return res.status(500).send({mensaje:'Ya fue creado el hotel'})

      controModel.save((err, controlE)=>{

          if (err) return res.status(500).send({mensaje:'Error al guardar la habitacion'})

          if (!controlE) return res.status(500).send({mensaje:'La peticion esta vacia'})

          return res.status(200).send({controlE})
      })
  })
}


// Obtener Sucursales

function ObtenerHotelesRolAdmin(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  Hoteles.find({ administradorHotel: req.user.sub }, (err, sucursalEmpresaEncontrada) => {

    return res.status(200).send({ AdminApp: sucursalEmpresaEncontrada })
  })

}

// Obtener Hoteles ID
function HotelesUsuarios(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  var idHotel = req.params.idHotel;

  Hoteles.findById(idHotel, (err, empresaEncontrada) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!empresaEncontrada) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ AdminApp: empresaEncontrada }

      );
  })
}

// Registrar admin hotel funciona jaja

function agregarHotelAdmin (req,res){
  if (req.user.rol != 'ROL_ADMIN') return res.status(400).send({mensaje:'Solo los administradores pueden agregar usuario'})


  let hotelModel = new Hoteles()
  let params = req.body;

  hotelModel.nombre = params.nombre;
  hotelModel.pais = params.pais;
  hotelModel.ciudad = params.ciudad;
  hotelModel.direccion = params.direccion;
  hotelModel.descripcion = params.descripcion;
  hotelModel.administradorHotel = params.administradorHotel;

  if (params.nombre == '' || params.pais == '' || params.ciudad == '' || params.direccion == '' || params.descripcion == '' ||
     params.administradorHotel == '' ){

      return res.status(500).send({mensaje:'No puede hacer la peticion con campos vacios'})
  }

  Hoteles.findOne({nombre: hotelModel.nombre},(err, servicioEncontrado)=>{

      if (err) return res.status(500).send({mensaje:'Error al consultar el hotel'})
      if (servicioEncontrado) return res.status(500).send({mensaje:'Ya fue creado el hotel'})

      hotelModel.save((err, hotelGuardado)=>{
        
          if (err) return res.status(500).send({mensaje:'Error al guardar el hotel'})
          if (!hotelGuardado) return res.status(500).send({mensaje:'La peticion esta vacia'})

          return res.status(200).send({hotelGuardado})
      })
  })
}

// Eliminar Usuarios
function usuariosEliminar(req, res){

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  var idProd = req.params.idUsuario;

    Usuarios.findByIdAndDelete(idProd, (err, usuarioEliminado) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!usuarioEliminado) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ AdminApp: usuarioEliminado});
  })
} 

// Obtener hoteles Admin
function ObtenerHotelesAdmin(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  const administradorHotel = req.params.administradorHotel;

  Hoteles.find({ administradorHotel: administradorHotel },(err, hotelesEncontrados) => {

      return res.status(200).send({ AdminApp: hotelesEncontrados });
    }
  );

}


function obtenerHotelesTodos(req, res) {

  if (req.user.rol !== "ADMIN_HOTEL") {
    return res.status(500).send({ mensaje: "Solo el administrador del hotel tiene permisos" });
  }

  Habitaciones.find((err, habitacionesEncontradas) => {
    if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
    if (!habitacionesEncontradas) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuario: habitacionesEncontradas })
})

}

// Rol Admin Usuarios
function rolAdminHotelEliminar(req, res){

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  var idProd = req.params.idUsuario;

    Usuarios.findByIdAndDelete(idProd, (err, usuarioEliminado) => {

      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if(!usuarioEliminado) return res.status(404).send( { mensaje: "Error al eliminar"});

      return res.status(200).send({ AdminApp: usuarioEliminado});
  })
} 



// Editar Usuarios
function EditarUsuarios(req, res) {

  var idUser = req.params.idUsuario;
  var parametros = req.body;

  if (req.user.rol !== "ROL_ADMIN") {
      return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  Usuarios.findByIdAndUpdate(idUser, parametros,{ new: true },(err, editarUsuario) => {

      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });

      if (!editarUsuario) return res.status(403).send({ mensaje: "Error al editar la empresa" });

      return res.status(200).send({ AdminApp: editarUsuario });

    }
  );
}

// Obtener ID usuarios
function UsuariosId(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  var idUsuario = req.params.idUsuario;

  Usuarios.findById(idUsuario, (err, empresaEncontrada) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!empresaEncontrada) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ AdminApp: empresaEncontrada }

      );
  })
}


// Obtener ID ROL_ADMIN_HOTEL
function getIdAdminHotel(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }
  
  var idUsuario = req.params.idUsuario;

  Usuarios.findById(idUsuario, (err, empresaEncontrada) => {

      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!empresaEncontrada) return res.status(404).send({ mensaje: 'No se obtienen los datos' });

      return res.status(200).send({ AdminApp: empresaEncontrada }

      );
  })
}


// ObtenerUsuarios
function obtenerUsuarios(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  Usuarios.find({rol: "ROL_USUARIO"},(err, usuariosEncontrados) => {
    if (err) return res.status(500).send({ mensaje: 'Error al buscar los usuarios' })
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ Usuarios: usuariosEncontrados })
})

}



// Obtener usuarios rol Admin Hotel
function obtenerUsuariosAdminHotel(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador tiene permisos" });
  }

  Usuarios.find({rol: "ADMIN_HOTEL"},(err, usuariosEncontrados) => {
    if (err) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })
    if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen hoteles' })

    return res.status(200).send({ AdminApp: usuariosEncontrados })
})
}


// VER USUARIOS
function verUsuarios(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

    Usuarios.find((err, usuariosEncontrados) => {

      if (err) return res.status(500).send({ mensaje: "Error interno al buscar usuarios" });
      if (!usuariosEncontrados)
        return res.status(500).send({ mensaje: "No hay usuarios registrados" });
      return res.status(200).send({ AdminApp: usuariosEncontrados });
    });
  
}


// AGREGAR ADMINISTRADOR DEL HOTEL
function agregarAdministradorHotel(req, res) {


    let params = req.body;
    let usuariosModel = new Usuarios();

    if (req.user.rol !== "ROL_ADMIN") {
        return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
    }

      if (params.nombreUsuario && params.email && params.password) {

        
        usuariosModel.nombreUsuario = params.nombreUsuario;
        usuariosModel.email = params.email;
        usuariosModel.rol = "ADMIN_HOTEL";
        
        Usuarios.find({ email: params.email }, (err, usuarioEncontrado) => {

          if (err) return res.status(500).send({ mensaje: "Erro interno al compara usuarios" });

          if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
            return res.status(500).send({ mensaje: "El administrador ya existe" });

          } else {
            bcrypt.hash(params.password, null, null, (err, encriptada) => {
              usuariosModel.password = encriptada;
              usuariosModel.save((err, adminRegistrado) => {
                if (adminRegistrado) {
                  return res.status(200).send({ AdminApp: adminRegistrado });
                } else {
                  return res.status(500).send({ mensaje: "Error interno al registar" });
                }
              });
            });
          }
        });
      } else {
        return res.status(500).send({ mensaje: "Llene los campos necesarios" });
      }
   
}



// VER HOTELES ROL ADMIN

function verHotelesAdminApp(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

    Hoteles.find((err, hotelesEncontrados) => {

      if (err) return res.status(500).send({ mensaje: "Error al buscar" });
      if (hotelesEncontrados) {
        return res.status(200).send({ AdminApp: hotelesEncontrados });
      } else {
        return res.status(500).send({ mensaje: "No hay hoteles disponibles" });
      }
    });
  
}


// EDITAR LOS USUARIOS

function editarUsuarios(req, res) {
  
  let usuarioID = req.params.usuarioID;
  let params = req.body;
  
  delete params.password;
  delete params.rol;
  delete params._id;
  delete params.estado;
  delete params.hotelHospedado;


  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

    Usuarios.findByIdAndUpdate({ _id: usuarioID }, params,{ new: true },(err, usuarioActualizado) => {

        if (err) return res.status(500).send({ mensaje: "Error interno" });
        if (usuarioActualizado) {
          return res.status(200).send({ AdminApp: usuarioActualizado });
        } else {
          return res.status(500).send({ mensaje: "Error al actualizar" });
        }
      }
    );
  
}

// ELIMINAR LOS USUARIOS
function eliminarUsuarios(req, res) {
  let usuarioID = req.params.usuarioID;

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }


    Hoteles.findOne({ administradorHotel: usuarioID }, (err, adminEncontrado) => {

        if (err) return res.status(500).send({ mensaje: "Error interno" });
        if (adminEncontrado) {
          return res.status(500).send({mensaje: "No lo puede eliminar porque administra un hotel"});
        } else {
          Usuarios.findById(usuarioID, (err, usuarioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "Error" });
            if (usuarioEncontrado.estado === "Hospedado") {
              return res.status(500).send({ mensaje: "El usuario esta hospedado y no se puede eliminar" });
            } else {
              Usuarios.findByIdAndDelete(usuarioEncontrado, (err, usuarioEliminado) => {

                  if (err)return res.status(500).send({ mensaje: "Error" });
                  if (usuarioEliminado.estado === "Hospedado") {
                    return res.status(500).send({ mensaje: "No puede eliminar a un usuario hospedado"});
                  } else {
                    return res.status(200).send({ AdminApp: usuarioEliminado });
                  }
                }
              );
            }
          });
        }
      }
    );
  
}

// EDITAR HOTELES
function editarHoteles(req, res) {

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

    let hotelID = req.params.hotelID;
    let params = req.body;
    delete params._id;
    delete params.administradorHotel;

    Hoteles.findByIdAndUpdate({ _id: hotelID }, params, { new: true }, (err, hotelActualizado) => {

        if (err) return res.status(500).send({ mensaje: "Error interno" });
        if (hotelActualizado) {
          return res.status(200).send({ AdminApp: hotelActualizado });
        } else {
          return res.status(500).send({ mensaje: "Error al actualizar" });
        }
      }
    );
  
}

// ELIMINAR HOTELES
function eliminarHoteles(req, res) {

  let hotelID = req.params.hotelID;

  if (req.user.rol !== "ROL_ADMIN") {
    return res.status(500).send({ mensaje: "Solo el administrador de la aplicacion tiene permisos" });
  }

    Usuarios.find({ hotelHospedado: hotelID }, (err, hotelEncontrado) => {
      if (err) return res.status(500).send({ mensaje: "Se produjo un error" });
      if (hotelEncontrado._id === hotelID) {
        return res.status(500).send({mensaje: "No puede eliminar el hotel porque hay clientes hospedados"});
      } else {
        Hoteles.findByIdAndDelete({ _id: hotelID }, (err, hotelEliminado) => {
          if (err) return res.status(500).send({ mensaje: "Error interno" });
          if (hotelEliminado) {
            return res.status(200).send({ AdminApp: hotelEliminado });
          } else {
            return res.status(500).send({ mensaje: "No se pudo eliminar el hotel" });
          }
        });
      }
    });
  
}


module.exports = {
    agregarAdministradorHotel,
    verUsuarios,
    verHotelesAdminApp,
    editarUsuarios,
    eliminarUsuarios,
    editarHoteles,
    eliminarHoteles,
    obtenerUsuariosAdminHotel,
    obtenerUsuarios,
    UsuariosId,
    EditarUsuarios,
    getIdAdminHotel,
    usuariosEliminar,
    rolAdminHotelEliminar,
    ObtenerHotelesAdmin,
    agregarHotelAdmin,
    HotelesUsuarios,
    ObtenerHotelesRolAdmin,
    obtenerHotelesTodos,
    controlAgregar,
    verControles,
    verHabitacionesHotel,
    verReservacionesHotel,
    getHabId,
    controlNuevoVer,
    editarControles,
    getControlesId,
    eliminarControl

    //HotelesContando
}