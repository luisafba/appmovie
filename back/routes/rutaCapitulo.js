"use strict";

const express = require("express");
const router = express.Router();
const Capitulos = require("../models/modeloCapitulo");
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
    if (file.mimetype == "video/mp4" || file.mimetype.indexOf("video/") != -1) {/*incluir video/webm, video/ogg*/
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('El formato de archivo seleccionado no es permitido.'));
    }
  } 
});

// POST
router.post("/capitulos", upload.single('archivo'), (req, res, next) => {

  console.log("Creando capitulo..." + req.body.archivo);

  const url = req.protocol + '://' + req.get('host')
  const capitulo = new Capitulos({
    //_id: new mongoose.Types.ObjectId(),
    //_id: idVideo,
    nombre: req.body.nombre,
    temporada: req.body.temporada,
    archivo: url + '/' + DIR + req.file.filename,
  });

  capitulo.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Capítulo registrada satisfactoriamente!",
      capituloCreated: {
        _id: result._id,
        nombre: result.nombre,
        temporada: result.temporada,
        archivo: result.archivo
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err,
        errorMensaje: "Error al registrar el capitulo"
      });
  });
  
});

// DELETE
router.delete("/capitulos/:id", (req, res, next) => {
  Capitulos.findById(req.params.id, (err, capituloConsultado) => {

    const url = req.protocol + '://' + req.get('host')
    const nombreArchivo = '.' + (capituloConsultado.archivo.substring(url.length));
    console.log(nombreArchivo);
    Capitulos
      .findByIdAndDelete({ _id: req.params.id })
      .then((capitulos) => {
        const fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el capítulo');
        })
        res.send(capítulo);
      })
      .catch(next);
  });

});

// GET
router.get("/capitulos/:id", (req, res, next) => {
  console.log("Consultando...");
  Capitulos.findById(req.params.id, (err, capitulos) => {
    res.status(200).send({ capitulos });
  });
});

// GET
router.get("/capitulos/", (req, res, next) => {
  Capitulos.find((err, capitulos) => {
    res.status(200).send({ capitulos });
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
router.put("/capitulos/:id", upload.single('archivo'), (req, res, next) => {
  console.log("Actualizando..." + req.body.archivo);
  const url = req.protocol + '://' + req.get('host')
  let nombreArchivo="";
  const borrar = req.file;
  Capitulos.findById(req.params.id, (err, capituloConsultado) => {
    if (borrar) {
      nombreArchivo = url + '/' + DIR + req.file.filename;
    } else {
      nombreArchivo = capituloConsultado.archivo;
    }
    Capitulos.updateOne(
      { _id: capituloConsultado._id },  // <-- find stage
      { $set: {                // <-- set stage
          nombre: req.body.nombre,
          temporada: req.body.temporada,
          archivo: nombreArchivo
        } 
      } 
    ).then(result => {
      console.log(result);
      if (borrar) {
        const nombreArchivo = '.' + (capituloConsultado.archivo.substring(url.length));
        const fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el archivo anterior');
        })
      }
      Capitulos.findById(req.params.id, (err, capituloConsultado) => {
        res.status(200).json({
          message: "Capítulo actualizado satisfactoriamente!",
          capituloActualizado: capituloConsultado
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
        errorMensaje: "Error al actualizar el capítulo"
      });
  })
});