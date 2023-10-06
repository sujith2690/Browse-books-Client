import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { bookDetails } from '../APIs/searchApi'
import { toast } from 'react-toastify'
import { likeBook } from '../APIs/crudApi'
import { useSelector } from 'react-redux'

const SinglePdt = () => {
  const user = useSelector((state)=>state.user.userDetails._id)
  const [data, setData] = useState()
  const { id } = useParams()
  const getBook = async (id) => {
    const response = await bookDetails(id)
    setData(response.data)
  }
  useEffect(() => {
    getBook(id)
  }, [])
  const handleLike = async () => {
    if(user){
      const liked = await likeBook(id)
      if (liked.data.message === 'Book UnLiked') {
          toast.success(liked.data.message)
          dispatch(removeFavoriteBook(liked.data.bookDetails))
      } else {
          toast.success(liked.data.message)
          dispatch(addFavoriteBook(liked.data.bookDetails))
      }
    }else{
      toast.warning("Please do Login")
    }
}

  return (
    <>
      {
        data ?
          <div className=" md:h-screen  bg-gray-200 ">
            <div className=" ">
              <Navbar />

            </div>
            <div className="flex w-full h-[85%]  justify-center items-center ">
              <div className="grid w-full h-full  md:grid-cols-[1fr,1fr] grid-cols-1 gap-10 md:gap-0">

                <div className="grid h-full place-items-center">
                  <div className="relative">
                    <img src={data.imageUrl ? data.imageUrl.url : "https://images.unsplash.com/photo-1507415492521-917f60c93bfe?auto=format&fit=crop&w=500&q=60"} className="object-cover w-[18rem] relative z-10" alt="" />
                    <div className="absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                  </div>
                </div>
                <div className="grid h-full  place-items-center">
                  <div className="w-full   px-10">
                    <div className="mb-10">
                      <h2 className="font-bold uppercase text-2xl">{data.title}</h2>
                      <h4 className="font-bold uppercase"><br />{data.author}</h4>
                      <h6 className="-mt-3 uppercase mb-5"><br />{data.category}</h6>
                      <p className="text-sm">{data.description}</p>
                    </div>
                    <div>
                      <div className="inline-block align-bottom mr-5">
                        <span className="text-2xl leading-none align-baseline">&#8377;</span>
                        <span className="font-bold text-5xl leading-none align-baseline">{data.price}</span>
                      </div>
                      <div className="inline-block align-bottom">
                        <button className="bg-yellow-500 text-white hover:bg-indigo-500 rounded-full px-10 py-2 font-semibold" onClick={handleLike}>
                          Add to Favorite
                        </button>
                      </div>
                    </div>
                  </div> </div>
              </div>
            </div>
          </div>
          : ''
      }

    </>
  )
}

export default SinglePdt