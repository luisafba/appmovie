"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Categoria = mongoose.model('Categorias');
const productosSchema = new Schema({
  // id: {
  //   type: String
  // },
  //_id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String
  },
  genero: {
    type: String
  },
  anio: {
    type: Number
  },
  duracion: {
    type: String,
    default: "N/A"
  },
  
  sinopsis: {
    type: String
  },
  
  edad: {
    type: Number
  },
  director: {
    type: String
  },
  protagonista: {
    type: String
  },
  archivo: {
    type: String
  },
  categoria: { 
      type: Schema.ObjectId, ref: "Categoria" 
  },
  favorito: {
    type: Boolean
  }
});

//const canciones = mongoose.model("canciones", cancionesSchema);
const Productos = mongoose.model("productos", productosSchema);

module.exports = Productos;
