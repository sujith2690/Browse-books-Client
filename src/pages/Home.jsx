import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import FeaturedBooks from '../components/FeaturedBooks'
import PopularCategory from '../components/PopularCategory'
import SearchBooks from '../components/SearchBooks'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Header/>
    <SearchBooks/>
    <FeaturedBooks/>
    <PopularCategory/>
    <Footer/>
    </>
  )
}

export default Home