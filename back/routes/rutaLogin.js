"use strict";

const express = require("express");
const router = express.Router();
const usuarios = require("../models/modeloUsuario");

// POST login
router.post("/login", (req, res, next) => {
  //console.log(req.body);
  usuarios.findOne(
    { correo: req.body.email, password: req.body.pw },
    (err, user) => {
      if (err || !user) {
        res.send({ login: false, user: "" });
      } else {
        res.send({ login: true, user: user });
      }
    }
  );

  // usuarios
  //     .create(req.body)
  //     .then((usr) => {
  //         res.send(usr);
  //     })
  //     .catch(next);
});

module.exports = router;
