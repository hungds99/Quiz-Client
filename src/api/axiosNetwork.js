import axios from "axios";
import { getToken } from "../auth";

const AxiosNetwork = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
});

// Khởi tạo interceptors khi request
AxiosNetwork.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default AxiosNetwork;
