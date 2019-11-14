"use strict";

const express = require("express");
const router = express.Router();
const usuarios = require("../models/modeloUsuario");

// POST CREAR
router.post("/usuarios", (req, res, next) => {
  usuarios
    .create(req.body)
    .then((usr) => {
      res.send(usr);
    })
    .catch(next);
});

// PUT ACTUALIZAR
router.put("/usuarios/:id", (req, res, next) => {
  usuarios
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      const usuario = usuarios.findOne({ _id: req.params.id });
      return usuario;
    })
    .then(usuario => {
      res.send(usuario);
    })
    .catch(next);
});

// DELETE BORRAR
router.delete("/usuarios/:id", (req, res, next) => {
  usuarios
    .findByIdAndDelete({ _id: req.params.id })
    .then(usuarios => {
      res.send(usuarios);
    })
    .catch(next);
});

// GET OBTENER
router.get("/usuarios", (req, res, next) => {
  usuarios.find((err, usuarios) => {
    res.status(200).send({ usuarios });
  });
});

// GET OBTENER USUARIO
router.get("/usuarios/:id", (req, res, next) => {
  usuarios
  .findById({ _id: req.params.id })
  .then(usuario => {
    res.status(200).send(usuario);
  });
});
module.exports = router;
