const Pelicula = require('../models/modelo.pelicula')

const buscadorController = {};


//>>>>>>>>>>>>>>> BUSCADOR GENERAL >>>>>>>>>>>>>>>>>>>>>

buscadorController.buscarPelicula = (req, res, next) => {
    var nombrePelicula = req.params.nombre;
    Pelicula.find({
        nombre: new RegExp('^' + nombrePelicula + '([a-zA-Z])*$$', 'i')
    }, function (err, resultadoPeliculas) {
        if (err) {
            return res.status(500).json({
                message: "No existen artistas que coincidan con la busqueda"
            });
        }
        return res.json(resultadoPeliculas);
    });
};


//likes

buscadorController.darLike = (req, res, next) => {
    const numeroLike = pelicula.findById({ _id: req.params.id });
    Pelicula.findByIdAndUpdate({ _id: req.params._id }, (numeroLike.req.body));

}


module.exports = buscadorController;