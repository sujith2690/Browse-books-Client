import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })



export const addBook = (data) => API.post('/book/addBook', data)

export const uploadImage = (imageData) => API.post('/upload', imageData)