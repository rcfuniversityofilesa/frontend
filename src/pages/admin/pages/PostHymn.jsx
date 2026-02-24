import React, { useState } from 'react'
import '../../../styles/pages/admin/pages/Post.css'

import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import Button from '../../../components/common/Button'
import { FaSpinner } from 'react-icons/fa'

export default function PostHymn() {
  const [stanzaCount, setStanzaCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      hymnNumber: '',
      stanzas: [],
      chors: ''
    },

    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      hymnNumber: yup.string().required('Hymn number is required'),
      stanzas: yup.array().of(
        yup.string().required('Stanza is required')
      ).min(3, 'At least three stanzas are required'),
      chors: yup.string()
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      try {
        await axios.post(
          'https://backend-04sy.onrender.com/api/admin/post/hymn',
          values
        )

        toast.success('Hymn saved successfully')

        resetForm()

      } catch (err) {
        toast.error(err.response?.data?.message || err.message)
      } finally{
        setLoading(false)
      }
    }
  })

  const handleStanzaCount = (e) => {
    const count = Number(e.target.value)
    setStanzaCount(count)

    formik.setFieldValue(
      'stanzas',
      Array(count).fill('')
    )
  }

  const handleStanzaChange = (index, value) => {
    const updated = [...formik.values.stanzas]
    updated[index] = value
    formik.setFieldValue('stanzas', updated)
  }

  return (
    <div className="upload-page-container">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <form className="upload-form" onSubmit={formik.handleSubmit}>
        <h2>Create New Hymn</h2>

        <div className="input-group">
          <span>Hymn Title</span>
          <input
            type='text'
            name="title"
            placeholder='e.g Amazing Grace'
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <small className="err">
            {formik.touched.title && formik.errors.title}
          </small>
        </div>

        <div className="input-group">
          <span>Hymn Number</span>
          <input
            type='text'
            name="hymnNumber"
            placeholder='e.g Hymn 01'
            value={formik.values.hymnNumber}
            onChange={formik.handleChange}
          />
          <small className="err">
            {formik.touched.hymnNumber && formik.errors.hymnNumber}
          </small>
        </div>

        <div className="input-group">
          <span>Number of Stanzas</span>
          <input
            type="number"
            min="3"
            value={stanzaCount}
            onChange={handleStanzaCount}
          />
        </div>

        {formik.values.stanzas.map((stanza, index) => (
          <div className="input-group" key={index}>
            <span>Stanza {index + 1}</span>
            <textarea
              rows="6"
              value={stanza}
              onChange={(e) =>
                handleStanzaChange(index, e.target.value)
              }
            />
          </div>
        ))}

        <div className="input-group">
          <span>Hymn Chors</span>
          <textarea
            rows="6"
            name="chors"
            value={formik.values.chors}
            onChange={formik.handleChange}
          />
        </div>

        <Button type="submit" text={loading ? (<span className="btnSpinner"><FaSpinner className="spin" /></span>) : 'Publish Hymn'} />
      </form>
    </div>
  )
}
