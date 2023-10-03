import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { bookDetails } from '../APIs/searchApi'

const SinglePdt = () => {
  const [data, setData] = useState()
  const { id } = useParams()
  const getBook = async (id) => {
    const response = await bookDetails(id)
    console.log(response.data)
    setData(response.data)
  }
  useEffect(() => {
    getBook(id)
  }, [])


  return (
    <>
      {
        data ?
        <div className=" md:h-screen  bg-gray-200 ">
          <div className=" ">
          <Navbar />

          </div>
          
         {/* <div className="min-w-screen mb-8 bg-gray-200 flex items-center p-2 lg:p-5 overflow-hidden relative ">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center flex-col lg:flex-row h-[50rem] md:h-auto justify-center mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                  <img src={data.image ? data.image:"https://images.unsplash.com/photo-1507415492521-917f60c93bfe?auto=format&fit=crop&w=500&q=60"} className="object-cover relative z-10" alt="" />
                  <div className="absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
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
                    <button className="bg-yellow-500 text-white hover:bg-indigo-500 rounded-full px-10 py-2 font-semibold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div >
          </div >
        </div >  */}
        <div className="flex w-full h-[85%]  justify-center items-center ">
          <div className="grid w-full h-full  md:grid-cols-[1fr,1fr] grid-cols-1 gap-10 md:gap-0">

          <div className="grid h-full place-items-center">
          <div className="relative">
                  <img src={data.image ? data.image:"https://images.unsplash.com/photo-1507415492521-917f60c93bfe?auto=format&fit=crop&w=500&q=60"} className="object-cover w-[18rem] relative z-10" alt="" />
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
                    <button className="bg-yellow-500 text-white hover:bg-indigo-500 rounded-full px-10 py-2 font-semibold">
                      Add to Cart
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