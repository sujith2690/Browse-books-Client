import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

export const getBooks = () => API.get("/book/featured");
export const getCategories = () => API.get("/book/categories");
export const categoryBooks = (data) => API.get(`/book/categoryBooks/${data}`);

