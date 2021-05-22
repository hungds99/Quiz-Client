import jwtDecode from "jwt-decode";
import { TypeActions } from "../constants";
import { getStore } from "../redux/store";

export const isAuthenticated = () => {
  let token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return false;
};

export const getToken = () => {
  let token = localStorage.getItem("token");

  if (token) {
    return token;
  }

  return false;
};
