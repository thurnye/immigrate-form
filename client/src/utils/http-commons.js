import axios from "axios";

export const baseUrl  = "http://localhost:8080/";
const token = localStorage.getItem('token');

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  }
});


