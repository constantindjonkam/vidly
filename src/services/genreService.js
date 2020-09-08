import http from "./httpService";

export const getGenres = () => {
  return http.get("/genres");
};
