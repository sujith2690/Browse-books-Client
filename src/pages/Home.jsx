import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import FeaturedBooks from '../components/FeaturedBooks'
import PopularCategory from '../components/PopularCategory'
import SearchBooks from '../components/SearchBooks'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Header/>
    <PopularCategory/>
    <SearchBooks/>
    <FeaturedBooks/>
    </>
  )
}

export default Home