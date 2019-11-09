'use strict'
const express = require('express')
const router = express.Router() // Manejador de rutas
const Temporada = require('../models/modeloTemporada');


// Agregar - post / create

router.post('/temporada', (req, res, next) => {
    //es como hacer coleccion.insert({})
    Temporada.create(req.body)// es como Llamar al archivo, el body es como la llamada a la base de datos
        .then((Temporada) => {
            res.send(Temporada)
        }).catch(next)
}) //dirección que se va a generar por defecto cuando llamamos la applicationCache, el segundo parámetro es una callback


// ACTUALIZAR -> PUT / UPDATE 


// Una forma de programar el put
router.put('/temporada/:id', (req, res, next) => {
    Temporada.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(()=>{
          Temporada.findOne({_id: req.params.id})
            .then((Temporada) => {
                res.send(Temporada)
            })
        }).catch(next)
})



// ELIMINAR -> DELETE  
router.delete('/temporada/:id', (req, res, next) => {
    Temporada.findByIdAndDelete({ _id: req.params.id })
        .then((temporada) => {
            res.send(temporada)
        }).catch(next)
})


// CONSULTAR -> GET / READ
router.get ('/temporada/:id', (req, res, next)=>{
    Temporada.findById(req.params.id,(err,temporada)=>{
        res.status(200).send({temporada})
    })
})
module.exports = router