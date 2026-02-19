import React from 'react'
import '../../../styles/pages/admin/pages/Post.css'

import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import Button from '../../../components/common/Button'

export default function PostProgram() {
    const [preview, setPreview] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const formik = useFormik({
        initialValues: {
            title: '',
            theme: '',
            programBody: '',
            paragraphTwo: '',
            paragraphThree: '',
            paragraphFour: '',
            programImage: null,
            programDate: '',
            programDateTo: '',
            programTime: '',
            programLocation: '',
        },

        validationSchema: yup.object({
            title: yup.string().required('Title is required'),
            theme: yup.string().required('Theme is required'),
            programBody: yup.string().required('Program body is required'),
            paragraphTwo: yup.string(), paragraphThree: yup.string(), paragraphFour: yup.string(),
            programImage: yup.mixed().required('Program image is required'),
            programDate: yup.date().required('Program date is required'),
            programDateTo: yup.date(),
            programTime: yup.string().required('Program time is required'),
            programLocation: yup.string().required('Program location is required'),
        }),

        onSubmit: async (values) => {
            // console.log(values)
            setLoading(true)
            try {
                const formData = new FormData();

                Object.keys(values).forEach(key => {
                    if (key === 'programImage') {
                        formData.append('programImage', values.programImage)
                    } else {
                        formData.append(key, values[key])
                    }
                })

                await axios.post(
                    'https://backend-04sy.onrender.com/api/admin/post/program',
                    formData,
                    {
                        responseType: "blob",
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )

                toast.success('Program Published Successfully')

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (err) {
                toast.error(err.response?.data?.message || err.message)
            }
        }
    })


    const handleImage = e => {
        const file = e.target.files[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setPreview(url)
        formik.setFieldValue('programImage', file)
    }

    return (
        <div className="upload-page-container">
            <Toaster position='top-center' toastOptions={{ duration: 4000 }} />
            <form className="upload-form" onSubmit={formik.handleSubmit}>

                <h2>Create New Program</h2>

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
                        <span>Program Title</span>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Annual Youth Convention"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.title && formik.errors.title ? formik.errors.title : ''}
                        </small>
                    </div>
                    
                    <div className="input-group full-width">
                        <span>Program Theme</span>
                        <input
                            type="text"
                            name="theme"
                            placeholder="e.g. The Lord Of Host"
                            value={formik.values.theme}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.theme && formik.errors.theme ? formik.errors.theme : ''}
                        </small>
                    </div>

                    <div className="input-group full-width">
                        <span>Description / Body - paragraph 1</span>
                        <textarea
                            name="programBody"
                            rows="6"
                            placeholder="Write the details about the program here..."
                            value={formik.values.programBody}
                            onChange={formik.handleChange}
                        ></textarea>
                        <small className='err'>
                            {formik.touched.programBody && formik.errors.programBody ? formik.errors.programBody : ''}
                        </small>
                    </div>

                    <div className="input-group full-width">
                        <span>Description / Body - paragraph 2</span>
                        <textarea
                            name="paragraphTwo"
                            rows="6"
                            placeholder="Write more information about the program here... (Optional)"
                            value={formik.values.paragraphTwo}
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>
                    
                    <div className="input-group full-width">
                        <span>Description / Body - paragraph 3</span>
                        <textarea
                            name="paragraphThree"
                            rows="6"
                            placeholder="Write more information about the program here... (Optional)"
                            value={formik.values.paragraphThree}
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>
                    
                    <div className="input-group full-width">
                        <span>Description / Body - paragraph 4</span>
                        <textarea
                            name="paragraphFour"
                            rows="6"
                            placeholder="Write more information about the program here... (Optional)"
                            value={formik.values.paragraphFour}
                            onChange={formik.handleChange}
                        ></textarea>
                    </div>

                    <div className="input-group">
                        <span>Date (Starting from)</span>
                        <input
                            type="date"
                            name="programDate"
                            value={formik.values.programDate}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.programDate && formik.errors.programDate ? formik.errors.programDate : ''}
                        </small>
                    </div>
                    
                    <div className="input-group">
                        <span>Date (Ending On)</span>
                        <input
                            type="date"
                            name="programDateTo"
                            value={formik.values.programDateTo}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <span>Time</span>
                        <input
                            type="text"
                            name="programTime"
                            placeholder="e.g. 10:00 AM"
                            value={formik.values.programTime}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.programTime && formik.errors.programTime ? formik.errors.programTime : ''}
                        </small>
                    </div>

                    <div className="input-group full-width">
                        <span>Location</span>
                        <input
                            type="text"
                            name="programLocation"
                            placeholder="e.g. Main Auditorium"
                            value={formik.values.programLocation}
                            onChange={formik.handleChange}
                        />
                        <small className='err'>
                            {formik.touched.programLocation && formik.errors.programLocation ? formik.errors.programLocation : ''}
                        </small>
                    </div>

                </div>

                <Button type="submit" text={loading ? 'Publishing...' : 'Publish Program'} />

            </form>
        </div>
    )
}
