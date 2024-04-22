import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { getCategories } from '../APIs/bookApi'

const PopularCategory = () => {
    const [categories, setCategories] = useState([])
    const allCategories = async () => {
        const cats = await getCategories()
        setCategories(cats.data.categories)
    }
    useEffect(() => {
        allCategories()
    }, [])
    return (
        <section className="py-12 text-white" style={{ backgroundColor: '#161616' }} >
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-3xl font-semibold mb-4 text-center">Popular Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <CategoryCard categories={categories} />
                </div>
            </div>
        </section>
    )
}

export default PopularCategory