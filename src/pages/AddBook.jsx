import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { useFormik } from 'formik';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { bookSchema } from '../schema/validationSchema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addBook, uploadImage } from '../APIs/crudApi';


const AddBook = () => {
  const imageRef = useRef()
  const [image, setImage] = useState(null)

  const navigate = useNavigate()
  const initialValues = {
    title: '',
    bookType: '',
    imageUrl: '',
    description: '',
    author: '',
    price: "",
  };
  const validationSchema = bookSchema

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, action) => {
      try {
        if (image) {
          try {
            const base64 = await convertBase64(image);
            const imgUrl = await uploadImage({ image: base64 })
            console.log(imgUrl.data, '-------values')
            values.imageUrl = imgUrl.data
          } catch (error) {
            console.log(error, 'error in image upload')
          }
        }
        let book = await addBook(values)
        console.log(book.data, '-----response')
        book = book.data.success
        if (book) {
          navigate('/home')
        }
      } catch (error) {
        console.log(error, 'Login failed');
      }
      // action.resetForm()
    }
  })
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const allowedTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
      const maxSizeInBytes = 1024 * 1024 * 2; // 1 MB

      const file = event.target.files[0];
      if (allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
        setImage(file);
      } else {
        if (file.size >= maxSizeInBytes) {
          toast.error("Large file")
          reset()
        } else {
          reset()
        }
      }
    }
  }
  const reset = () => {
    setImage(null);
  }
  const BookOptions = ['documents', 'science', 'biological', 'anime']

  return (
    <>
      <Navbar />
      <ToastContainer />
      <section className="p-6    bg-gray-800 text-gray-50 grid h-[90vh] w-full md:grid-cols-[2fr,4fr]  ">
        <div className="flex justify-center">
          <div className="space-y-2 ">
            <p className="font-medium">New Book</p>
            <p className="text-xs"></p>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">Book Image</label>
              <div className="w-[17rem] h-full relative ">
                <img
                  src={image ? URL.createObjectURL(image) : ""}
                  alt=""
                  className=" relative object-contain  rounded-md bg-gray-500 "
                />
                <button
                  type="button"
                  className="absolute bottom-[.3rem] right-[.3rem] px-4 py-2 border rounded-md border-gray-100"
                  onClick={() => imageRef.current.click()}
                >
                  <BsFillPencilFill />
                </button>
                <div style={{ display: "none" }}>
                  <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} accept="image/png, image/gif, image/jpeg" />
                </div>
              </div>
            </div>

          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-16">
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 ">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm">Title</label>
              <input
                value={values.title || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="title"
                id="title"
                type="text" placeholder="Title" className="w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900" />
              {errors.title && touched.title ? (
                <p className="text-red-600 text-center text-sm">{errors.title}</p>
              ) : null}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Book Type </label>
              <select
                value={values.bookType || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="bookType"
                id="bookType" className="w-full p-2 outline-none rounded-md  focus:ring focus:ring-indigo-500 border-gray-700 text-gray-900 capitalize">
                <option value="" className='' disabled defaultValue>Choose Book</option>
                {BookOptions.map((item, i) => {
                  return (
                    <option key={i} value={item} className="uppercase ">{item}</option>
                  )
                })}
              </select>
              {errors.bookType && touched.bookType ? (
                <p className="text-red-600 text-center text-sm">{errors.bookType}</p>
              ) : null}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm">Author</label>
              <input
                value={values.author || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="author"
                id="author"
                type="text" placeholder="Author" className="w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900" />
              {errors.author && touched.author ? (
                <p className="text-red-600 text-center text-sm">{errors.author}</p>
              ) : null}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Book price </label>
              <input
                value={values.price || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="price"
                id="price"
                type="text" placeholder="Price" className="w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900" />
              {errors.price && touched.price ? (
                <p className="text-red-600 text-center text-sm">{errors.price}</p>
              ) : null}
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">Description</label>
              <textarea
                value={values.description || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                id="description"
                className="w-full outline-none p-2  rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900"></textarea>
              {errors.description && touched.description ? (
                <p className="text-red-600 text-center text-sm">{errors.description}</p>
              ) : null}
            </div>
          </div>
          <div className="flex bg-red justify-end mx-6 mb-6">

            <button type="submit" className=" font-semibold flex justify-center items-center py-2 px-3   rounded-2xl cursor-pointer bg-gray-100 text-gray-800  col-end-7 ">
              submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddBook