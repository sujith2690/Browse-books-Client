import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { searchBook } from '../APIs/searchApi';

const SearchBooks = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const handleSearch = async (e) => {
        try {
            if (searchQuery) {
                const query = searchQuery
                const response = await searchBook(query);
                setSearchResults(response.data);
                const result = response.data
            }else{
                setSearchResults([])
            }
        } catch (error) {
            console.error('Error searching for books:', error);
            setSearchResults([]);
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };
    useEffect(() => {
        if (searchQuery) {
            handleSearch();
        }
    }, [searchQuery]);

    return (
        <section className="py-12 bg-gray-200">
            <div className="container mx-auto">
                <div className='flex items-center  gap-3'>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">Search Books</h2>
                    <form className='flex gap-1 h-10 mb-4'>
                        <input
                            type="text"
                            className='border-none outline-none p-2 w-full rounded-sm'
                            placeholder="Search by title, author, etc."
                            value={searchQuery}
                            onChange={handleChange}
                        />
                        <button type='submit' className='px-5 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700'>Search</button>
                    </form>
                </div>
                {searchResults && searchResults.length > 0 ? (
                    <div className=" h-[400px] w-full overflow-y-auto overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {searchResults.map((book, i) => (
                            <div key={i} className="hover:shadow-2xl hover:border-yellow-500 border-4 ease-in-out duration-300">
                                <ProductCard values={book} />
                            </div>
                        ))}
                    </div>
                ) : ('')}
            </div>
        </section>
    );
};

export default SearchBooks;
