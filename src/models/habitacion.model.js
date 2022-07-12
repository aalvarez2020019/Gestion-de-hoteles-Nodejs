const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var habitacionesSchema = Schema({
  
  nombreHabitacion: String,
  estado: String,
  descripcion: String,
  precio: Number,
  hotelServicios: String,
  totalHab: Number,
  nit: Number,

  stockNoches: Number,
  

  hotel: { type: Schema.Types.ObjectId, ref: "hoteles" },
  idUsuario: { type: Schema.Types.ObjectId, ref: "usuarios" }

});

module.exports = mongoose.model("habitaciones", habitacionesSchema);