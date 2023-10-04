import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home'
import SinglePdt from './pages/SinglePdt'
import AddBook from './pages/AddBook'
import Favorite from './pages/Favorite'
import MyBooks from './pages/Mybooks'
import EditBooks from './pages/EditBooks'
import Edit from './components/Edit'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signUp" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/myBooks" element={<MyBooks />} />
        <Route path="/editBooks/:id" element={<EditBooks />} />
        {/* <Route path="/editBooks/:id" element={<Edit />} /> */}
        <Route path="/book/:id" element={<SinglePdt />} />
      </Routes>
    </>
  )
}

export default App