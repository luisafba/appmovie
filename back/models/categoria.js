"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categoriasSchema = new Schema({
  // id: {
  //   type: String
  // },
  //_id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String
  }
});

//const canciones = mongoose.model("canciones", cancionesSchema);
const Categorias = mongoose.model("categorias", categoriasSchema);

module.exports = Categorias;
