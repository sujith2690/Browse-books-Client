import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});


export const addBook = (data) => API.post('/book/addBook', data)
export const uploadImage = (imageData) => API.post('/upload', imageData)