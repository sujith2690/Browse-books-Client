import React, { useEffect, useState } from 'react'
import { HiUserCircle, HiOutlineBell, HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { ImBlogger2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetUser } from '../Redux/Features/userSlice';
import { allNotion, clearNotes } from '../APIs/crudApi';


const path = [
    { name: 'Home', href: '/', current: true },
];
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'My Books', href: '/myBooks', current: false },
    { name: 'Add Books', href: '/addBook', current: false },
    { name: 'Favorite', href: '/favorite', current: false },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [notifier, setNotifier] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.userDetails)
    const token = useSelector((state) => state.user.accessToken)
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notes, setNotes] = useState(false)
    const toggleMenu = () => {
        setOpen(!open);
    };

    const toggleProfileMenu = () => {
        if (user) setProfileOpen(!profileOpen);
    };
    const toggleNotification = async () => {
        if (notes) {
            const clear = await clearNotes()
            setNotifier([])
            setNotes(!notes);
        } else {
            setNotes(!notes);
        }
    };
    const handleLogout = () => {
        dispatch(resetUser())
        localStorage.clear()
        setProfileOpen(!profileOpen);
        navigate('/login')
    }
    const getNotification = async () => {
        if (user._id) {
            localStorage.setItem("token", token);
            const not = await allNotion()
            setNotifier(not.data.notifications)
        }
    }
    useEffect(() => {
        getNotification()
        localStorage.setItem("token", token);
    }, [])
    const handleClose = async(e) => {
        console.log('--------pressed')
            // setNotifier([])
            // setNotes(!notes);
    }

    return (
        <div id='container' onClick={handleClose} className=" bg-indigo-500  ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <HiX className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiOutlineMenuAlt3 className="block h-6 w-6 text-white" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center cursor-pointer" onClick={() => navigate('/')}>
                            <ImBlogger2 className="text-3xl text-white" /><p className='ml-2 text-white font-extrabold text-xl'>BrowsBooks</p>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.href === location.pathname
                                                ? 'bg-gray-900 text-white'
                                                : 'text-white hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        <button
                            type="button"
                            onClick={toggleNotification}
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white hover:outline-none hover:ring-2 hover:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        ><span className='relative text-white font-bold'>
                                {notifier.length > 0 && (
                                    <span className="bg-red-500 rounded-full h-4 w-4 text-xs absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center">
                                        {notifier.length}
                                    </span>
                                )}
                            </span>
                            <HiOutlineBell className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {notes && notifier.length > 0 && (
                            <div className="absolute right-0 z-10  w-48  mt-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {notifier.map((item, i) => {
                                    return (
                                        <p key={i} onClick={() => navigate(`/book/${item.bookId}`)} className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:font-bold">
                                            {item.content}
                                        </p>
                                    )
                                })}
                            </div>
                        )}
                        <div className="relative ml-3">
                            <button
                                onClick={toggleProfileMenu}
                                className="relative flex rounded-full bg-gray-800 text-sm hover:outline-none hover:ring-2 hover:ring-white  focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <div className='flex items-center'>
                                    <HiUserCircle className="h-8 w-8 rounded-full mr-2 text-white" aria-hidden="true" /><p className='text-white mr-2'>{user.name}</p>
                                </div>
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {/* <Link
                                        to={'profile'}
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="block px-4 py-2 text-sm  cursor-pointer text-gray-700 hover:bg-gray-100 hover:font-bold"
                                    >
                                        Your Profile
                                    </Link> */}
                                    <p
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:font-bold"
                                    >
                                        {user.name ? 'Sign out' : 'Login'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            {open && (
                <div className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {user.name ? navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setOpen(!open)}
                                className={classNames(
                                    item.href === location.pathname
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))
                            : path.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setOpen(!open)}
                                    className={classNames(
                                        item.href === location.pathname
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
