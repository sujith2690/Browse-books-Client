import React from 'react'

const Modal = ({ onClose, visible,removed,cancel }) => {

    if (!visible) return null

    const handleClose = (e) => {
        if (e.target.id === "container") {
            onClose()
        }
    }

    const handleRemove = async () => {
        removed()
        onClose()
    }
    const handleRemoveCancel = async () => {
        cancel()
        onClose()
    }



    return (
        <div
            id='container'
            onClick={handleClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
            <div className='bg-blue-950 p-10 rounded'>
                <p className='text-white text-xl'>Are You Sure..?</p>
                <div className='flex gap-3'>
                    <button className="px-5 py-2  bg-red-800 text-white rounded"
                        onClick={handleRemove}
                    >Yes</button>
                    <button className="px-5 py-2  bg-green-800 text-white rounded"
                    onClick={handleRemoveCancel}
                    >No</button>
                </div>
            </div>
        </div >
    )
}

export default Modal