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
export const updateBook = (id,data) => API.post(`/book/updateBook/${id}`, data)
export const uploadImage = (imageData) => API.post('/upload', imageData)

export const deleteBook =(id)=>API.delete(`/book/deleteBook/${id}`)

export const myBooks = async () => {
    try {
        const response = await API.get('/book/myBook');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching my books:', error);
        throw error; 
    }
};