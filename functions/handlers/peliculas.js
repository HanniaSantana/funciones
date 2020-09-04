const { db } = require("../util/admin");

const { cambiarDetalles } = require("../util/validaciones");

//Consigue todas las peliculas de la base de datos
exports.getPeliculas = (req, res) => {
  db.collection("peliculas")
    .orderBy("nombre", "asc")
    .get()
    .then(data => {
      let peliculas = [];
      data.forEach(doc => {
        peliculas.push({
          peliculaId: doc.id,
          categoria: doc.data().categoria,
          nombre: doc.data().nombre,
          director: doc.data().director,
          duracion: doc.data().duracion,
          protagonistas: doc.data().protagonistas,
        });
      });
      return res.json(peliculas);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.agregarPelicula = (req, res) => {
    const nuevaPelicula= {
      categoria: req.body.categoria,
      nombre: req.body.nombre,
      director: req.body.director,
      duracion: req.body.duracion,
      protagonistas: req.body.protagonistas,
    };
    db.collection("peliculas")
      .add(nuevaPelicula)
      .then(doc => {
        const resPelicula = nuevaPelicula;
        resPelicula.peliculaId = doc.id;
        res.json(resPelicula);
      })
      .catch(err => {
        res.status(500).json({ error: "Something went wrong" });
        console.error(err);
      });
  };

  exports.borrarPelicula = (req, res) => {
    const document = db.doc(`/peliculas/${req.params.peliculaId}`);
    document.get()
    .then(doc=>{
      if(!doc.exists){
        return res.status(404).json({ error : "Pelicula no encontrada."})
      }
      return document.delete()
    })
    .then(()=>{
      res.json({message: "Pelicula eliminada exitosamente"})
    })
    .catch(err=> {
      console.error(err);
      return res.status(500).json({ error: err.code }) 
    })
  };

  exports.editarPelicula = (req, res) => {
    let detallesPelicula = cambiarDetalles(req.body);
    db.doc(`/peliculas/${req.params.peliculaId}`)
      .update(detallesPelicula)
      .then(() => {
        return res.json({ message: "Datalles modificados correctamente" });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  };