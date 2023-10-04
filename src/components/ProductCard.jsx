import React from 'react'
import { BsCartPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ values }) => {
    const navigate = useNavigate()
    return (
        <>
            {values ?
                <div className="flex justify-center items-center cursor-pointer" onClick={() => navigate(`/book/${values._id}`)}>
                    <div className="flex flex-col justify-between w-72 sm:w-96 h-96 bg-white bg-center text-gray-800 overflow-hidden"
                        style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: 'url("https://images.unsplash.com/photo-1507415492521-917f60c93bfe?auto=format&fit=crop&w=500&q=60")' }}>
                        <div className="flex justify-between items-center ml-4 pr-8">
                            <div className="bg-indigo-500 text-white bg-opacity-95 shadow px-2 py-1 flex items-center font-bold text-xs rounded">
                                {values.category}
                            </div>
                            <div
                                className="bg-yellow-500 w-10 h-12 shadow flex flex-col-reverse p-2 text-center  text-white rounded-b-full cursor-pointer hover:bg-gray-900">
                                <BsCartPlus className='text-xl' />
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-95 p-4 flex flex-col mr-4 mb-8">
                            <h3 className="truncate text-xl font-bold pb-2">
                                {values.title}
                            </h3>
                            <p className="truncate text-gray-500 text-sm">
                                {values.description}
                            </p>
                            <span className="text-indigo-500 text-xs">{values.author}</span>
                        </div>
                    </div>
                </div> : ''}
        </>

    )
}

export default ProductCard