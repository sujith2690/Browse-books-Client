import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { useFormik } from 'formik';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { bookSchema } from '../schema/validationSchema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBook } from '../APIs/crudApi';
import { getCategories } from '../APIs/bookApi';
import { useDispatch } from 'react-redux';
import { addNewBook } from '../Redux/Features/bookSlice';
import Footer from '../components/Footer';
import LoadingContent from '../components/LoadingContent';

const AddBook = () => {
  const dispatch = useDispatch()
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [bookTypes, setBookTypes] = useState([])

  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    category: '',
    description: '',
    author: '',
    price: '',
  })
  const validationSchema = bookSchema;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, action) => {
      setLoading((prev) => !prev)
      if (!image) {
        toast.error("Choose image")
      } else {
        try {
          const base64 = await convertBase64(image);
          values.imageUrl = base64
          let book = await addBook(values)
          console.log(book, '-----------book book')
          dispatch(addNewBook(book.data.savedBook))
          toast.success(book.data.message)
        } catch (error) {
          console.log(error)
        }
        imageRef.current.value = '';
        setImage(null)
        action.resetForm()
        // setLoading(!loading)
        setLoading((prev) => !prev)
        // navigate('/myBooks')
      }
    },
  });
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
      const maxSizeInBytes = 1024 * 1024 * 2; // 2 MB
      const file = event.target.files[0];
      if (allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
        setImage(file);
      } else {
        if (file.size >= maxSizeInBytes) {
          toast.error('Large file');
          reset();
        } else {
          reset();
        }
      }
    }
  };

  const reset = () => {
    imageRef.current.value = '';
    setImage(null);
  };
  const categories = async () => {
    const cats = await getCategories()
    setBookTypes(cats.data.categories)
  }
  useEffect(() => {
    categories()
  }, [])
  return (
    <div className='h-screen bg-slate-600'>
      <Navbar />
      <ToastContainer />
      <div className=' h-full flex flex-col justify-between'>
        <section className="p-6 h-full  text-gray-50 grid w-full md:grid-cols-[2fr,4fr] overflow-y-scroll ">
          <div className="flex justify-center">
            <div className="">
              <p className="font-medium">New Book</p>
              <p className="text-xs"></p>
              <div className="col-span-full">
                <label htmlFor="imageFile" className="text-sm">
                  Book Image
                </label>
                <div className="w-[17rem] relative ">
                  <img
                    src={image ? URL.createObjectURL(image) : ''}
                    alt=""
                    className="relative object-contain rounded-md bg-gray-500"
                  />
                  <button
                    type="button"
                    className="absolute bottom-[.3rem] right-[.3rem] px-4 py-2 border rounded-md border-gray-100"
                    onClick={() => imageRef.current.click()}
                  >
                    <BsFillPencilFill />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-16">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 ">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="title" className="text-sm">
                  Title
                </label>
                <input
                  value={values.title || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Title"
                  className={`w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 ${touched.title && errors.title ? 'border-red-500' : ''
                    }`}
                />
                {touched.title && errors.title ? (
                  <p className="text-red-500 text-xs italic">{errors.title}</p>
                ) : null}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Book Type</label>
                <select
                  value={values.category || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="category"
                  id="category"
                  className="w-full p-2 outline-none rounded-md focus:ring focus:ring-indigo-500 border-gray-700 text-gray-900 capitalize"
                >
                  <option value="" className="" disabled defaultValue>
                    Choose Book
                  </option>
                  {bookTypes.map((item, i) => {
                    return (
                      <option key={i} value={item} className="uppercase">
                        {item}
                      </option>
                    );
                  })}
                </select>
                {touched.category && errors.category ? (
                  <p className="text-red-500 text-xs italic">{errors.category}</p>
                ) : null}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="author" className="text-sm">
                  Author
                </label>
                <input
                  value={values.author || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="author"
                  id="author"
                  type="text"
                  placeholder="Author"
                  className={`w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 ${touched.author && errors.author ? 'border-red-500' : ''
                    }`}
                />
                {touched.author && errors.author ? (
                  <p className="text-red-500 text-xs italic">{errors.author}</p>
                ) : null}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Book price</label>
                <input
                  value={values.price || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="price"
                  id="price"
                  type="text"
                  placeholder="Price"
                  className={`w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 ${touched.price && errors.price ? 'border-red-500' : ''
                    }`}
                />
                {touched.price && errors.price ? (
                  <p className="text-red-500 text-xs italic">{errors.price}</p>
                ) : null}
              </div>
            </div>
            <div className=''>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
                accept="image/png, image/gif, image/jpeg"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${touched.imageFile && errors.imageFile ? 'border-red-500' : ''}`}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea
                value={values.description || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                id="description"
                className={`w-full outline-none p-2  rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 ${touched.description && errors.description ? 'border-red-500' : ''
                  }`}
              ></textarea>
              {touched.description && errors.description ? (
                <p className="text-red-500 text-xs italic">{errors.description}</p>
              ) : null}
            </div>
            <div className="font-semibold flex justify-center items-center py-2 px-3 rounded cursor-pointer bg-indigo-800 w-full text-white hover:text-gray-300 col-end-7"
            >
              {
                !loading ?
                  <button
                    type="submit"
                  >
                    Submit
                  </button> : <LoadingContent />
              }
            </div>
          </form>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default AddBook;
