'use strict'
const express = require('express'), router = express.Router();
const Pelicula = require('../models/modeloProducto');



router.get('/buscarPelicula/:nombre', (req, res, next) => {
    var nombrePelicula = req.params.nombre;
    Pelicula.find({
        titulo: new RegExp('^' + nombrePelicula + '([a-zA-Z])*$$', 'i')
    }, function (err, resultadoPeliculas) {
        if (err) {
            return res.status(500).json({
                message: "No existen artistas que coincidan con la busqueda"
            });
        }
        return res.json(resultadoPeliculas);
    });
});


module.exports = router;