import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {
  getExamQuestions,
  getExamSettings,
  submitExam,
} from '../../services/workersInTrainingService'
import {
  formatTime,
  isTimeRunningOut,
  isTimeCritical,
  validateExamAnswers,
  generateSubmission,
  setupExamProtection,
} from '../../utils/examUtils'
import {
  FaSpinner,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import styles from '../../styles/pages/public/ExamPage.module.css'
import Button from '../../components/common/Button'

export default function ExamPage() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [examSettings, setExamSettings] =
    useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] =
    useState(false)
  const [examSession, setExamSession] =
    useState(null)

  useEffect(() => {
    initializeExam()
  }, [])

  useEffect(() => {
    if (timeLeft <= 0 || !examSettings) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    if (timeLeft === 1) {
      handleSubmitExam()
    }

    return () => clearTimeout(timer)
  }, [timeLeft])

  const initializeExam = async () => {
    try {
      const session = sessionStorage.getItem(
        'examSession'
      )
      if (!session) {
        toast.error('No exam session found')
        navigate('/exam/workers')
        return
      }

      const parsedSession = JSON.parse(session)
      setExamSession(parsedSession)

      const [questionsRes, settingsRes] =
        await Promise.all([
          getExamQuestions(),
          getExamSettings(),
        ])

      setQuestions(questionsRes.data)
      setExamSettings(settingsRes.data)

      setAnswers(
        new Array(
          questionsRes.data.length
        ).fill(null)
      )

      setTimeLeft(
        settingsRes.data.duration * 60
      )

      setupExamProtection()
    } catch (err) {
      toast.error('Failed to load exam')
      navigate('/exam/workers')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAnswer = (optionIndex) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] =
      optionIndex
    setAnswers(newAnswers)
  }

  const handleNavigate = (direction) => {
    if (direction === 'prev') {
      if (
        currentQuestionIndex > 0
      ) {
        setCurrentQuestionIndex(
          currentQuestionIndex - 1
        )
      }
    } else {
      if (
        currentQuestionIndex <
        questions.length - 1
      ) {
        setCurrentQuestionIndex(
          currentQuestionIndex + 1
        )
      }
    }
  }

  const handleSubmitExam = async () => {
    if (submitting) return

    // Validate answers
    const validation = validateExamAnswers(
      answers,
      questions
    )

    if (!validation.isValid) {
      toast.error(
        'Please answer all questions before submitting'
      )
      return
    }

    setSubmitting(true)

    try {
      const now = new Date()
      const startTime = new Date(
        examSession.startedAt
      )
      const timeSpent = Math.floor(
        (now - startTime) / 1000
      )

      const submission = generateSubmission(
        examSettings,
        answers,
        questions,
        timeSpent
      )

      const response = await submitExam(
        submission
      )

      sessionStorage.setItem(
        'examResults',
        JSON.stringify(response.data)
      )

      toast.success('Exam submitted successfully!')
      navigate('/exam/workers/results')
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Failed to submit exam'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="exam-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading exam questions...</p>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="exam-error">
        <p>No exam questions available</p>
      </div>
    )
  }

  const currentQuestion =
    questions[currentQuestionIndex]
  const isAnswered =
    answers[currentQuestionIndex] !== null
  const answered = answers.filter(
    (a) => a !== null
  ).length
  const timeRunningOut = isTimeRunningOut(
    timeLeft
  )
  const timeCritical = isTimeCritical(
    timeLeft
  )

  return (
        <div className={styles.exampagecontainer}>
      {/* Header */}
      <div className={`${styles['exam-header']} ${timeCritical ? styles.critical : timeRunningOut ? styles.warning : ''}`}>
        <div className={styles['header-left']}>
          <h1>Workers In Training Exam</h1>
        </div>
        <div className={styles['header-right']}>
          <div
            className={`${styles.timer} ${timeCritical ? styles.critical : timeRunningOut ? styles.warning : ''}`}
          >
            <FaClock />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className={styles['exam-wrapper']}>
        {/* Sidebar - Questions Navigation */}
        <div className={styles['questions-sidebar']}>
          <div className={styles['question-grid-header']}>
            <h3>Questions</h3>
            <span className={styles.progress}>
              {answered}/{questions.length}
            </span>
          </div>
          <div className={styles['question-grid']}>
            {questions.map((_, index) => (
              <button
                key={index}
                className={`${styles['question-btn']} ${index === currentQuestionIndex ? styles.active : ''} ${answers[index] !== null ? styles.answered : ''}`}
                onClick={() =>
                  setCurrentQuestionIndex(
                    index
                  )
                }
                title={`Question ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Question Display */}
        <div className={styles['exam-content']}>
          <div className={styles['question-display']}>
            <div className={styles['question-header']}>
              <h2>
                Question {
                  currentQuestionIndex + 1
                }{' '}
                of {questions.length}
              </h2>
              <div className={styles['progress-bar']}>
                <div
                  className={styles['progress-fill']}
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className={styles['question-text']}>
              <p>
                {currentQuestion?.questionText}
              </p>
            </div>

            <div className={styles['options-list']}>
              {currentQuestion?.options.map(
                (option, index) => (
                  <button
                    key={index}
                    className={`${styles['option-btn']} ${answers[currentQuestionIndex] === index ? styles.selected : ''}`}
                    onClick={() =>
                      handleSelectAnswer(
                        index
                      )
                    }
                  >
                    <span className={styles['option-label']}>
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>
                    <span className={styles['option-text']}>
                      {option}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className={styles['exam-navigation']}>
            <button
              className="nav-btn"
              onClick={() =>
                handleNavigate('prev')
              }
              disabled={
                currentQuestionIndex === 0
              }
            >
              <FaChevronLeft /> Previous
            </button>

            {currentQuestionIndex ===
            questions.length - 1 ? (
              <Button onClick={handleSubmitExam} disabled={submitting} text={submitting ? (
                  <>
                    <FaSpinner className="spinner" />
                    Submitting...
                  </>
                ) : (
                  'Submit Exam'
                )}  />
            ) : (
              <Button onClick={() => handleNavigate('next')} text="Next" />
            )}
          </div>
        </div>
      </div>

      {/* Warning Messages */}
      {timeCritical && (
        <div className={`${styles['exam-warning']} ${styles.critical}`}>
          ⚠️ Exam will auto-submit in{' '}
          {formatTime(timeLeft)}
        </div>
      )}
      {timeRunningOut && !timeCritical && (
        <div className={`${styles['exam-warning']} ${styles.warning}`}>
          ⏰ Time is running out! You have{' '}
          {formatTime(timeLeft)} left
        </div>
      )}
    </div>
  )
}

