"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usuariosShema = new Schema({
  id: {
    type: String
  },
  nombre: {
    type: String
  },
  edad: {
    type: Number
  },
  correo: {
    type: String
  },
  password: {
    type: String
  },
  imagen: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: "Regular"
  }
});

const usuarios = mongoose.model("usuarios", usuariosShema);

module.exports = usuarios;
