const functions = require('firebase-functions');
const app = require('express')();

const cors = require('cors')

app.use(cors({ origin: true }));

const {
    getPeliculas,
    agregarPelicula,
    borrarPelicula,
    editarPelicula,
  } = require('./handlers/peliculas');

app.get('/getPeliculas', getPeliculas);
app.post('/agregaPeliculas', agregarPelicula);
app.post('/borrarpeli/:peliculaId', borrarPelicula);
app.post('/editarpeli/:peliculaId', editarPelicula);

exports.api = functions.https.onRequest(app);

