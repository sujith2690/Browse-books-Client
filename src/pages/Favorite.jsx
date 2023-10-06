import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { myFavoriteBooks } from '../APIs/crudApi'
import { bookDetails } from '../APIs/searchApi'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { favoriteBooksData } from '../Redux/Features/bookSlice'
import Footer from '../components/Footer'

const Favorite = () => {
    const Books = useSelector((state) => state.bookStore.favBooks)
    const dispatch = useDispatch()
    const favoriteBooks = async () => {
        try {
            const details = await myFavoriteBooks();
            console.log(details.data.favoriteBooks, '-----------favoriteBooks');
            const allBookIds = details.data.favoriteBooks;
            const bookDataPromises = allBookIds.map(async (item) => {
                const result = await bookDetails(item);
                return result.data;
            });
            const bookData = await Promise.all(bookDataPromises);
            dispatch(favoriteBooksData(bookData))

        } catch (error) {
            console.error('Error fetching favorite books:', error);
        }
    }
    console.log(Books, '--------Books')
    useEffect(() => {
        favoriteBooks()
    }, [])


    return (
        <>
            <Navbar />
            <section className="py-12 text-white h-screen" style={{ backgroundColor: '#161616' }} >
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-3xl font-semibold mb-4 text-center">My Favorite Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Books && Books.length > 0 ? (

                            <>
                                {Books.map((book, i) => (
                                    <div key={i} className="hover:shadow-2xl hover:border-yellow-500 border-4 ease-in-out duration-300">
                                        <ProductCard userBooks={book} values={book} />
                                    </div>
                                ))}
                            </>
                        ) : (<p>No Books Added</p>)}
                    </div>
                </div>
            </section>
            <Footer />
        </>)
}

export default Favorite