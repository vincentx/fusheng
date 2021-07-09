import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_HOST,
});

export default axiosInstance;
