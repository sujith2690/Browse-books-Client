import React, { useState } from 'react'
import { signUpSchema } from '../schema/validationSchema';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = ({ handleSignUp }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const initialValues = formValues
    const validationSchema = signUpSchema
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                console.log(values, '----values', loading)
                toast.success('Sign up Completed')
                // navigate('/')
            } catch (error) {
                console.log(error, 'Login failed');
            } 
            action.resetForm();
            console.log('before reset')
            setLoading(false)
        }
    })
    return (
        <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"  >
            <ToastContainer/>
            <div className="pb-2 pt-4">
                <input
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    type="text"
                    name="name"
                    id="name"
                    placeholder="User Name"
                    className='block w-full p-4 text-lg rounded-sm bg-black'
                />
            </div>
            {errors.name && touched.name ? (
                <p className="text-red-600 text-center text-sm">{errors.name}</p>
            ) : null}
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
            <div className="pb-2 pt-4">
                <input
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className='block w-full p-4 text-lg rounded-sm bg-black'
                />
            </div >
            {errors.confirmPassword && touched.confirmPassword ? (
                <p className="text-red-600 text-center text-sm">{errors.confirmPassword}</p>
            ) : null}

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
                    Sign Up
                </button>
            </div> }
            <div className="text-right text-gray-400  hover:text-gray-100">
                <p className='cursor-pointer' onClick={handleSignUp} >Already have account ! Login with us</p>
            </div>

        </form >
    )
}

export default SignUpForm