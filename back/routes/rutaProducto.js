"use strict";

const express = require("express");
const router = express.Router();
const Productos = require("../models/modeloProducto");
const multer = require('multer');


// Multer File upload settings
const DIR = 'public/';
var timemiles;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    timemiles = new Date().getTime();
    const fileName = timemiles + '-' + file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});


// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "video/mpeg" || file.mimetype.indexOf("video/") != -1) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('El formato de archivo seleccionado no es permitido.'));
    }
  } 
});

// POST
router.post("/productos", upload.single('archivo'), (req, res, next) => {

  console.log("Creando producto..." + req.body.archivo);

  const url = req.protocol + '://' + req.get('host')
  const producto = new Productos({
    //_id: new mongoose.Types.ObjectId(),
    //_id: idVideo,
    nombre: req.body.nombre,
    genero: req.body.genero,
    anio: req.body.anio,
    duracion: req.body.duracion,
    sinopsis: req.body.sinopsis,
    edad: req.body.edad,
    director: req.body.director,
    protagonista: req.body.protagonista,
    categoria: req.body.categoria,
    favorito: req.body.favorito,
    archivo: url + '/' + DIR + req.file.filename,
  });

  producto.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Película registrada satisfactoriamente!",
      productoCreated: {
        _id: result._id,
        nombre: result.nombre,
        genero: result.genero,
        anio: result.anio,
        duracion: result.duracion,
        sinopsis: result.duracion,
        edad: result.duracion,
        director: result.duracion,
        protagonista: result.protagonista,
        categoria: result.categoria,
        favorito: result.favorito,
        archivo: result.archivo
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err,
        errorMensaje: "Error al registrar el producto"
      });
  });
  /*Canciones.create(req.body)
    .then(Canciones => {
      res.send(Canciones);
    })
    .catch(next);*/
});

// DELETE
router.delete("/productos/:id", (req, res, next) => {
  Productos.findById(req.params.id, (err, productoConsultado) => {

    const url = req.protocol + '://' + req.get('host')
    const nombreArchivo = '.' + (productoConsultado.archivo.substring(url.length));
    console.log(nombreArchivo);
    Productos
      .findByIdAndDelete({ _id: req.params.id })
      .then((productos) => {
        const fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el archivo');
        })
        res.send(productos);
      })
      .catch(next);
  });

});

// GET
router.get("/productos/:id", (req, res, next) => {
  console.log("Consultando...");
  Productos.findById(req.params.id, (err, productos) => {
    res.status(200).send({ productos });
  });
});

// GET
router.get("/productos/", (req, res, next) => {
  Productos.find((err, productos) => {
    res.status(200).send({ productos });
  });
});
module.exports = router;

//PUT
/*router.put('/canciones/:id', (req, res, next) => {
  console.log("entro..put");
  
  Canciones.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(()=>{
          Canciones.findOne({_id: req.params.id})
          .then((canciones) => {
              res.send(canciones)
          })
      }).catch(next);
    });
*/
// PUT
router.put("/productos/:id", upload.single('archivo'), (req, res, next) => {
  console.log("Actualizando..." + req.body.archivo);
  const url = req.protocol + '://' + req.get('host')
  let nombreArchivo="";
  const borrar = req.file;
  Productos.findById(req.params.id, (err, productoConsultado) => {
    if (borrar) {
      nombreArchivo = url + '/' + DIR + req.file.filename;
    } else {
      nombreArchivo = productoConsultado.archivo;
    }
    Productos.updateOne(
      { _id: productoConsultado._id },  // <-- find stage
      { $set: {                // <-- set stage
          nombre: req.body.nombre,
          genero: req.body.genero,
          anio: req.body.anio,
          duracion: req.body.duracion,
          sinopsis: req.body.sinopsis,
          edad: req.body.edad,
          director: req.body.director,
          categoria: req.body.categoria,
          protagonista: req.body.protagonista,
          favorito: req.body.favorito,
          archivo: nombreArchivo
        } 
      } 
    ).then(result => {
      console.log(result);
      if (borrar) {
        const nombreArchivo = '.' + (productoConsultado.archivo.substring(url.length));
        const fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el archivo anterior');
        })
      }
      Productos.findById(req.params.id, (err, productoConsultado) => {
        res.status(200).json({
          message: "Producto actualizado satisfactoriamente!",
          productoActualizado: productoConsultado
        })
      });
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err,
        errorMensaje: "Error al actualizar el producto"
      });
  })
});
//PUT
/* router.put('/canciones/:id', (req, res, next) => {
  Console.log("ENTRÓ A LA ACTUALIZACIÓN");
  canciones.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(() => {
          const cancion = canciones.findOne({ _id: req.params.id })
          return cancion
      }).then((canciones) => {
          res.send(canciones)
      })
      .catch(next)
}) */
