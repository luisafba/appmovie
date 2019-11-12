"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritoSchema = new Schema({
 
  usuario: { 
    type: Schema.ObjectId, ref: "Usuario" 
  },  
  producto: { 
    type: Schema.ObjectId, ref: "Productos" 
  }
  
});

//const canciones = mongoose.model("canciones", cancionesSchema);
const Favoritos = mongoose.model("favoritos", favoritoSchema);

module.exports = Favoritos;
