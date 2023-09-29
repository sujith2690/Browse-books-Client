import React, { useState } from 'react'
import './Auth.css'
import LoginForm from '../../components/LoginForm'
import SignUpForm from '../../components/SignUpForm'

const Auth = () => {
    const [auth, setAuth] = useState(true)
    const handleLogin = () => {
        setAuth((prev) => !prev)
    }
    return (
        <section className="min-h-screen flex items-stretch text-white">
            <div className="w-1/2">
                <div
                    className="lg:flex w-full h-full hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80)' }}
                >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    <div className="w-full px-24 z-10">
                        <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                        <p className="text-3xl my-4">Read and craft the pages of your book</p>
                    </div>
                    <div
                        className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"
                    ></div>
                </div>

            </div>

            <div
                className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
                style={{ backgroundColor: '#161616' }}
            >
                <div
                    className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80)' }}
                >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <h1 className="my-6 text-6xl font-thin">BrowsBooks</h1>
                    {auth ? <LoginForm handleLogin={handleLogin} />
                        : <SignUpForm handleSignUp={handleLogin} />
                    }

                </div>
            </div>
        </section>

    )
}

export default Auth