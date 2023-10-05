import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    books:[],
    myBooks:[],
    favBooks:[]
}
const bookSlice = createSlice({
    name:'bookSlice',
    initialState,
    reducers:{
        storeBooks:(state,action)=>{
            state.books = action.payload
        },
        addBook:(state,action)=>{
            state.myBooks.unshift(action.payload)
        },
        removeBook:(state,action)=>{
            state.myBooks = state.myBooks.filter((std)=>std._id!==action.payload)
        },
        updateBook:(state,action)=>{
            state.myBooks = state.myBooks.filter((std)=>std._id!==action.payload.id)
            state.myBooks.unshift(action.payload.student)
        }
    }
})

export const {storeBooks,addBook,removeBook,updateBook} =bookSlice.actions;
export default bookSlice.reducer;
