import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getBooks } from '../APIs/bookApi'

const FeaturedBooks = () => {
    const [newBooks, setNewBooks] = useState()
    const values = [10, 5, 8, 9, 9, 4, 5]
    const getFeaturedBooks = async () => {
        console.log('searching featured books')
        const books = await getBooks()
        // setNewBooks()
    }
    useEffect(() => {
        getFeaturedBooks()
    }, [newBooks])

    return (
        <section className="py-12 bg-gray-200">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Featured Books</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
                    {values.map((item, i) => {
                        return (
                            <div key={i} >
                                <div className="hover:shadow-2xl hover:border-yellow-500 border-4 ease-in-out duration-300" >
                                    <ProductCard values={item} />
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

            </div >
        </section >
    )
}

export default FeaturedBooks