import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const CategoryCard = ({ categories }) => {
    const navigate = useNavigate()
    const [categoryImages, setCategoryImages] = useState({});

    const generateImage = async (category) => {
        try {
            const apiUrl = `https://source.unsplash.com/200x300/?${category}`;
            return apiUrl;
        } catch (error) {
            console.error(`Image not found for category ${category}.`);
            return null;
        }
    };

    useEffect(() => {
        const generateImageUrls = async () => {
            const imageUrls = {};

            for (const category of categories) {
                const imageUrl = await generateImage(category);
                if (imageUrl) {
                    imageUrls[category] = imageUrl;
                }
            }

            setCategoryImages(imageUrls);
        };

        generateImageUrls();
    }, [categories]);
    
    return (
        <>
            {categories.map((item, i) => {
                return (
                    <div key={i} className="flex flex-col justify-center items-center max-w-sm mx-auto my-8">
                        <div
                            style={{
                                backgroundImage: `url("${categoryImages[item] ||
                                    'https://images.unsplash.com/photo-1507415492521-917f60c93bfe?auto=format&fit=crop&w=500&q=60'}")`,
                            }}
                            className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"
                        ></div>
                        <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                            <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">
                                {item}
                            </div>
                            <div className="flex items-center justify-between bg-indigo-500">
                                <Link
                                    to={`/category/${item}`} // Define the path you want to navigate to
                                    className="bg-indigo-500 text-xs text-white w-full px-2 py-1 font-semibold uppercase hover:bg-indigo-700 text-center" // Add text-center class here
                                >
                                    Browse
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default CategoryCard;
