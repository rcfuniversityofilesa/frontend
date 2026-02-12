import React from 'react'
import styles from '../../styles/pages/public/ContactUs.module.css'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FiUser, FiMail, FiSend, FiClock, FiPhone, FiCopy } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { Toaster, toast } from 'react-hot-toast'


import axios from 'axios'
import Button from '../../components/common/Button'
import ContactCard from '../../components/common/ContactCard'


export default function Contactus() {

  const initialValues = {
    fullname: '',
    email: '',
    message: '',
    submittedAt: ''
  }

  const validationSchema = Yup.object({
    fullname: Yup.string().min(2, 'Too short').max(70, 'Too long').required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().min(10, 'Write a little more').required('Message is required')
  })

  async function handleSubmit(values, { setSubmitting, resetForm },) {
    const payload = {
      ...values,
      submittedAt: new Date().toLocaleString()
    }

    const res = await axios.post('http://localhost:9000/api/user/message', payload)

    // console.log(res.data?.message)
    toast.success(res.data?.message)

    // toast.success('Message sent. We will respond shortly.')

    setSubmitting(false)
    resetForm()
  }

  function copyNumber(number) {
    navigator.clipboard.writeText(number)
    toast.success('Number copied')
  }



  return (
    <main className={styles.contactPage}>
      <div className={styles.container}>
        <div>
          <div className={styles.formWrap}>
            <Toaster position="top-center" />

            <h2 className={styles.title}>Get in touch</h2>
            <p className={styles.subtitle}>
              Have a question or want to get involved? Send us a message.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className={styles.form}>
                  <div className={styles.row}>
                    <label className={styles.inputGroup}>
                      <span className={styles.icon}><FiUser /></span>
                      <Field
                        name="fullname"
                        type="text"
                        placeholder="Full name"
                        className={styles.input}
                      />
                    </label>
                    <div className={styles.error}>
                      <ErrorMessage name="fullname" />
                    </div>

                    <label className={styles.inputGroup}>
                      <span className={styles.icon}><FiMail /></span>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                      />
                    </label>
                    <div className={styles.error}>
                      <ErrorMessage name="email" />
                    </div>
                  </div>

                  <label className={styles.textareaGroup}>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Write your message..."
                      className={styles.textarea}
                      rows={6}
                    />
                  </label>
                  <div className={styles.error}>
                    <ErrorMessage name="message" />
                  </div>

                  <div className={styles.rowBottom}>
                    <div className={styles.timeBox}>
                      <FiClock />
                      <span className={styles.timeText}>
                        Replies arrive within 24 hours by email.
                      </span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      text={
                        <span className={styles.btnContent}>
                          <FiSend />
                          <span> Send Message</span>
                        </span>
                      }
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <aside className={styles.contactMethods}>
            <div className={styles.methodsHeader}>
              <h4>Contact us — Call or WhatsApp</h4>
              <p className={styles.methodsSub}>Reach us directly on the numbers below</p>
            </div>

            <div className={styles.methodsBody}>
              <ul className={styles.methodsList}>
                <li className={styles.method}>
                  <a className={styles.methodLink} href="tel:+2347069017453">
                    <span className={styles.icon}><FiPhone /></span>
                    <div>
                      <span className={styles.methodLabel}>Call</span>
                      <span className={styles.number}>+234 706 901 7453</span>
                    </div>
                  </a>

                  <div className={styles.methodActions}>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      aria-label="Copy phone number"
                      onClick={() => copyNumber('+2347069017453')}
                    >
                      <FiCopy />
                    </button>

                    <a
                      className={styles.whatsapp}
                      href="https://wa.me/2347069017453"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </li>

                <li className={styles.method}>
                  <a className={styles.methodLink} href="tel:+2349013500641">
                    <span className={styles.icon}><FiPhone /></span>
                    <div>
                      <span className={styles.methodLabel}>Call</span>
                      <span className={styles.number}>+2349013500641</span>
                    </div>
                  </a>

                  <div className={styles.methodActions}>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      aria-label="Copy phone number"
                      onClick={() => copyNumber('+2349013500641')}
                    >
                      <FiCopy />
                    </button>
                  </div>
                </li>

                <li className={styles.method}>
                  <a className={styles.methodLink} href="tel:+2349017844632">
                    <span className={styles.icon}><FiPhone /></span>
                    <div>
                      <span className={styles.methodLabel}>Call</span>
                      <span className={styles.number}>+2349017844632</span>
                    </div>
                  </a>

                  <div className={styles.methodActions}>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      aria-label="Copy phone number"
                      onClick={() => copyNumber('+2349017844632')}
                    >
                      <FiCopy />
                    </button>

                    <a
                      className={styles.whatsapp}
                      href="https://wa.me/2349017844632"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </li>


                {/* <li className={styles.method}>
                  <a className={styles.methodLink} href="tel:+2349013500641">
                    <span className={styles.icon}><FiPhone /></span>
                    <div>
                      <span className={styles.methodLabel}>Call</span>
                      <span className={styles.number}>+234 901 350 0641</span>
                    </div>
                  </a>
                  <a className={styles.whatsapp} href="https://wa.me/2349013500641" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +2349013500641">
                    <FaWhatsapp />
                  </a>
                </li> */}

                {/* <li className={styles.method}>
                  <a className={styles.methodLink} href="tel:+2349017844632">
                    <span className={styles.icon}><FiPhone /></span>
                    <div>
                      <span className={styles.methodLabel}>Call</span>
                      <span className={styles.number}>+234 901 784 4632</span>
                    </div>
                  </a>
                  <a className={styles.whatsapp} href="https://wa.me/2349017844632" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +2349017844632">
                    <FaWhatsapp />
                  </a>
                </li> */}
              </ul>
            </div>
          </aside>

          <ContactCard />
        </div>
      </div>
    </main>
  )
}
