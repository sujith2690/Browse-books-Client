import React from 'react'

const CategoryCard = ({ categories }) => {

    return (
        <>
            {categories.map((item) => {
                return (
                    <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8">
                        <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507415492521-917f60c93bfe?auto=format&fit=crop&w=500&q=60")' }}
                            className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"></div>
                        <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                            <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">
                                {item}  
                            </div>
                            <div className="flex items-center justify-between bg-indigo-500">
                                <button className="bg-indigo-500 text-xs text-white w-full px-2 py-1 font-semibold uppercase hover:bg-indigo-700">
                                    Browse
                                </button>

                            </div>
                        </div>
                    </div>
                )
            })}
        </>

    )
}

export default CategoryCard