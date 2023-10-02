import React from 'react'
import Navbar from '../components/Navbar'

const SinglePdt = () => {
  return (
    <>
      <Navbar />
      <div className="min-w-screen bg-gray-200 flex items-center p-2 lg:p-5 overflow-hidden relative">
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1507415492521-917f60c93bfe?auto=format&fit=crop&w=500&q=60" className="w-full relative z-10" alt="" />
                <div className="absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
              <div className="mb-10">
                <h1 className="font-bold uppercase text-2xl">titel</h1>
                <h4 className="font-bold uppercase"><br />auther</h4>
                <h6 className="-mt-3 uppercase mb-5"><br />category</h6>
                <p className="text-sm">description</p>
              </div>
              <div>
                <div className="inline-block align-bottom mr-5">
                  <span className="text-2xl leading-none align-baseline">&#8377;</span>
                  <span className="font-bold text-5xl leading-none align-baseline">price</span>
                </div>
                <div className="inline-block align-bottom">
                  <button className="bg-yellow-500 text-white hover:bg-indigo-500 rounded-full px-10 py-2 font-semibold">
                    Add to Favorite
                  </button>
                </div>
              </div>
            </div>
          </div > 
        </div >
      </div >
    </>
  )
}

export default SinglePdt