// CONTROLADOR DE USUARIOS
const Usuarios = require('../models/usuario.model');


const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


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

module.exports = {
    usuariosRegistrar
}
