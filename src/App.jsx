import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home'
import SinglePdt from './pages/SinglePdt'
import AddBook from './pages/AddBook'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signUp" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/book/:id" element={<SinglePdt />} />
      </Routes>
    </>
  )
}

export default App