import React, { useEffect, useRef, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { bookDetails } from '../APIs/searchApi';
import { getCategories } from '../APIs/bookApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { addBook, updateBook, uploadImage } from '../APIs/crudApi';

const EditBooks = () => {
    const navigate = useNavigate();
    const imageRef = useRef();
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null)
    const [allCategories, setAllCategories] = useState()
    const [bookData, setBookData] = useState({
        title: '',
        category: '',
        description: '',
        author: '',
        price: '',
    })
    const { id } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookId = id;
            let values = bookData;
            if (!image) {
                values.imageUrl = imageFile
                let book = await updateBook(bookId, values);
                console.log(book.data.message)
                toast.success(book.data.message)
            } else {
                const bookId = id;
                const base64 = await convertBase64(image);
                // const imgUrl = await uploadImage({ image: base64 });
                // values.imageUrl = imgUrl.data;
                values.imageUrl = base64;
                // values.bookId = bookId;
                toast.success("Books Updated")
                let book = await updateBook(bookId, values);
                toast.success(book.data.message)
            }
            imageRef.current.value = '';
            setImage(null);
            setBookData({
                title: '', category: '', description: '', author: '', price: '',
            });
            navigate('/myBooks');
        } catch (error) {
            console.log(error);
        }
    }

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
    const getBooks = async (id) => {
        const response = await bookDetails(id)
        const data = response.data
        setImageFile(data.imageUrl)
        setBookData({
            title: data.title,
            category: data.category,
            description: data.description,
            author: data.author,
            price: data.price,
        })
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
    const categories = async () => {
        const cats = await getCategories()
        setAllCategories(cats.data.categories)
    }
    useEffect(() => {
        categories()
    }, [])

    useEffect(() => {
        getBooks(id)
    }, [id])

    return (
        <>
            <Navbar />
            <ToastContainer />
            <section className="p-6 bg-gray-800 text-gray-50 grid h-[90vh] w-full md:grid-cols-[2fr,4fr]  ">
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
                                    src={image ? URL.createObjectURL(image) : imageFile?.url}
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
                                value={bookData.title}
                                name="title"
                                id="title"
                                type="text"
                                placeholder="Title"
                                required
                                className={`w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 `}
                                onChange={(e) => setBookData({ ...bookData, title: e.target.value })} // Update bookData on change
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Book Type</label>
                            <select
                                name="category"
                                id="category"
                                className="w-full p-2 outline-none rounded-md focus:ring focus:ring-indigo-500 border-gray-700 text-gray-900 capitalize"
                                value={bookData.category}
                                onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                            >
                                <option value="" className="" disabled defaultValue>
                                    Choose Book
                                </option>
                                {allCategories?.map((item, i) => {
                                    return (
                                        <option key={i} value={item} className="uppercase">
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="author" className="text-sm">
                                Author
                            </label>
                            <input
                                value={bookData.author}
                                onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                                name="author"
                                id="author"
                                type="text"
                                required
                                placeholder="Author"
                                className={`w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 `}
                            />

                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Book price</label>
                            <input
                                value={bookData.price}
                                onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
                                name="price"
                                id="price"
                                type="number"
                                required
                                placeholder="Price"
                                className={`w-full p-2 outline-none rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 `}
                            />

                        </div>
                    </div>
                    <div className=''>
                        <input
                            ref={imageRef}
                            onChange={onImageChange}

                            type="file"
                            name="myImage"
                            accept="image/png, image/gif, image/jpeg"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="description" className="text-sm">
                            Description
                        </label>
                        <textarea
                            value={bookData.description}
                            onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                            required
                            name="description"
                            id="description"
                            className={`w-full outline-none p-2  rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 `}
                        ></textarea>

                    </div>
                    <div className="flex bg-red justify-end mx-6 mb-6">
                        <button
                            type="submit"
                            className="font-semibold flex justify-center items-center py-2 px-3 rounded-2xl cursor-pointer bg-gray-100 text-gray-800 col-end-7"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section></>
    )
}

export default EditBooks