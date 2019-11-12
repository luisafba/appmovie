"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var Temporada = mongoose.model('Temporadas');
const capitulosSchema = new Schema({
  // id: {
  //   type: String
  // },
  //_id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String
  },
  temporada: { 
    type: Schema.ObjectId, ref: "Temporadas" 
  },  
  producto: { 
    type: Schema.ObjectId, ref: "Productos" 
  }
  
});

//const canciones = mongoose.model("canciones", cancionesSchema);
const Capitulos = mongoose.model("capitulos", capitulosSchema);

module.exports = Capitulos;
