"use strict";

const express = require("express");
const router = express.Router();
const usuarios = require("../models/modeloUsuario");

// POST login
router.post("/login", (req, res, next) => {
  //console.log(req.body);
  usuarios.findOne({ correo: req.body.email, password: req.body.pw }, (err, user) => {
    if (err || !user) {
      res.send({ login: false, user: "" });
    } else {
      user.password = ":D";
      res.send({ login: true, user: user });
    }
  }
  );

});

module.exports = router;
