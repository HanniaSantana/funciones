const isEmpty = string => {
    if (string.trim() === "") {
      return true;
    } else {
      return false;
    }
  };

exports.cambiarDetalles = (data) => {
    let detallesPelicula = {}
    if(!isEmpty(data.categoria.trim())){
        detallesPelicula.categoria = data.categoria
    }
    if(!isEmpty(data.nombre.trim())){
        detallesPelicula.nombre = data.nombre
    }
    if(!isEmpty(data.director.trim())){
        detallesPelicula.director = data.director
    }
    if(!isEmpty(data.duracion.trim())){
        detallesPelicula.duracion = data.duracion
    }
    detallesPelicula.protagonistas = data.protagonistas
    return detallesPelicula;
  }