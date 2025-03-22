import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const signupUser = (userData) => API.post("/users/signup", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
