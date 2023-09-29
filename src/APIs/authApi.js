import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

console.log(import.meta.env.VITE_BASE_URL)
export const logInApi = (formData) => API.post("/user/login", formData);
export const signUpApi = (formData) => API.post("/user/signUp", formData);
