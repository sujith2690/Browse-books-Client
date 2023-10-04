import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { myBooks } from '../APIs/crudApi'
import ProductCard from '../components/ProductCard'

const MyBooks = () => {
    const [Books, setBooks] = useState([])
    const userBooks = async () => {
        const all = await myBooks()
        setBooks(all)
    }
    Books.map((item) => {
        console.log(item, '--------------')
    })
    useEffect(() => {
        userBooks()
    }, [])

    return (
        <>
            <Navbar />
            <section className="py-12 text-white" style={{ backgroundColor: '#161616' }} >
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-3xl font-semibold mb-4 text-center">My Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Books && Books.length > 0 ? (

                            <>
                                {Books.map((book, i) => (
                                    <div key={i} className="hover:shadow-2xl hover:border-yellow-500 border-4 ease-in-out duration-300">
                                        <ProductCard values={book} />
                                    </div>
                                ))}
                            </>
                        ) : ('')}
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyBooks