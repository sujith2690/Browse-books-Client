import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })

export const searchBook = (data) => API.get(`/book/search?query=${data}`)
export const bookDetails = (id) => API.get(`/book/${id}`)
