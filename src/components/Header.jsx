import React from 'react'

const Header = () => {
    return (
        <header className="text-white py-20 text-center" style={{backgroundColor:'#161616'}}>
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                    Discover Your Next Book
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    Find the perfect book from our wide selection of genres.
                </p>
            </div>
        </header>
    )
}

export default Header