import axios from "axios";

const storedToken = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    // "Authorization": "<your-auth-token>",
    "Content-Type": "application/json",
    "x-auth-token": storedToken,
    timeout: 1000,
  },
});

export default instance;
