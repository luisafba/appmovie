'use strict'
const express = require('express')
const router = express.Router() // Manejador de rutas
const Categoria = require('../models/modeloCategoria');


// Agregar - post / create

router.post('/categoria', (req, res, next) => {
    //es como hacer coleccion.insert({})
    Categoria.create(req.body)// es como Llamar al archivo, el body es como la llamada a la base de datos
        .then((Categoria) => {
            res.send(Categoria)
        }).catch(next)
}) //dirección que se va a generar por defecto cuando llamamos la applicationCache, el segundo parámetro es una callback


// ACTUALIZAR -> PUT / UPDATE 


// Una forma de programar el put
router.put('/categoria/:id', (req, res, next) => {
    Categoria.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(()=>{
            Categoria.findOne({_id: req.params.id})
            .then((Categoria) => {
                res.send(Categoria)
            })
        }).catch(next)
})

// ELIMINAR -> DELETE  
router.delete('/categoria/:id', (req, res, next) => {
    Categoria.findByIdAndDelete({ _id: req.params.id })
        .then((categoria) => {
            res.send(categoria)
        }).catch(next)
})


// CONSULTAR -> GET / READ
router.get ('/categoria/:id', (req, res, next)=>{
    Categoria.findById(req.params.id,(err,categoria)=>{
        res.status(200).send({categoria})
    })
})
module.exports = router