import axios from "axios";

const isDev = import.meta.env.DEV;

const baseURL = isDev
  ? import.meta.env.VITE_API_HOST
  : "https://anicharsapi.onrender.com/api/v1/";

const http = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
  validateStatus: () => true,
});

export default http;
