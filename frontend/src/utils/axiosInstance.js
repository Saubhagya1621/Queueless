import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://queueless-backend-05vg.onrender.com/api/v1",
  withCredentials: true,
});

export default axiosInstance;
