import React from 'react'
import CategoryCard from './CategoryCard'

const PopularCategory = () => {

    return (
        <section className="py-12 text-white" style={{backgroundColor:'#161616'}} >
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Popular Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <CategoryCard />
                </div>
            </div>
        </section>
    )
}

export default PopularCategory