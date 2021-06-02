import jwtDecode from "jwt-decode";
export const isAuthenticated = () => {
  let token = localStorage.getItem("token");
  let currentDate = new Date();
  if (token && jwtDecode(token).exp * 1000 > currentDate.getTime()) {
    return token;
  } else {
    return false;
  }
};
