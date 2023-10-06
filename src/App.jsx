import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home'
import SinglePdt from './pages/SinglePdt'
import AddBook from './pages/AddBook'
import Favorite from './pages/Favorite'
import EditBooks from './pages/EditBooks'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import ErrorPage from './pages/ErrorPage'
import Category from './pages/Category'
import MyBooks from './pages/Mybooks'

const App = () => {
  const userId = useSelector((state) => state.user.userDetails._id)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signUp" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myBooks" element={<ProtectedRoute userId={userId} element={<MyBooks />} />} />
        <Route path="/addBook" element={<ProtectedRoute userId={userId} element={<AddBook />} />} />
        <Route path="/favorite" element={<ProtectedRoute userId={userId} element={<Favorite />} />} />
        <Route path="/editBooks/:id" element={<ProtectedRoute userId={userId} element={<EditBooks />} />} />
        <Route path="/book/:id" element={<SinglePdt />} />
        <Route path="/category/:categoryName" element={< Category />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>

  )
}

export default App