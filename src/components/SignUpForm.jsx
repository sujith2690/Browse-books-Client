import React, { useState } from 'react'
import { signUpSchema } from '../schema/validationSchema';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { otpVerify, signUpApi } from '../APIs/authApi';
import { useDispatch } from 'react-redux';
import { accessToken, userDetails } from '../Redux/Features/userSlice';

const SignUpForm = ({ handleSignUp }) => {
    const dispatch = useDispatch()
    const [otpValue, setOtpValue] = useState()
    const [otp, setOtp] = useState(false)
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
                setFormValues(values)
                console.log(values, '----values')
                const result = await signUpApi(values)
                console.log(result)
                toast.success(result.data.message)
                setLoading(false)
                setOtp(true)
                // navigate('/')
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error, 'Login failed');
            }
            action.resetForm();
            console.log('before reset')
            setLoading(false)
        }
    })
    const handleSubmitOtp = async (e) => {
        e.preventDefault();
        formValues.otp = otpValue;
        const response = await otpVerify(formValues);
        const success = response.data.success
        if (success) {
            dispatch(userDetails(response.data.User));
            dispatch(accessToken(response.data.Token));
            localStorage.setItem("token", response.data.Token);
            localStorage.setItem("user", JSON.stringify(response.data.User));
            toast.success(response.data.message);
            setOtpValue("");
            navigate('/');
        } else {
            toast.error(response.data.message);
        }
    }
    return (
        <>
            {!otp ?

                <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"  >
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
                    </div>}
                    <div className="text-right text-gray-400  hover:text-gray-100">
                        <p className='cursor-pointer' onClick={handleSignUp} >Already have account ! Login with us</p>
                    </div>
                </form >
                :
                <form onSubmit={handleSubmitOtp} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"  >
                    <div className="pb-2 pt-4">
                        <input
                            onChange={(e) => setOtpValue(e.target.value)}
                            type="number"
                            name="newOtp"
                            id="newOtp"
                            placeholder="OTP"
                            className='block w-full p-4 text-lg rounded-sm bg-black'
                        />
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
                            Confirm OTP
                        </button>
                    </div>}
                    <div className="text-right text-gray-400  hover:text-gray-100">
                        <p className='cursor-pointer' >Resend OTP</p>
                    </div>
                </form >


            }

        </>
    )
}

export default SignUpForm