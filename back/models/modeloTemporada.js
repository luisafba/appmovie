"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var Producto = mongoose.model('Productos');
const temporadasSchema = new Schema({
  // id: {
  //   type: String
  // },
  //_id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String
  }, 
  producto: { 
      type: Schema.ObjectId, ref: "Productos" 
  } 
});

//const canciones = mongoose.model("canciones", cancionesSchema);
const Temporadas = mongoose.model("temporadas", temporadasSchema);

module.exports = Temporadas;
