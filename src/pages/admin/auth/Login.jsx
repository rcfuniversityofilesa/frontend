import React, { useState } from 'react'
import '../../../styles/pages/admin/auth/auth.css'

import "aos/dist/aos.css";
import AOS from "aos";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../../../assets/logo.png'
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext'
import { decodeToken } from '../../../utils/jwtUtils'


export default function Login() {
    const [showPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    React.useEffect(() => {
        AOS.init({ duration: 3000 });
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const res = await axios.post('https://backend-04sy.onrender.com/api/admin/login', values)

                // Store token and admin data
                localStorage.setItem('token', res.data.token)
                localStorage.setItem("admin", JSON.stringify(res.data.admin));
                
                // Update auth context
                await login(values.email, values.password)
                
                // Decode token to get role
                const decoded = decodeToken(res.data.token)
                const userRole = decoded?.role

                toast.success(res.data.message)

                // Redirect based on role
                if (userRole === 'workersInTraining') {
                    navigate('/admin/workersInTraining/overview')
                } else if (userRole === 'media') {
                    navigate('/admin/media/overview')
                } else {
                    navigate('/admin/profile')
                }
            } catch (err) {
                // console.log(err)
                toast.error(`Error loggining in: ${err.response?.data?.message || err.message}`)
            } finally{
                setLoading(false)
            }
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email format').required('Email is required'),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        })
    })

    return (
        <div className="authPage">
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
            <div className="authContainer" data-aos="fade-up">
                <img src={logo} alt="logo" className="authLogo" />
                <h2 className="authTitle">Admin Signin</h2>

                <form className="authForm" onSubmit={loading ? undefined : formik.handleSubmit}>
                    <div>
                        <div>
                            <FaEnvelope className='inputIcon' />
                            <input
                                type="email"
                                name='email'
                                placeholder="Email"
                                className="authInput"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <p className='authErr'>{formik.touched.email && formik.errors.email ? <small>{formik.errors.email}</small> : ''} </p>
                    </div>
                    <div>
                        <div>
                            <FaLock className='inputIcon' />
                            <input
                                type={showPassword ? 'text' : "password"}
                                name='password'
                                placeholder="Password"
                                className="authInput"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className='inputIcon' onClick={() => setShowConfirmPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <p className='authErr'>{formik.touched.password && formik.errors.password ? <small>{formik.errors.password}</small> : ''} </p>
                    </div>

                    {/* <p><Link className='links' to={'/auth/forget-password'}>Forget Password?</Link></p> */}

                    <Button type="submit" text={loading ? (<span className="btnSpinner"><FaSpinner className="spin" /></span>) : "Login"} />

                    <p>I don't have an account <Link className='links' to={'/admin/auth/register'}>Register</Link></p>
                </form>
            </div>
        </div>
    );
};