const mongoose = require("mongoose");

let Schema = mongoose.Schema;

var controlSchema = Schema({

  nombreHotel: String,
  cantidad: Number,  
  idUsuario: { type: Schema.Types.ObjectId, ref: "usuarios" }
  
});

module.exports = mongoose.model("controladores", controlSchema);