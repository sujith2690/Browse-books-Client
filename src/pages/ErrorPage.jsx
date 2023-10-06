import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='h-screen bg-black flex flex-col items-center justify-center'>
            <h1 className='text-6xl'>BROWSBOOKS</h1> <br />
            <h1 className='text-6xl'>404</h1>
            <h2 className='text-white text-3xl'>Page not Found</h2>
            <button className='bg-blue-700 text-white p-3 mt-5 rounded-md hover:bg-blue-900'
                onClick={() => navigate('/home')}
            >Go to Home</button>

        </div>
    )
}

export default ErrorPage