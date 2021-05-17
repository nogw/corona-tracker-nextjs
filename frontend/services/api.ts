import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL_API || "http://localhost:8000",
})

export default api