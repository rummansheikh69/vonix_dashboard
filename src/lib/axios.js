import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://onex-backend.vercel.app/api",
  withCredentials: true,
});
