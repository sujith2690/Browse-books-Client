import React from 'react'

const Navbar = () => {
    return (

        <nav className="bg-indigo-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/home" className="text-white text-2xl font-semibold">BrowsBooks</a>
                <ul className="flex space-x-4 text-white">
                    <li><a href="/home" className="hover:underline">Home</a></li>
                    <div >
                        <li><a href="/favorite" className="hover:underline">Favorite</a></li>
                    </div>
                    <div >
                        <li>
                            <a className="cursor-pointer hover:underline">Logout</a>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar