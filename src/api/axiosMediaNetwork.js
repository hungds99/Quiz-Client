import axios from "axios";
import { isAuthenticated } from "../auth";

const AxiosMediaNetwork = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
});

// Khởi tạo interceptors khi request
AxiosMediaNetwork.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      config.headers["Authorization"] = "Bearer " + isAuthenticated();
    }
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default AxiosMediaNetwork;
