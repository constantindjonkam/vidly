import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  return localStorage.setItem(tokenKey, jwt);
};

export const loginWithJwt = (jwt) => {
  return localStorage.setItem(tokenKey, jwt);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export const logout = () => {
  return localStorage.removeItem(tokenKey);
};

export default {
  login,
  loginWithJwt,
  getCurrentUser,
  getJwt,
  logout,
};
