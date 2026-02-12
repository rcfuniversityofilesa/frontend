import styles from '../../../styles/pages/admin/pages/inbox.module.css'
import Button from '../../../components/common/Button'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import toast, { Toaster } from 'react-hot-toast'

const API_BASE = 'http://localhost:9000/api'

export default function Inbox() {
  const [messages, setMessages] = useState([])
  const [repliedMessages, setRepliedMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingReplied, setLoadingReplied] = useState(true)

  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [sending, setSending] = useState(false)

  const [admin, setAdmin] = useState(null)

  const token = localStorage.getItem('token')

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  }

  async function fetchAdmin() {
    try {
      const res = await axios.get(`${API_BASE}/admin/profile/me`, authHeader)
      setAdmin(res.data?.data)
    } catch {
      toast.error('Failed to load admin profile')
    }
  }

  async function fetchMessages() {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE}/user/get/message`, authHeader)
      setMessages(res.data?.data || [])
    } catch {
      toast.error('Failed to load inbox')
    } finally {
      setLoading(false)
    }
  }

  async function fetchRepliedMessages() {
    try {
      setLoadingReplied(true)
      const res = await axios.get(
        `${API_BASE}/user/get/message/replied`,
        authHeader
      )
      setRepliedMessages(res.data?.data || [])
    } catch {
      toast.error('Failed to load replied messages')
    } finally {
      setLoadingReplied(false)
    }
  }

  function openReply(message) {
    axios.put(
      `${API_BASE}/user/message/seen/${message._id}`,
      {},
      authHeader
    )

    setSelected(message)
    setModalOpen(true)
  }

  function closeModal() {
    if (sending) return
    setModalOpen(false)
    setSelected(null)
  }

  async function submitReply(values, helpers) {
    if (!selected || !admin) return

    try {
      setSending(true)

      const payload = {
        messageId: selected._id,
        adminId: admin._id,
        replyText: values.replyText
      }

      const res = await axios.post(
        `${API_BASE}/user/admin/reply`,
        payload,
        authHeader
      )

      toast.success(res.data?.message || 'Reply sent')

      setMessages(prev =>
        prev.filter(m => m._id !== selected._id)
      )

      fetchRepliedMessages()

      helpers.resetForm()
      closeModal()
    } catch {
      toast.error('Failed to send reply')
    } finally {
      setSending(false)
    }
  }

  function handleDelete(id) {
    toast(t => (
      <div>
        <p>Delete this message?</p>
        <div className="toast-actions">
          <button
            onClick={async () => {
              toast.dismiss(t.id)
              try {
                setLoadingReplied(true)
                const res = await axios.delete(
                  `${API_BASE}/user/get/message/replied/delete/${id}`,
                  authHeader
                )
                toast.success(res.data?.message || 'Message deleted')
                fetchRepliedMessages()
              } catch (err) {
                toast.error(err.response?.data?.message || err.message)
              } finally {
                setLoadingReplied(false)
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

  useEffect(() => {
    fetchAdmin()
    fetchMessages()
    fetchRepliedMessages()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Inbox</h2>
        <p className={styles.sub}>New messages</p>
      </div>

      <div className={styles.listWrap}>
        {loading && <div className={styles.empty}>Loading…</div>}

        {!loading && messages.length === 0 && (
          <div className={styles.empty}>No messages</div>
        )}

        <div className={styles.grid}>
          {messages.map(msg => (
            <div key={msg._id} className={styles.card}>
              <div className={styles.meta}>
                <div className={styles.avatar}>
                  {(msg.fullname || 'U')
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>

                <div>
                  <div className={styles.name}>{msg.fullname}</div>
                  <div className={styles.email}>{msg.email}</div>
                </div>
              </div>

              <div className={styles.preview}>{msg.message}</div>

              <div className={styles.footer}>
                <div className={styles.time}>
                  {new Date(msg.submittedAt).toLocaleString()}
                </div>
                <Button text="Reply" onClick={() => openReply(msg)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.header}>
        <h2>Replied Messages</h2>
      </div>

      <div className={styles.listWrap}>
        {loadingReplied && <div className={styles.empty}>Loading…</div>}

        {!loadingReplied && repliedMessages.length === 0 && (
          <div className={styles.empty}>No replied messages</div>
        )}

        <div className={styles.grid}>
          {repliedMessages.map(msg => (
            <div key={msg._id} className={styles.card}>
              <div className={styles.meta}>
                <div className={styles.avatar}>
                  {(msg.fullname || 'U')
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>

                <div>
                  <div className={styles.name}>{msg.fullname}</div>
                  <div className={styles.email}>{msg.email}</div>
                </div>
              </div>

              <div className={styles.preview}>{msg.message}</div>

              <div className={styles.footer}>
                <span className={styles.replied}>Replied</span>
                <Button text="Delete" onClick={() => handleDelete(msg._id)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Reply</h3>
              <button className={styles.closeBtn} onClick={closeModal} disabled={sending}>✕</button>
            </div>

            <Formik
              enableReinitialize
              initialValues={{
                replyText: `Hello ${selected.fullname?.split(' ')[0] || ''},\n\n`
              }}
              onSubmit={submitReply}
            >
              <Form className={styles.modalBody}>
                <Field
                  as="textarea"
                  name="replyText"
                  rows={6}
                  disabled={sending}
                  className={styles.messageBox}
                />
                <Button
                  text={sending ? 'Sending…' : 'Send Reply'}
                  type="submit"
                  disabled={sending}
                />
              </Form>
            </Formik>
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  )
}
