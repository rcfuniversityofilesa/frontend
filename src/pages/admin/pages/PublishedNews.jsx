import React, { useEffect, useState } from 'react'
import '../../../styles/pages/admin/pages/Published.css'
import Button from '../../../components/common/Button'

import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

export default function PublishedNews() {
 const [programs, setNews] = useState([])
  const [selected, setSelected] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)

  const apiLink = 'https://backend-04sy.onrender.com'

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(`${apiLink}/api/admin/published/news`)
      setNews(res.data?.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  useEffect(() => { fetchPrograms() }, [])

  const openDetails = (item) => {
    setSelected(item)
    setEditMode(false)
    setPreview(null)
  }

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p>Delete this program? This action cannot be undone.</p>
        <div className="toast-actions">
          <button onClick={async () => {
            toast.dismiss(t.id)
            try {
              setLoading(true)
              const res = await axios.delete(`${apiLink}/api/admin/delete/news/${id}`)
              toast.success(res.data?.message || res.message)
              fetchPrograms()
            } catch (err) {
              toast.error(err.response?.data?.message || err.message)
            } finally { setLoading(false) }
          }}>OK</button>
          <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </div>
    ), { duration: 4000 })
  }

  const openEdit = (item) => {
    setSelected(item)
    setPreview(item.programImage || null)
    setEditMode(true)
  }

  const handleImage = (e, setFieldValue) => {
    const f = e.target.files[0]
    if (!f) return
    setFieldValue('newsImage', f)
    setPreview(URL.createObjectURL(f))
  }

  const handleUpdate = async (values, resetForm) => {
    try {
      setLoading(true)
      const id = selected._id || selected.id
      const fd = new FormData()
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) fd.append(key, values[key])
      })
      const res = await axios.put(`${apiLink}/api/admin/update/news/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success(res.data?.message || res.message)
      setEditMode(false)
      setSelected(null)
      resetForm()
      fetchPrograms()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally { setLoading(false) }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <main className="published-page">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="container">
        <h2 className="page-title">Published News</h2>

        <div className="published-grid">
          {programs.length === 0 && <p>No News published yet.</p>}
          {programs.map((p, i) => (
            <article className="pub-card" key={p._id || p.id || i}>
              <div className="pub-img-wrap" onClick={() => openDetails(p)}>
                <img src={p.newsImage} alt={p.headLine} />
              </div>
              <div className="pub-footer">
                <div className="pub-title" onClick={() => openDetails(p)}>{p.headLine}</div>
                <div className="pub-actions">
                  <button className="edit" onClick={() => openEdit(p)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(p._id || p.id)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="pub-modal-overlay" onClick={() => { if (!editMode) setSelected(null) }}>
          <div className="pub-modal" onClick={e => e.stopPropagation()}>
            {!editMode ? (
              <div className="pub-modal-view">
                <div className="pub-modal-top">
                  <img src={selected.newsImage} alt={selected.headLine} />
                  <div className="pub-modal-meta">
                    <h2>{selected.headLine}</h2>
                  </div>
                </div>
                <div className="pub-modal-body">
                  <p>{selected.newsBody}</p>
                  {selected.paragraphTwo && <p>{selected.paragraphTwo}</p>}
                  {selected.paragraphThree && <p>{selected.paragraphThree}</p>}
                  {selected.paragraphFour && <p>{selected.paragraphFour}</p>}

                  <div className="pub-meta-grid">
                    <div><strong>Date</strong><p>{selected.newsDate?.split('T')[0]}</p></div>
                    <div><strong>Location</strong><p>{selected.newsAuthor}</p></div>
                  </div>
                </div>
                <div className="pub-modal-actions">
                  <Button text="Edit" onClick={() => openEdit(selected)} />
                  <Button text="Close" onClick={() => setSelected(null)} />
                </div>
              </div>
            ) : (
              <Formik
                initialValues={{
                  headLine: selected.headLine || '',
                  newsBody: selected.newsBody || '',
                  paragraphTwo: selected.paragraphTwo || '',
                  paragraphThree: selected.paragraphThree || '',
                  paragraphFour: selected.paragraphFour || '',
                  newsDate: selected.newsDate?.split('T')[0] || '',
                  newsAuthor: selected.newsAuthor || '',
                  newsImage: null,
                }}
                validationSchema={yup.object({
                  title: yup.string().required('Title is required'),
                  theme: yup.string().required('Theme is required'),
                  programBody: yup.string().required('Description is required'),
                  programDate: yup.date().required('Start date is required'),
                  programTime: yup.string().required('Time is required'),
                  programLocation: yup.string().required('Location is required'),
                  programImage: yup.mixed().nullable(),
                })}
                onSubmit={(values, { resetForm }) => handleUpdate(values, resetForm)}
              >
                {({ setFieldValue, values, errors, touched }) => (
                  <Form className="edit-form">
                    <h3>Edit News</h3>
                    <label>Cover Image</label>
                    <div className="image-preview">
                      <img src={preview || selected.newsImage || '/placeholder.png'} alt="preview" />
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleImage(e, setFieldValue)} />
                    <ErrorMessage name="newsImage" component="small" className="err" />

                    <label>Title</label>
                    <Field name="headLine" />
                    <ErrorMessage name="headLine" component="small" className="err" />

                    <label>Description</label>
                    <Field name="newsBody" as="textarea" rows={6} />
                    <ErrorMessage name="newsBody" component="small" className="err" />
                    <label>Paragraph Two</label>
                    <Field name="paragraphTwo" as="textarea" rows={4} />
                    <label>Paragraph Three</label>
                    <Field name="paragraphThree" as="textarea" rows={4} />
                    <label>Paragraph Four</label>
                    <Field name="paragraphFour" as="textarea" rows={4} />

                    <div className="form-row">
                      <div>
                        <label>Date</label>
                        <Field type="date" name="newsDate" />
                        <ErrorMessage name="newsDate" component="small" className="err" />
                      </div>
                    </div>

                    <div className="form-row">
                      <div>
                        <label>Author</label>
                        <Field name="newsAuthor" />
                        <ErrorMessage name="newsAuthor" component="small" className="err" />
                      </div>
                    </div>

                    <div className="pub-modal-actions">
                      <Button type="submit" text={loading ? 'Updating...' : 'Save'} />
                      <Button text="Cancel" onClick={() => setEditMode(false)} />
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
