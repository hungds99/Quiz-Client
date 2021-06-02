import axios from "axios";
import { isAuthenticated } from "../auth";

const AxiosNetwork = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
});

// Khởi tạo interceptors khi request
AxiosNetwork.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      config.headers["Authorization"] = "Bearer " + isAuthenticated();
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default AxiosNetwork;
