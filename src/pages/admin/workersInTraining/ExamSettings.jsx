import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {
  getExamSettings,
  updateExamSettings,
  getExamQuestions,
  createExamQuestion,
  updateExamQuestion,
  deleteExamQuestion,
} from '../../../services/workersInTrainingService'
import {
  FaSpinner,
  FaPlus,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'
import '../../../styles/pages/admin/workersInTraining/ExamSettings.module.css'

/**
 * Exam Settings Page
 * Manage exam configuration, questions, duration, and timing
 */
export default function ExamSettings() {
  const [settings, setSettings] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showQuestionModal, setShowQuestionModal] =
    useState(false)
  const [editingQuestion, setEditingQuestion] =
    useState(null)
  const [submitting, setSubmitting] =
    useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const settingsRes =
        await getExamSettings()
      const questionsRes =
        await getExamQuestions()
      setSettings(settingsRes.data)
      setQuestions(questionsRes.data)
    } catch (err) {
      toast.error(
        'Failed to fetch exam data'
      )
    } finally {
      setLoading(false)
    }
  }

  // Settings Form
  const settingsFormik = useFormik({
    initialValues: settings || {
      enabled: false,
      duration: 60,
      passingScore: 50,
      startTime: '',
      endTime: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      duration: yup
        .number()
        .positive('Duration must be positive')
        .required('Duration is required'),
      passingScore: yup
        .number()
        .min(0, 'Score cannot be negative')
        .max(100, 'Score cannot exceed 100')
        .required('Passing score is required'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true)
      try {
        await updateExamSettings(values)
        setSettings(values)
        toast.success(
          'Settings updated successfully'
        )
      } catch (err) {
        toast.error('Failed to update settings')
      } finally {
        setSubmitting(false)
      }
    },
  })

  // Question Form
  const questionFormik = useFormik({
    initialValues: editingQuestion || {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      questionText: yup
        .string()
        .min(10, 'Question too short')
        .required('Question text is required'),
      options: yup
        .array()
        .of(
          yup
            .string()
            .min(2, 'Option too short')
            .required('Option is required')
        )
        .length(4, 'Must have 4 options'),
      correctAnswer: yup
        .number()
        .min(0)
        .max(3)
        .required('Select correct answer'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true)
      try {
        if (
          editingQuestion &&
          editingQuestion._id
        ) {
          await updateExamQuestion(
            editingQuestion._id,
            values
          )
          toast.success(
            'Question updated successfully'
          )
        } else {
          await createExamQuestion(values)
          toast.success(
            'Question created successfully'
          )
        }
        setShowQuestionModal(false)
        setEditingQuestion(null)
        await fetchData()
      } catch (err) {
        toast.error(
          'Failed to save question'
        )
      } finally {
        setSubmitting(false)
      }
    },
  })

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Delete this question?')) {
      try {
        await deleteExamQuestion(id)
        toast.success('Question deleted')
        await fetchData()
      } catch (err) {
        toast.error('Failed to delete question')
      }
    }
  }

  if (loading) {
    return (
      <div className="exam-settings-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading exam settings...</p>
      </div>
    )
  }

  return (
    <div className="exam-settings-container">
      <div className="exam-settings-header">
        <h1>Exam Settings</h1>
        <p>Configure exam parameters and questions</p>
      </div>

      {/* Settings Form */}
      <div className="settings-section">
        <h2>Exam Configuration</h2>
        <form onSubmit={settingsFormik.handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Enable Exam</label>
              <input
                type="checkbox"
                name="enabled"
                checked={
                  settingsFormik.values.enabled
                }
                onChange={settingsFormik.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                min="1"
                max="480"
                {...settingsFormik.getFieldProps(
                  'duration'
                )}
              />
              {settingsFormik.touched.duration &&
              settingsFormik.errors
                .duration ? (
                <small>{settingsFormik.errors.duration}</small>
              ) : null}
            </div>
            <div className="form-group">
              <label>Passing Score (%)</label>
              <input
                type="number"
                name="passingScore"
                min="0"
                max="100"
                {...settingsFormik.getFieldProps(
                  'passingScore'
                )}
              />
              {settingsFormik.touched
                .passingScore &&
              settingsFormik.errors
                .passingScore ? (
                <small>
                  {settingsFormik.errors.passingScore}
                </small>
              ) : null}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                {...settingsFormik.getFieldProps(
                  'startTime'
                )}
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="datetime-local"
                name="endTime"
                {...settingsFormik.getFieldProps(
                  'endTime'
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <FaSpinner className="btn-spinner" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </form>
      </div>

      {/* Questions Section */}
      <div className="questions-section">
        <div className="questions-header">
          <h2>Exam Questions</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingQuestion(null)
              setShowQuestionModal(true)
            }}
          >
            <FaPlus /> Add Question
          </button>
        </div>

        <div className="questions-list">
          {questions.length === 0 ? (
            <p className="no-data">
              No questions yet
            </p>
          ) : (
            questions.map(
              (question, index) => (
                <div
                  key={question._id}
                  className="question-card"
                >
                  <div className="question-number">
                    Q{index + 1}
                  </div>
                  <div className="question-content">
                    <p className="question-text">
                      {question.questionText}
                    </p>
                    <ul className="question-options">
                      {question.options.map(
                        (option, i) => (
                          <li key={i}>
                            {option}
                            {i ===
                              question.correctAnswer && (
                              <span className="correct-badge">
                                ✓ Correct
                              </span>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="question-actions">
                    <button
                      className="btn-icon edit"
                      onClick={() => {
                        setEditingQuestion(
                          question
                        )
                        setShowQuestionModal(
                          true
                        )
                      }}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() =>
                        handleDeleteQuestion(
                          question._id
                        )
                      }
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {editingQuestion
                  ? 'Edit Question'
                  : 'Add New Question'}
              </h2>
              <button
                className="modal-close"
                onClick={() => {
                  setShowQuestionModal(false)
                  setEditingQuestion(null)
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={questionFormik.handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Question Text</label>
                  <textarea
                    name="questionText"
                    rows="3"
                    {...questionFormik.getFieldProps(
                      'questionText'
                    )}
                  />
                  {questionFormik.touched
                    .questionText &&
                  questionFormik.errors
                    .questionText ? (
                    <small>
                      {
                        questionFormik.errors
                          .questionText
                      }
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>Options</label>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="option-input">
                      <input
                        type="text"
                        placeholder={`Option ${i + 1}`}
                        value={
                          questionFormik.values
                            .options[i]
                        }
                        onChange={(e) => {
                          const newOptions = [
                            ...questionFormik
                              .values
                              .options,
                          ]
                          newOptions[i] =
                            e.target.value
                          questionFormik.setFieldValue(
                            'options',
                            newOptions
                          )
                        }}
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        value={i}
                        checked={
                          questionFormik.values
                            .correctAnswer === i
                        }
                        onChange={(e) => {
                          questionFormik.setFieldValue(
                            'correctAnswer',
                            parseInt(e.target.value)
                          )
                        }}
                      />
                      <label className="radio-label">
                        Correct
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowQuestionModal(false)
                    setEditingQuestion(null)
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="btn-spinner" />
                      Saving...
                    </>
                  ) : (
                    'Save Question'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
