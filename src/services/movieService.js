import http from "./httpService";

const apiEndPoint = "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export const getMovies = () => {
  return http.get(apiEndPoint);
};

export const getMovie = (id) => {
  return http.get(movieUrl(id));
};

export const deleteMovie = (movieId) => {
  return http.delete(movieUrl(movieId));
};

export const saveMovie = (movie) => {
  const body = { ...movie };
  delete body._id;

  if (movie._id) {
    //update novie
    return http.put(movieUrl(movie._id), body);
  }
  //add new movie
  return http.post(apiEndPoint, body);
};
