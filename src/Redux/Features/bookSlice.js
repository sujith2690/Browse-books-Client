import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    books: [],
    myBooks: [],
    favBooks: []
}
const bookSlice = createSlice({
    name: 'bookSlice',
    initialState,
    reducers: {
        storeBooks: (state, action) => {
            state.books = action.payload
        },
        myBookStore: (state, action) => {
            state.myBooks = action.payload
        },
        favoriteBooksData: (state, action) => {
            state.favBooks = action.payload
        },
        addFavoriteBook: (state, action) => {
            state.favBooks.unshift(action.payload)
        },
        removeFavoriteBook: (state, action) => {
            state.favBooks = state.favBooks.filter((std) => std._id !== action.payload._id)
        },
        addNewBook: (state, action) => {
            state.books.unshift(action.payload),
                state.myBooks.unshift(action.payload)
        },
        removeBook: (state, action) => {
            state.myBooks = state.myBooks.filter((std) => std._id !== action.payload)
        },
        updateBook: (state, action) => {
            const updatedBookIndex = state.myBooks.findIndex(book => book._id === action.payload.id);
            const BookIndex = state.myBooks.findIndex(book => book._id === action.payload.id);
            if (updatedBookIndex !== -1) {
                state.myBooks[updatedBookIndex] = action.payload.updatedBook,
                    state.books[BookIndex] = action.payload.updatedBook
            }
        }
    }
})

export const { storeBooks, myBookStore, favoriteBooksData, addNewBook, removeBook, addFavoriteBook, removeFavoriteBook,
    updateBook } = bookSlice.actions;
export default bookSlice.reducer;
