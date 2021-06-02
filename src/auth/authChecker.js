import jwtDecode from "jwt-decode";
import { RoutePath } from "../configs";

export const isAuthenticated = () => {
  let token = localStorage.getItem("token");
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();
  if (token && decodedToken.exp * 1000 > currentDate.getTime()) {
    return token;
  } else {
    window.location.href = RoutePath.login;
  }
};
