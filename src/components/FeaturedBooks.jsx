import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getBooks, getCategories } from '../APIs/bookApi'
import { storeBooks } from '../Redux/Features/bookSlice'
import { useDispatch, useSelector } from 'react-redux'

const FeaturedBooks = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(8); // Adjust the number of books per page

    const [currentBooks, setCurrentBooks] = useState([])

    const books = useSelector((state) => state.bookStore.books)
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;

    const getFeaturedBooks = async () => {
        try {
            const allData = await getBooks();
            const bookDetails = allData.data.books;
            console.log(bookDetails, '------------bookDetails')
            dispatch(storeBooks(bookDetails));
            setData(bookDetails);
            setNewBooks(bookDetails);
            const CategoriesArray = await getCategories();
            setCategory(CategoriesArray.data.categories);
        } catch (error) {
            console.log(error, '----------error')
        }
    }
    useEffect(() => {
        setCurrentBooks(newBooks.slice(indexOfFirstBook, indexOfLastBook));
    }, [currentPage, newBooks]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filterType = (category) => {
        setNewBooks(
            data.filter((item) => {
                return item.category === category
            })
        )
    }
    const filterPrice = (price) => {
        setNewBooks(
            data.filter((item) => {
                return item.price <= price
            })
        )
    }
    useEffect(() => {
        getFeaturedBooks()
    }, [])

    return (
        <section className="py-12" style={{ backgroundColor: '#161616' }}>
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-3xl text-white font-semibold mb-4 text-center">Featured Books</h2>
                <div className='flex flex-col lg:flex-row justify-between gap-3 p-2'>
                    <div>
                        <p className='font-bold text-gray-200 mb-3'>Filter Type</p>
                        <div className='flex gap-3 flex-wrap'>
                            <button
                                onClick={() => setNewBooks(data)}
                                className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>All</button>
                            {category?.map((item, i) => (
                                <button key={i} onClick={() => filterType(item)} className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>{item}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className='font-bold text-gray-200 mb-3 lg:text-right '>Filter Price</p>
                        <div className='flex gap-3 max-w-[390px] w-full flex-wrap'>
                            <button onClick={() => filterPrice(1000)} className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>1000</button>
                            <button onClick={() => filterPrice(1500)} className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>1500</button>
                            <button onClick={() => filterPrice(2000)} className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>2000</button>
                            <button onClick={() => filterPrice(2500)} className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>2500</button>
                            <button onClick={() => filterPrice(3000)} className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>3000</button>
                            <button onClick={() => filterPrice(300000)} className='mr-2 bg-blue-500 rounded-sm px-2 py-1  border-none text-white hover:bg-blue-800 hover:text-white'>More</button>
                        </div>
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
                    {
                        currentBooks.length === 0 ? (
                            <>
                                {Array(4).fill().map((_, index) => (
                                    <div key={index} className="flex flex-col rounded shadow-md w-60 sm:w-72 animate-pulse h-full hover:shadow-2xl hover:border-yellow-500 dark:border-gray-700 border-4 ease-in-out duration-300">
                                        <div className="h-48 rounded-t dark:bg-gray-700"></div>
                                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                                            <div className="w-full h-7 rounded dark:bg-gray-700"></div>
                                            <div className="w-full h-7 rounded dark:bg-gray-700"></div>
                                            <div className="w-3/4 h-7 rounded dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            currentBooks.map((item, i) => (
                                <div key={i}>
                                    <div className="">
                                        <ProductCard values={item} />
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(newBooks.length / booksPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                            } border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section >
    )
}

export default FeaturedBooks