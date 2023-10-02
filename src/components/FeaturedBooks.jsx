import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getBooks } from '../APIs/bookApi'

const FeaturedBooks = () => {
    const [newBooks, setNewBooks] = useState([])
    const getFeaturedBooks = async () => {
        const books = await getBooks()
        console.log(books.data.books, '--------books')
        setNewBooks(books.data.books)
    }
    useEffect(() => {
        getFeaturedBooks();
    }, []); 

    return (
        <section className="py-12 bg-gray-200">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Featured Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {newBooks.map((book, i) => { 
                        return (
                            <div key={i}>
                                <div className="hover:shadow-2xl hover:border-yellow-500 border-4 ease-in-out duration-300">
                                    <ProductCard values={book} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeaturedBooks
