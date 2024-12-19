import React from 'react'

const LoadingContent = () => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
        </div>
    )
}

export default LoadingContent