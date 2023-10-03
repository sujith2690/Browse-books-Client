import React from 'react'
import Navbar from '../components/Navbar'

const MyBooks = () => {
    return (
        <>
            <Navbar />
            <section className="py-12 text-white" style={{ backgroundColor: '#161616' }} >
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-3xl font-semibold mb-4 text-center">My Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* <CategoryCard categories={categories} /> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyBooks