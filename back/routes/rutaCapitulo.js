'use strict'
const express = require('express')
const router = express.Router() // Manejador de rutas
const Capitulo = require('../models/modeloCapitulo');


// Agregar - post / create

router.post('/capitulo', (req, res, next) => {
    //es como hacer coleccion.insert({})
    Capitulo.create(req.body)// es como Llamar al archivo, el body es como la llamada a la base de datos
        .then((Capitulo) => {
            res.send(Capitulo)
        }).catch(next)
}) //dirección que se va a generar por defecto cuando llamamos la applicationCache, el segundo parámetro es una callback


// ACTUALIZAR -> PUT / UPDATE 


// Una forma de programar el put
router.put('/capitulo/:id', (req, res, next) => {
    Capitulo.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(()=>{
            Capitulo.findOne({_id: req.params.id})
            .then((Capitulo) => {
                res.send(Capitulo)
            })
        }).catch(next)
})

// ELIMINAR -> DELETE  
router.delete('/capitulo/:id', (req, res, next) => {
    Capituo.findByIdAndDelete({ _id: req.params.id })
        .then((capitulo) => {
            res.send(capitulo)
        }).catch(next)
})


// CONSULTAR -> GET / READ
router.get ('/capitulo/:id', (req, res, next)=>{
    Capitulo.findById(req.params.id,(err,capitulo)=>{
        res.status(200).send({capitulo})
    })
})
module.exports = router