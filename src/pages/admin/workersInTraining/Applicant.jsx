import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {  getApplicants,  hasApplicantTakenExam, moveToInterviewed, } from '../../../services/workersInTrainingService'
import { FaSpinner, FaCheck, FaTimes, } from 'react-icons/fa'

import '../../../styles/pages/admin/pages/Applicant.module.css'

import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import Button from '../../../components/common/Button'


export default function Applicant() {
  const [examStatusMap, setExamStatusMap] = useState({})
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState([])
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchApplicants()
  }, [])

  const fetchApplicants = async () => {
    try {
      setLoading(true)
      const response = await getApplicants()
      setFormData(response.data?.data || [])

      // Check exam status for each applicant
      const statusMap = {}
      for (const applicant of response.data) {
        try {
          const examCheck =
            await hasApplicantTakenExam(
              applicant.email
            )
          statusMap[applicant._id] =
            examCheck.data.hasTaken
        } catch (err) {
          statusMap[applicant._id] = false
        }
      }
      setExamStatusMap(statusMap)


    } catch (err) {
      toast.error(
        'Failed to fetch applicants',
        err.response?.data?.message || err.message
      )
    } finally {
      setLoading(false)
    }
  }

  const handleMoveToInterview = (
    applicant
  ) => {
    // Check if exam was taken
    if (!examStatusMap[applicant._id]) {
      toast.error(
        'Applicant must take exam first'
      )
      return
    }

    setSelectedApplicant(applicant)
    setShowModal(true)
  }

  const confirmInterview = async () => {
    setSubmitting(true)
    try {
      await moveToInterviewed(
        selectedApplicant._id,
        { interviewedDate: new Date() }
      )
      toast.success('Applicant moved to interviewed')
      setShowModal(false)
      setSelectedApplicant(null)
      await fetchApplicants()
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        'Failed to move applicant'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const openModal = item => {
    setSelected(item)
    setShowModal(true)
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
              const res = await axios.delete(`${apiLink}/api/admin/delete/appliedWorker/${id}`)
              toast.success(res.data?.message || res.message)
              fetchApplicant()
            } catch (err) {
              toast.error(err.response?.data?.message || err.message)
            } finally { setLoading(false) }
          }}>OK</button>
          <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </div>
    ), { duration: 4000 })
  }


  if (loading) {
    return (
      <div className="applicants-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading applicants...</p>
      </div>
    )
  }

  return (
    <div className='application-page'>
      <Toaster position='top-center' toastOptions={{ duration: 4000 }} />
      <div className='application-container'>

        <div className='application-header'>
          <h2>Workforce Applications</h2>
        </div>

        {!loading && formData.length === 0 && (
          <div className='empty'>No application made yet</div>
        )}

        <div className='application-content'>
          {formData.map((item, i) => (
            <div key={item._id || item.id || i} className='application-card'>
              <div className='application-avatar-cont'>
                <img src={item.passport} className='application-avatar' alt='' />
              </div>

              <div className='application-card-body'>
                <div className='application-body-group'>
                  <span>Full Name</span>
                  <h3>{item.fullName}</h3>
                </div>

                <div className='application-body-group'>
                  <span>Gender</span>
                  <h3>{item.gender}</h3>
                </div>

                <div className='application-body-group'>
                  <span>Programme</span>
                  <h3>{item.programme}</h3>
                </div>

                <div className="pub-modal-actions">
                  <Button text='View Full Profile' onClick={() => openModal(item)} />
                  <button className="delete" onClick={() => handleDelete(item._id || item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && selected && (
          <div className='application-modal' onClick={() => setShowModal(false)}>
            <div className='application-modal-inner' onClick={e => e.stopPropagation()}>

              <div className='modal-header'>
                <div className='modal-user-summary'>
                  <img src={selected.passport} className='modal-avatar' alt='' />
                  <div className='modal-title'>
                    <h3>{selected.fullName}</h3>
                    <p>{selected.programme}, {selected.level}</p>
                  </div>
                </div>
                <button className='close-modal' onClick={() => setShowModal(false)}>Close</button>
              </div>

              <div className='modal-grid'>
                <div className='detail-item'>
                  <strong>Gender</strong>
                  <span>{selected.gender}</span>
                </div>

                <div className='detail-item'>
                  <strong>Phone</strong>
                  <span>{selected.phoneNumber}</span>
                </div>

                <div className='detail-item'>
                  <strong>Date of Birth</strong>
                  <span>{selected.DOB ? selected.DOB.split("T")[0] : ""}</span>
                </div>

                <div className='detail-item full-width'>
                  <strong>Campus Address</strong>
                  <span>{selected.capAddress}</span>
                </div>

                <div className='detail-item full-width'>
                  <strong>Home Address</strong>
                  <span>{selected.homeAddress}</span>
                </div>

                <div className='detail-item'>
                  <strong>Saved</strong>
                  <span>{selected.saved}</span>
                </div>

                <div className='detail-item full-width'>
                  <strong>Salvation Story</strong>
                  <span>{selected.salvationStory}</span>
                </div>

                <div className='detail-item'>
                  <strong>Water Baptized</strong>
                  <span>{selected.baptized}</span>
                </div>

                <div className='detail-item'>
                  <strong>Spirit Baptized</strong>
                  <span>{selected.holySpiritbaptized}</span>
                </div>

                <div className='detail-item'>
                  <strong>Preferred Unit</strong>
                  <span>{selected.unit}</span>
                </div>

                <div className='detail-item full-width'>
                  <strong>Reason</strong>
                  <span>{selected.reason}</span>
                </div>

                <div className='detail-item'>
                  <strong>Relationship</strong>
                  <span>{selected.relationship}</span>
                </div>

                <div className='detail-item full-width'>
                  <strong>Other Details</strong>
                  <span>{selected.details}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}