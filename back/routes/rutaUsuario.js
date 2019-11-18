"use strict";

const express = require("express");
const router = express.Router();
const usuarios = require("../models/modeloUsuario");

const multer = require('multer');

// Multer File upload settings
const DIR = "public/usr-images/";
var timemiles;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    timemiles = new Date().getTime();
    const filename = timemiles + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, filename);
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/*" || file.mimetype.indexOf("image/") != -1) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("El formato de archivo seleccionado no es permitido.")
      );
    }
  }
});

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
router.put("/usuarios/:id", upload.single("imagen"), (req, res, next) => {
  const imageName = req.file ? req.file.filename : null;
  let user = JSON.parse(req.body.usuario);
  if (imageName) {
    user.imagen = imageName;
  } else {
    user.imagen = undefined;
  }
  console.log(user);
  usuarios
    .findByIdAndUpdate({ _id: req.params.id }, user)
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
