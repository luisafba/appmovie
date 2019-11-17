"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var Categoria = mongoose.model('Categorias');
const productosSchema = new Schema({
  // id: {
  //   type: String
  // },
  //_id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String
  },
  genero: {
    type: String,
    enum: ["Acción", "Anime", "Aventura", "Ciencia Ficción", "Comedia", "Drama", "Musical","Suspenso", "Terror"]
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
  imagen:{
    type: String
  },
  clasificacion: {
    type: Number
  },
  like: {
    type: Number,
    default: 0
  },
  dislike: {
    type: Number,
    default: 0
  },
  director: {
    type: String
  },
  protagonista: {
    type: String
  },
  video: {
    type: String,
  }
});

//const canciones = mongoose.model("canciones", cancionesSchema);
const Productos = mongoose.model("productos", productosSchema);

module.exports = Productos;
