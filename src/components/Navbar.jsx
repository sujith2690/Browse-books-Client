import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return (
        <nav className="bg-indigo-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/home" className="text-white text-2xl font-semibold">BrowsBooks</Link> 
                <ul className="flex space-x-4 text-white">
                    <li><Link to="/home" className="hover:underline">Home</Link></li> 
                    <div>
                        <li><Link to="/favorite" className="hover:underline">Favorite</Link></li>
                    </div>
                    <div>
                        <li><Link to="/addBook" className="hover:underline">AddBook</Link></li>
                    </div>
                    <div>
                        <li><Link to="/addBook" className="hover:underline">MyBooks</Link></li>
                    </div>
                    <div>
                        <li>
                            <a className="cursor-pointer hover:underline">Logout</a>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
