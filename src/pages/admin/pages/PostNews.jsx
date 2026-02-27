import React from 'react'
import '../../../styles/pages/admin/pages/Post.css'

import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import Button from '../../../components/common/Button'
import { FaSpinner } from 'react-icons/fa'

export default function PostNews() {
    const [preview, setPreview] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const apiLink = 'https://backend-04sy.onrender.com'

    const formik = useFormik({
        initialValues: {
            headLine: '',
            newsBody: '',
            paragraphTwo: '',
            paragraphThree: '',
            paragraphFour: '',
            newsImage: null,
            newsDate: '',
            newsAuthor: '',
        },

        validationSchema: yup.object({
            headLine: yup.string().required('Headline is required'),
            newsBody: yup.string().required('News body is required'),
            paragraphTwo: yup.string(), paragraphThree: yup.string(), paragraphFour: yup.string(),
            newsImage: yup.mixed().required('News image is required'),
            newsDate: yup.date().required('Date is required'),
            newsAuthor: yup.string().required('Author is required'),
        }),

        onSubmit: async (values, { resetForm }) => {
            // console.log(values)
            setLoading(true)
            try {
                const formData = new FormData();

                Object.keys(values).forEach(key => {
                    if (key === 'newsImage') {
                        formData.append('newsImage', values.newsImage)
                    } else {
                        formData.append(key, values[key])
                    }
                })

                await axios.post(
                    `${apiLink}/api/admin/post/news`,
                    formData,
                    {
                        responseType: "blob",
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )

                toast.success('News Published Successfully')

                resetForm()

            } catch (err) {
                toast.error(err.response?.data?.message || err.message)
            } finally{
                setLoading(false)
            }
        }
    })

    const handleImage = e => {
        const file = e.target.files[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setPreview(url)
        formik.setFieldValue('newsImage', file)
    }

    return (

        <div className="upload-page-container">
            <Toaster position='top-center' toastOptions={{ duration: 4000 }} />
            <form className="upload-form" onSubmit={formik.handleSubmit}>

                <h2>Create New News</h2>

                <div className="image-upload-section">
                    <label className="file-input-label">
                        <div className='image-preview-wrapper'>
                            <img
                                src={preview || '/placeholder.png'}
                                alt='Program Preview'
                                className='upload-avatar'
                            />
                        </div>
                        <span className="file-input-text">Click to upload cover image</span>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImage}
                            className="hidden-input"
                        />
                        <small className='err'>
                            {formik.touched.programImage && formik.errors.programImage ? formik.errors.programImage : ''}
                        </small>
                    </label>
                </div>

                <div className="form-grid">
                    <div className="input-group full-width">
                        <span>News Head Line</span>
                        <input
                            type="text"
                            name="headLine"
                            placeholder="e.g. Annual Youth Convention"
                            value={formik.values.headLine}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.headLine && formik.errors.headLine ? formik.errors.headLine : ''}
                        </small>
                    </div>

                    <div className="input-group full-width">
                        <span>News Body - paragraph 1</span>
                        <textarea
                            name="newsBody"
                            rows="6"
                            placeholder="Write the details about the program here..."
                            value={formik.values.newsBody}
                            onChange={formik.handleChange}
                        ></textarea>
                        <small className='err'>
                            {formik.touched.newsBody && formik.errors.newsBody ? formik.errors.newsBody : ''}
                        </small>
                    </div>

                    <div className="input-group full-width">
                        <span>News Body - paragraph 2</span>
                        <textarea
                            name="paragraphTwo"
                            rows="6"
                            placeholder="Write more information here... (Optional)"
                            value={formik.values.paragraphTwo}
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>

                    <div className="input-group full-width">
                        <span>News Body - paragraph 3</span>
                        <textarea
                            name="paragraphThree"
                            rows="6"
                            placeholder="Write more information here... (Optional)"
                            value={formik.values.paragraphThree}
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>

                    <div className="input-group full-width">
                        <span>News Body - paragraph 4</span>
                        <textarea
                            name="paragraphFour"
                            rows="6"
                            placeholder="Write more information here... (Optional)"
                            value={formik.values.paragraphFour}
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>

                    <div className="input-group">
                        <span>Date</span>
                        <input
                            type="date"
                            name="newsDate"
                            value={formik.values.newsDate}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.newsDate && formik.errors.newsDate ? formik.errors.newsDate : ''}
                        </small>
                    </div>

                    <div className="input-group full-width">
                        <span>Author</span>
                        <input
                            type="text"
                            name="newsAuthor"
                            placeholder="e.g. Main Auditorium"
                            value={formik.values.newsAuthor}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.newsAuthor && formik.errors.newsAuthor ? formik.errors.newsAuthor : ''}
                        </small>
                    </div>

                </div>

                <Button type="submit" text={loading ? (<span className="btnSpinner"><FaSpinner className="spin" /></span>) : 'Publish Program'} />

            </form>
        </div>
    )
}
