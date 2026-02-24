/**
 * Exam Utilities
 * Handles exam logic, scoring, validation, and submission
 */

/**
 * Calculate exam score
 * @param {array} userAnswers - User's answers array
 * @param {array} questions - Questions array with correct answers
 * @returns {object} - { score, percentage, passed }
 */
export const calculateScore = (
  userAnswers,
  questions,
  passingPercentage = 50
) => {
  const totalQuestions = questions.length
  let correctCount = 0

  userAnswers.forEach((answer, index) => {
    if (
      answer ===
      questions[index]?.correctAnswer
    ) {
      correctCount++
    }
  })

  const percentage = Math.round(
    (correctCount / totalQuestions) * 100
  )
  const passed = percentage >= passingPercentage

  return {
    score: correctCount,
    totalQuestions,
    percentage,
    passed,
  }
}

/**
 * Format time for display (mm:ss)
 * @param {number} seconds - Remaining seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  if (seconds < 0) return '00:00'

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Check if time is running out (less than 5 minutes)
 * @param {number} seconds - Remaining seconds
 * @returns {boolean} - true if less than 5 minutes
 */
export const isTimeRunningOut = (seconds) => {
  const fiveMinutes = 5 * 60
  return seconds < fiveMinutes && seconds > 0
}

/**
 * Check if time is critical (less than 1 minute)
 * @param {number} seconds - Remaining seconds
 * @returns {boolean} - true if less than 1 minute
 */
export const isTimeCritical = (seconds) => {
  const oneMinute = 60
  return seconds < oneMinute && seconds > 0
}

/**
 * Validate exam answers before submission
 * @param {array} answers - User answers
 * @param {array} questions - Questions
 * @returns {object} - { isValid, errors }
 */
export const validateExamAnswers = (
  answers,
  questions
) => {
  const errors = []

  if (!answers || answers.length === 0) {
    errors.push('No answers provided')
  }

  if (
    answers.length !==
    questions.length
  ) {
    errors.push(
      'Answer count does not match question count'
    )
  }

  answers.forEach((answer, index) => {
    if (answer === null || answer === undefined) {
      errors.push(
        `Question ${index + 1} has no answer`
      )
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Generate exam submission object
 * @param {object} examData - Exam data from session storage
 * @param {array} answers - User answers
 * @param {array} questions - Questions
 * @param {number} timeSpent - Time spent in seconds
 * @returns {object} - Submission object for API
 */
export const generateSubmission = (
  examData,
  answers,
  questions,
  timeSpent
) => {
  const scoreData = calculateScore(
    answers,
    questions,
    examData.passingScore || 50
  )

  return {
    fullName: examData.fullName,
    email: examData.email,
    answers: answers,
    answerDetails: answers.map(
      (answer, index) => ({
        questionId: questions[index]?._id,
        userAnswer: answer,
        correctAnswer:
          questions[index]?.correctAnswer,
        isCorrect:
          answer ===
          questions[index]?.correctAnswer,
      })
    ),
    score: scoreData.score,
    totalQuestions: scoreData.totalQuestions,
    percentage: scoreData.percentage,
    passed: scoreData.passed,
    timeSpentSeconds: timeSpent,
    submittedAt: new Date().toISOString(),
    status: scoreData.passed
      ? 'PASSED'
      : 'FAILED',
  }
}

/**
 * Check if exam window is valid
 * @param {object} examSettings - Exam settings from API
 * @returns {object} - { isValid, message }
 */
export const checkExamWindow = (
  examSettings
) => {
  if (!examSettings.enabled) {
    return {
      isValid: false,
      message:
        'Exam is currently closed. Please come back during exam hours.',
    }
  }

  const now = new Date()
  const startTime = new Date(
    examSettings.startTime
  )
  const endTime = new Date(
    examSettings.endTime
  )

  if (!examSettings.startTime ||
    !examSettings.endTime) {
    // If times not set, just check if enabled
    return { isValid: true }
  }

  if (now < startTime) {
    return {
      isValid: false,
      message: `Exam starts at ${startTime.toLocaleString()}`,
    }
  }

  if (now > endTime) {
    return {
      isValid: false,
      message:
        'Exam has ended. Please contact admin.',
    }
  }

  return { isValid: true }
}

/**
 * Protect exam page from refresh and back navigation
 * Called during exam
 */
export const setupExamProtection = () => {
  // Prevent back navigation
  window.history.pushState(
    null,
    null,
    window.location.href
  )
  window.addEventListener('popstate', () => {
    window.history.pushState(
      null,
      null,
      window.location.href
    )
  })

  // Warn before unload
  const handleBeforeUnload = (e) => {
    e.preventDefault()
    e.returnValue = ''
    return ''
  }

  window.addEventListener(
    'beforeunload',
    handleBeforeUnload
  )

  // Cleanup function
  return () => {
    window.removeEventListener(
      'beforeunload',
      handleBeforeUnload
    )
  }
}

/**
 * Get question status for progress indicator
 * @param {number} totalQuestions - Total questions
 * @param {array} answers - Answered questions
 * @returns {object} - { answered, unanswered, percentage }
 */
export const getQuestionStatus = (
  totalQuestions,
  answers
) => {
  const answered = answers.filter(
    (a) => a !== null && a !== undefined
  ).length
  const unanswered = totalQuestions - answered
  const percentage = Math.round(
    (answered / totalQuestions) * 100
  )

  return {
    answered,
    unanswered,
    percentage,
    total: totalQuestions,
  }
}
