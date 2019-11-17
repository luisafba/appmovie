"use strict";

const express = require("express");
const router = express.Router();
const Productos = require("../models/modeloProducto");
const multer = require('multer');


// Multer File upload settings
const DIR = "public/";
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
    if (file.fieldname === "video") { // if uploading resume
      if (file.mimetype == "video/mp4" || file.mimetype.indexOf("video/mp4") != -1) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(
          new Error("El formato de archivo seleccionado no es permitido.")
        );
      }
    } else {
      if (file.mimetype == "image/*" || file.mimetype.indexOf("image/") != -1) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(
          new Error("El formato de archivo seleccionado no es permitido.")
        );
      }
    }
  }
});

// POST
router.post("/productos", upload.fields([{ name: "imagen", maxCount: 1 }, { name: "video", maxCount: 1 }]), (req, res, next) => {
  console.log("Creando producto...");
  const imageName = req.files.imagen[0].filename;
  const videoName = req.files.video[0].filename;
  console.log("Creando producto..." + imageName + videoName);

  const url = req.protocol + '://' + req.get('host')
  const producto = new Productos({
    nombre: req.body.nombre,
    genero: req.body.genero,
    anio: req.body.anio,
    clasificacion: req.body.clasificacion,
    duracion: req.body.duracion,
    like: 0,
    dislike: 0,
    sinopsis: req.body.sinopsis,
    edad: req.body.edad,
    director: req.body.director,
    protagonista: req.body.protagonista,
    imagen: url + '/' + DIR + imageName,
    video: url + '/' + DIR + videoName
  });

  producto
    .save()
    .then(result => {
      res.status(201).json({
        message: "Película registrada satisfactoriamente!",
        productoCreated: result
      });
    })
    .catch(err => {
      console.log(err),
        res.status(500).json({
          error: err,
          errorMensaje: "Error al registrar el producto"
        });
    });
});
// DELETE
router.delete("/productos/:id", (req, res, next) => {
  Productos.findById(req.params.id, (err, productoConsultado) => {

    const url = req.protocol + '://' + req.get('host')
    Productos
      .findByIdAndDelete({ _id: req.params.id })
      .then((productos) => {
        let nombreArchivo = '.' + (productoConsultado.video.substring(url.length));
        let fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el video');
        })
        nombreArchivo = '.' + (productoConsultado.imagen.substring(url.length));
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó la imagen');
        })
        res.send(productos);
      })
      .catch(next);
  });

});

// GET
router.get("/productos/:id", (req, res, next) => {
  console.log("Consultando...");
  Productos.findById(req.params.id, (err, producto) => {
    res.status(200).send({ producto });
  });
});

// GET
router.get("/productos/", (req, res, next) => {
  console.log("Consultando productos... ");
  let filter = {}
  if (req.query.nombre) {
    filter.nombre = { '$regex': req.query.nombre };
  }
  if (req.query.genero) {
    filter.genero = req.query.genero;
  }
  Productos.find(filter, function (err, productos) {
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
router.put("/productos/:id", upload.fields([{ name: "imagen", maxCount: 1 }, { name: "video", maxCount: 1 }]), (req, res, next) => {
  console.log("Actualizando..." + req.body.archivo);
  const url = req.protocol + '://' + req.get('host')
  let videoArchivo = "";
  let imagenArchivo = "";
  const borrar = req.file;
  Productos.findById(req.params.id, (err, productoConsultado) => {
    if (borrar) {
      nombreArchivo = url + '/' + DIR + req.file.filename;
      imagenArchivo = req.files.imagen[0].filename;
      videoArchivo = req.files.video[0].filename;
    } else {
      imagenArchivo = productoConsultado.imagen;
      videoArchivo = productoConsultado.video;
    }
    Productos.updateOne(
      { _id: productoConsultado._id },  // <-- find stage
      {
        $set: {                // <-- set stage
          nombre: req.body.nombre,
          genero: req.body.genero,
          anio: req.body.anio,
          clasificacion: req.body.clasificacion,
          duracion: req.body.duracion,
          like: req.body.like,
          dislike: req.body.dislike,
          sinopsis: req.body.sinopsis,
          edad: req.body.edad,
          director: req.body.director,
          protagonista: req.body.protagonista,
          imagen: imagenArchivo,
          video: videoArchivo

        }
      }
    ).then(result => {
      console.log(result);
      if (borrar) {
        let nombreArchivo = '.' + (productoConsultado.video.substring(url.length));
        let fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el video anterior');
        })
        nombreArchivo = '.' + (productoConsultado.imagen.substring(url.length));
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó la imagen anterior');
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
