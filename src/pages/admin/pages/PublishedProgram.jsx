import React, { useEffect, useState } from 'react'
import '../../../styles/pages/admin/pages/Published.css'


import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

import Button from '../../../components/common/Button'

export default function PublishedProgram() {
  const [programs, setPrograms] = useState([])
  const [selected, setSelected] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)

  const fetchPrograms = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/admin/published/programmes')
      setPrograms(res.data?.data || [])
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
              const res = await axios.delete(`http://localhost:9000/api/admin/delete/program/${id}`)
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
    setFieldValue('programImage', f)
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
      const res = await axios.put(`http://localhost:9000/api/admin/update/program/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
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
        <h2 className="page-title">Published Programs</h2>

        <div className="published-grid">
          {programs.length === 0 && <p>No programs published yet.</p>}
          {programs.map((p, i) => (
            <article className="pub-card" key={p._id || p.id || i}>
              <div className="pub-img-wrap" onClick={() => openDetails(p)}>
                <img src={p.programImage} alt={p.title} />
              </div>
              <div className="pub-footer">
                <div className="pub-title" onClick={() => openDetails(p)}>{p.title}</div>
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
                  <img src={selected.programImage} alt={selected.title} />
                  <div className="pub-modal-meta">
                    <h2>{selected.title}</h2>
                    <h4>Theme: {selected.theme}</h4>
                  </div>
                </div>
                <div className="pub-modal-body">
                  <p>{selected.programBody}</p>
                  {selected.paragraphTwo && <p>{selected.paragraphTwo}</p>}
                  {selected.paragraphThree && <p>{selected.paragraphThree}</p>}
                  {selected.paragraphFour && <p>{selected.paragraphFour}</p>}

                  <div className="pub-meta-grid">
                    <div><strong>Date (From)</strong><p>{selected.programDate?.split('T')[0]}</p></div>
                    <div><strong>Date (To)</strong><p>{selected.programDateTo?.split('T')[0]}</p></div>
                    <div><strong>Time</strong><p>{selected.programTime}</p></div>
                    <div><strong>Location</strong><p>{selected.programLocation}</p></div>
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
                  title: selected.title || '',
                  theme: selected.theme || '',
                  programBody: selected.programBody || '',
                  paragraphTwo: selected.paragraphTwo || '',
                  paragraphThree: selected.paragraphThree || '',
                  paragraphFour: selected.paragraphFour || '',
                  programDate: selected.programDate?.split('T')[0] || '',
                  programDateTo: selected.programDateTo?.split('T')[0] || '',
                  programTime: selected.programTime || '',
                  programLocation: selected.programLocation || '',
                  programImage: null,
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
                    <h3>Edit Program</h3>
                    <label>Cover Image</label>
                    <div className="image-preview">
                      <img src={preview || selected.programImage || '/placeholder.png'} alt="preview" />
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleImage(e, setFieldValue)} />
                    <ErrorMessage name="programImage" component="small" className="err" />

                    <label>Title</label>
                    <Field name="title" />
                    <ErrorMessage name="title" component="small" className="err" />

                    <label>Theme</label>
                    <Field name="theme" />
                    <ErrorMessage name="theme" component="small" className="err" />

                    <label>Description</label>
                    <Field name="programBody" as="textarea" rows={6} />
                    <ErrorMessage name="programBody" component="small" className="err" />

                    <label>Paragraph Two</label>
                    <Field name="paragraphTwo" as="textarea" rows={4} />
                    <label>Paragraph Three</label>
                    <Field name="paragraphThree" as="textarea" rows={4} />
                    <label>Paragraph Four</label>
                    <Field name="paragraphFour" as="textarea" rows={4} />

                    <div className="form-row">
                      <div>
                        <label>Date (From)</label>
                        <Field type="date" name="programDate" />
                        <ErrorMessage name="programDate" component="small" className="err" />
                      </div>
                      <div>
                        <label>Date (To)</label>
                        <Field type="date" name="programDateTo" />
                      </div>
                    </div>

                    <div className="form-row">
                      <div>
                        <label>Time</label>
                        <Field name="programTime" />
                        <ErrorMessage name="programTime" component="small" className="err" />
                      </div>
                      <div>
                        <label>Location</label>
                        <Field name="programLocation" />
                        <ErrorMessage name="programLocation" component="small" className="err" />
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
