import axiosInstance from './axiosConfig'

/**
 * Workers In Training API Service
 * Handles all API calls for the Workers In Training system
 */

// ========== APPLICANTS ==========

/**
 * Get all applicants
 * @returns {Promise} - Array of applicants
 */
export const getApplicants = () => {
  return axiosInstance.get(
    '/workersInTraining/applicants'
  )
}

/**
 * Get applicant by ID
 * @param {string} id - Applicant ID
 * @returns {Promise} - Applicant object
 */
export const getApplicantById = (id) => {
  return axiosInstance.get(
    `/workersInTraining/applicants/${id}`
  )
}

/**
 * Update applicant status
 * @param {string} id - Applicant ID
 * @param {string} status - New status
 * @returns {Promise} - Updated applicant
 */
export const updateApplicantStatus = (id, status) => {
  return axiosInstance.patch(
    `/workersInTraining/applicants/${id}`,
    { status }
  )
}

/**
 * Move applicant to interviewed list
 * @param {string} applicantId - Applicant ID
 * @param {object} interviewData - Interview details
 * @returns {Promise} - Updated applicant
 */
export const moveToInterviewed = (
  applicantId,
  interviewData = {}
) => {
  return axiosInstance.patch(
    `/workersInTraining/applicants/${applicantId}/interview`,
    interviewData
  )
}

/**
 * Check if applicant has taken exam
 * @param {string} email - Applicant email
 * @returns {Promise} - Boolean result
 */
export const hasApplicantTakenExam = (email) => {
  return axiosInstance.get(
    `/workersInTraining/exam/check/${email}`
  )
}

// ========== EXAM SETTINGS ==========

/**
 * Get exam settings
 * @returns {Promise} - Exam settings object
 */
export const getExamSettings = () => {
  return axiosInstance.get(
    '/workersInTraining/exam/settings'
  )
}

/**
 * Update exam settings
 * @param {object} settings - Settings object
 * @returns {Promise} - Updated settings
 */
export const updateExamSettings = (settings) => {
  return axiosInstance.patch(
    '/workersInTraining/exam/settings',
    settings
  )
}

/**
 * Enable/disable exam
 * @param {boolean} enabled - Enable/disable flag
 * @returns {Promise} - Updated settings
 */
export const setExamEnabled = (enabled) => {
  return axiosInstance.patch(
    '/workersInTraining/exam/settings',
    { enabled }
  )
}

// ========== EXAM QUESTIONS ==========

/**
 * Get all exam questions
 * @returns {Promise} - Array of questions
 */
export const getExamQuestions = () => {
  return axiosInstance.get(
    '/workersInTraining/exam/questions'
  )
}

/**
 * Create exam question
 * @param {object} question - Question object
 * @returns {Promise} - Created question
 */
export const createExamQuestion = (question) => {
  return axiosInstance.post(
    '/workersInTraining/exam/questions',
    question
  )
}

/**
 * Update exam question
 * @param {string} questionId - Question ID
 * @param {object} question - Updated question object
 * @returns {Promise} - Updated question
 */
export const updateExamQuestion = (
  questionId,
  question
) => {
  return axiosInstance.patch(
    `/workersInTraining/exam/questions/${questionId}`,
    question
  )
}

/**
 * Delete exam question
 * @param {string} questionId - Question ID
 * @returns {Promise} - Deletion confirmation
 */
export const deleteExamQuestion = (questionId) => {
  return axiosInstance.delete(
    `/workersInTraining/exam/questions/${questionId}`
  )
}

// ========== EXAM RESULTS ==========

/**
 * Get all exam results
 * @returns {Promise} - Array of exam results
 */
export const getExamResults = () => {
  return axiosInstance.get(
    '/workersInTraining/exam/results'
  )
}

/**
 * Get exam result by email
 * @param {string} email - Email address
 * @returns {Promise} - Exam result object
 */
export const getExamResultByEmail = (email) => {
  return axiosInstance.get(
    `/workersInTraining/exam/results/${email}`
  )
}

/**
 * Submit exam
 * @param {object} submission - Submission object containing answers, score, etc.
 * @returns {Promise} - Submission confirmation
 */
export const submitExam = (submission) => {
  return axiosInstance.post(
    '/workersInTraining/exam/submit',
    submission
  )
}

// ========== ANALYTICS ==========

/**
 * Get overview statistics
 * @returns {Promise} - Analytics object with totals
 */
export const getOverviewStats = () => {
  return axiosInstance.get(
    '/workersInTraining/analytics/overview'
  )
}

/**
 * Get interviewed applicants
 * @returns {Promise} - Array of interviewed applicants
 */
export const getInterviewedApplicants = () => {
  return axiosInstance.get(
    '/workersInTraining/applicants/interviewed'
  )
}

// ========== PROFILE ==========

/**
 * Get current admin profile
 * @returns {Promise} - Admin profile object
 */
export const getAdminProfile = () => {
  return axiosInstance.get(
    '/workersInTraining/profile'
  )
}

/**
 * Update admin profile
 * @param {object} profileData - Profile data to update
 * @returns {Promise} - Updated profile
 */
export const updateAdminProfile = (
  profileData
) => {
  return axiosInstance.patch(
    '/workersInTraining/profile',
    profileData
  )
}

/**
 * Change admin password
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} - Success confirmation
 */
export const changePassword = (
  oldPassword,
  newPassword
) => {
  return axiosInstance.patch(
    '/workersInTraining/profile/password',
    { oldPassword, newPassword }
  )
}
