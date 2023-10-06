import React, { useState } from 'react';
import { BsFillSuitHeartFill, BsPencil } from 'react-icons/bs';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { deleteBook, likeBook } from '../APIs/crudApi';
import Modal from './Modal';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteBook, removeBook, removeFavoriteBook } from '../Redux/Features/bookSlice';

const ProductCard = ({ values, userBooks }) => {
    const user = useSelector((state) => state.user.userDetails._id)
    const dispatch = useDispatch()
    const [remove, setRemove] = useState(false)
    const [showModel, setShowModel] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = values._id
    const handleClose = () => setShowModel(false)
    const handleDelete = async () => {
        if (remove === true) {
            const response = await deleteBook(bookId)
            dispatch(removeBook(bookId))
            userBooks()
            toast.success('Book Deleted')
            setShowModel(false)
            setRemove(false)
        }
        else {
            setRemove(true)
            setShowModel(true)
        }
    }
    const removeCancel = () => {
        toast.warning("Book Not Deleted")
        if (remove) setRemove(false)
    }
    const handleLike = async () => {
        if (user) {
            const liked = await likeBook(id)
            if (liked.data.message === 'Book UnLiked') {
                toast.success(liked.data.message)
                dispatch(removeFavoriteBook(liked.data.bookDetails))
            } else {
                toast.success(liked.data.message)
                dispatch(addFavoriteBook(liked.data.bookDetails))
            }
        } else {
            toast.warning("Please do Login")
        }
    }
    const handleMove = () => {
        navigate(`/book/${bookId}`)
    }

    const isMyBooksPage = location.pathname === '/myBooks';
    return (
        <>
            {values ? (<>
                <div className="flex justify-center items-center cursor-pointer">
                    <div className="flex flex-col justify-between w-72 sm:w-96 h-96 bg-white bg-center text-gray-800 overflow-hidden"

                        style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: `url(${values.imageUrl?.url})` }}>
                        <div className="flex justify-between items-center ml-4 pr-8">
                            <div className="bg-indigo-500 text-white bg-opacity-95 shadow px-2 py-1 flex items-center font-bold text-xs rounded">
                                {values.category}
                            </div>
                            <div className={`bg-${isMyBooksPage ? 'yellow' : 'indigo'}-500 w-10 h-12 shadow  flex flex-col-reverse p-2 text-center items-center  text-white rounded-b-full cursor-pointer hover:bg-gray-900`}>
                                {isMyBooksPage ? (
                                    <BsPencil className='text-xl' onClick={() => navigate(`/editBooks/${values._id}`)} />
                                ) : (
                                    <BsFillSuitHeartFill className='text-xl' onClick={handleLike} />
                                )}
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-95 p-4 flex flex-col mr-4 mb-8"

                        >
                            <div className='flex items-center justify-between'>
                                <h3 className="truncate text-xl font-bold pb-2">
                                    {values.title}
                                </h3>
                                <div className='flex flex-col gap-4'>
                                    {isMyBooksPage ?
                                        <FaTrashAlt className='text-lg text-red-600' onClick={handleDelete} /> : ''
                                    }
                                    <FaEye onClick={handleMove} />
                                </div>
                            </div>
                            <p className="truncate text-gray-500 text-sm">
                                {values.description}
                            </p>
                            <span className="text-indigo-500 text-xs">{values.author}</span>
                            <h3 className="truncate text-xl font-bold pb-2">
                                {values.price}
                            </h3>
                        </div>
                    </div>
                </div>
                <Modal
                    onClose={handleClose}
                    visible={showModel}
                    removed={handleDelete}
                    cancel={removeCancel}
                />
            </>
            ) : (
                ''
            )}
        </>
    );
};

export default ProductCard;
