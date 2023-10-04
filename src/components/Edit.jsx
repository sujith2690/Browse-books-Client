import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bookDetails } from '../APIs/searchApi'
import { getCategories } from '../APIs/bookApi'

import { ErrorMessage, Field, useFormik } from 'formik';
import * as Yup from 'yup'; // You may need to import Yup if you haven't already.
import { toast } from 'react-toastify'; // Import toast for displaying error messages.


const Edit = () => {

    const [allCategories, setAllCategories] = useState()
    const [bookData, setBookData] = useState({
        title: '',
        category: '',
        description: '',
        author: '',
        price: '',
    })
    const { id } = useParams()
    const initialValues = {
        title: '',
        category: '',
        author: '',
        price: '',
        description: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        category: Yup.string().required('Category is required'),
        author: Yup.string().required('Author is required'),
        price: Yup.number()
            .typeError('Price must be a number')
            .required('Price is required')
            .positive('Price must be positive'),
        description: Yup.string().required('Description is required'),
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            // Your form submission logic here
            // You can use the `values` object to access the form data.

            // For example, you can add a check for the image, similar to your code for adding a book.
            if (!image) {
                toast.error('Choose an image');
            } else {
                // Handle image upload and book update logic here.
            }
        },
    });

    const categories = async () => {
        const cats = await getCategories()
        console.log(cats.data.categories, '--------categories')
        setAllCategories(cats.data.categories)
    }
    const getBooks = async (id) => {
        console.log(id, '----------book id')
        const response = await bookDetails(id)
        const data = response.data
        console.log(data, '--------------')
        // setImageFile(data.imageUrl)
        setBookData({
            title: data.title,
            category: data.category,
            description: data.description,
            author: data.author,
            price: data.price,
        })
    }
    useEffect(() => {
        categories()
    }, [])

    useEffect(() => {
        getBooks(id)
    }, [id])
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-16">
            {/* ... Other form elements ... */}
            <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                    Description
                </label>
                <Field
                    as="textarea"
                    name="description"
                    id="description"
                    className={`w-full outline-none p-2 rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900`}
                />
                <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                />
            </div>
            {/* ... Other form elements ... */}
        </form>

    )
}

export default Edit