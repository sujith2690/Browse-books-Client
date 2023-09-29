import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({handleLogin}) => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
    }
    return (
        <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"  >
            <div className="pb-2 pt-4">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className='block w-full p-4 text-lg rounded-sm bg-black'
                />
            </div>

            <div className="pb-2 pt-4">
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className='block w-full p-4 text-lg rounded-sm bg-black'
                />
            </div >
            <div className="text-right text-gray-400  hover:text-gray-100">
                <p className='cursor-pointer' onClick={handleLogin} >Register with us</p>
            </div>
            {loading ? <div className="pb-2 pt-4">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
                </div>
            </div> : <div className="pb-2 pt-4">
                <button
                    type="submit"
                    className="uppercase block w-full p-4 text-lg bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                    Login
                </button>
            </div>}

        </form >

    )
}

export default LoginForm