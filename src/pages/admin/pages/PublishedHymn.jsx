import React, { useEffect, useState } from 'react'
import '../../../styles/pages/admin/pages/Published.css'


import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'

import Button from '../../../components/common/Button'

export default function PublishedHymn() {
const [hymns, setHymns] = useState([])
  const [selected, setSelected] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const apiLink = 'https://backend-04sy.onrender.com'

  const fetchHymns = async () => {
    try {
      const res = await axios.get(`${apiLink}/api/admin/published/hymns`)
      setHymns(res.data?.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  useEffect(() => {
    fetchHymns()
  }, [])

  const openDetails = (item) => {
    setSelected(item)
    setEditMode(false)
  }

  const openEdit = (item) => {
    setSelected(item)
    setEditMode(true)
  }

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p>Delete this hymn? This action cannot be undone.</p>
        <div className="toast-actions">
          <button
            onClick={async () => {
              toast.dismiss(t.id)
              try {
                setLoading(true)
                const res = await axios.delete(
                  `${apiLink}/api/admin/delete/hymn/${id}`
                )
                toast.success(res.data?.message || 'Hymn deleted')
                fetchHymns()
              } catch (err) {
                toast.error(err.response?.data?.message || err.message)
              } finally {
                setLoading(false)
              }
            }}
          >
            OK
          </button>
          <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </div>
    ))
  }

  const handleUpdate = async (values, resetForm) => {
    try {
      setLoading(true)
      const id = selected._id

      const res = await axios.put(
        `${apiLink}/api/admin/update/hymn/${id}`,
        values
      )

      toast.success(res.data?.message || 'Hymn updated')
      setEditMode(false)
      setSelected(null)
      resetForm()
      fetchHymns()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="published-page">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="container">
        <h2 className="page-title">Published Hymns</h2>

        <div className="published-grid">
          {hymns.length === 0 && <p>No hymns published yet.</p>}

          {hymns.map((hymn) => (
            <article className="pub-card" key={hymn._id}>
              <div className="pub-footer">
                <div className="pub-title" onClick={() => openDetails(hymn)}>
                  {hymn.title}
                </div>
                <div className="pub-actions">
                  <button className="edit" onClick={() => openEdit(hymn)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(hymn._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="pub-modal-overlay"
          onClick={() => {
            if (!editMode) setSelected(null)
          }}
        >
          <div className="pub-modal" onClick={(e) => e.stopPropagation()}>
            {!editMode ? (
              <div className="pub-modal-view">
                <div className="pub-modal-meta">
                  <h2>{selected.title}</h2>
                  <h4>Hymn Number: {selected.hymnNumber}</h4>

                  {(selected.stanzas || []).map((stanza, index) => (
                    <p key={index}>
                      <strong>Stanza {index + 1}</strong>
                      <br />
                      {stanza}
                    </p>
                  ))}
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
                  hymnNumber: selected.hymnNumber || '',
                  stanzas: selected.stanzas || [''],
                }}
                validationSchema={yup.object({
                  title: yup.string().required('Title is required'),
                  hymnNumber: yup.string().required('Hymn number is required'),
                  stanzas: yup
                    .array()
                    .of(yup.string().required('Stanza cannot be empty')),
                })}
                onSubmit={(values, { resetForm }) =>
                  handleUpdate(values, resetForm)
                }
              >
                {({ values }) => (
                  <Form className="edit-form">
                    <h3>Edit Hymn</h3>

                    <label>Title</label>
                    <Field name="title" />
                    <ErrorMessage name="title" component="small" className="err" />

                    <label>Hymn Number</label>
                    <Field name="hymnNumber" />
                    <ErrorMessage
                      name="hymnNumber"
                      component="small"
                      className="err"
                    />

                    <FieldArray name="stanzas">
                      {({ push, remove }) => (
                        <>
                          {values.stanzas.map((_, index) => (
                            <div key={index}>
                              <label>Stanza {index + 1}</label>
                              <Field as="textarea" name={`stanzas.${index}`} />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}

                          <button type="button" onClick={() => push('')}>
                            Add Stanza
                          </button>
                        </>
                      )}
                    </FieldArray>

                    <div className="pub-modal-actions">
                      <Button
                        type="submit"
                        text={loading ? 'Updating...' : 'Save'}
                      />
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

