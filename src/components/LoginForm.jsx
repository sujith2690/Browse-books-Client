import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginSchema } from '../schema/validationSchema';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logInApi } from '../APIs/authApi';
import { useDispatch } from 'react-redux'
import { accessToken, userDetails } from '../Redux/Features/userSlice';


const LoginForm = ({ handleLogin }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const initialValues = formValues
    const validationSchema = loginSchema
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                const result = await logInApi(values)
                const success = result.data.success
                if (success) {

                    dispatch(userDetails(result.data.User));
                    dispatch(accessToken(result.data.Token));
                    localStorage.setItem("token", result.data.Token);
                    localStorage.setItem("user", JSON.stringify(result.data.User));
                    navigate('/')
                }
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error, 'Login failed');
            }
            action.resetForm();
            console.log('before reset')
            setLoading(false)
        }
    })
    return (
        <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"  >
            <ToastContainer />
            <div className="pb-2 pt-4">
                <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className='block w-full p-4 text-lg rounded-sm bg-black'
                />
            </div>
            {errors.email && touched.email ? (
                <p className="text-red-600 text-center text-sm">{errors.email}</p>
            ) : null}
            <div className="pb-2 pt-4">
                <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className='block w-full p-4 text-lg rounded-sm bg-black'
                />
            </div >
            {errors.password && touched.password ? (
                <p className="text-red-600 text-center text-sm">{errors.password}</p>
            ) : null}
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