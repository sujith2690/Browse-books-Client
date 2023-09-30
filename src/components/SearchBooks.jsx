import React from 'react'
import ProductCard from './ProductCard'

const SearchBooks = () => {
    const handleSearch = () => {
        e.preventDefault()
        console.log('hello')
    }
    return (
        <section className="py-12 bg-gray-200">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Search Books</h2>
                <form onSubmit={handleSearch} className='flex gap-1 h-10 mb-4'>
                    <input type="text" className=' border-none outline-none p-2 w-[75%] rounded-sm' />
                    <select
                        name="blogType"
                        id="blogType" className=" outline-none rounded-sm  focus:ring focus:ring-indigo-500 border-gray-700 text-gray-900 capitalize  w-[25%]">
                        <option value="" className='' disabled selected>Book Type</option>
                        <option className="uppercase ">Scifi</option>
                        <option className="uppercase ">Doc</option>
                    </select>
                    <button type='submit' className='px-5 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 '>Search</button>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
                    <div>
                        <div className="hover:shadow-2xl hover:border-yellow-500 border-4 ease-in-out duration-300" >
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </div >
        </section>

    )
}

export default SearchBooks