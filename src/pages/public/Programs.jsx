import React, { useEffect, useState } from 'react'
import styles from '../../styles/pages/public/Programs.module.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProgrammes = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        'https://backend-04sy.onrender.com/api/admin/published/programmes'
      )
      setPrograms(res.data?.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProgrammes()
  }, [])

  return (
    <main className={styles.page}>
      <Toaster position="top-center" />

      <section className={styles.wrapper}>
        <header className={styles.pageHeader}>
          <h1>Church Programs</h1>
          <p>Upcoming gatherings and special events</p>
        </header>

        {loading && <div className={styles.empty}>Loading programs…</div>}

        {!loading &&
          programs.map(item => (
            <article key={item._id} className={styles.programCard}>
              <div className={styles.media}>
                <img src={item.programImage} alt={item.title} />
              </div>

              <div className={styles.body}>
                <div className={styles.titleBlock}>
                  <h3>{item.title}</h3>
                  <span className={styles.theme}>{item.theme}</span>
                </div>

                <div className={styles.text}>
                  <p>{item.programBody}</p>
                  {item.paragraphTwo && <p>{item.paragraphTwo}</p>}
                  {item.paragraphThree && <p>{item.paragraphThree}</p>}
                  {item.paragraphFour && <p>{item.paragraphFour}</p>}
                </div>

                <div className={styles.meta}>
                  <div>
                    <h6>Date</h6>
                    <p>
                      {item.programDate?.split('T')[0]} to{' '}
                      {item.programDateTo?.split('T')[0]}
                    </p>
                  </div>

                  <div>
                    <h6>Time</h6>
                    <p>{item.programTime}</p>
                  </div>

                  <div>
                    <h6>Location</h6>
                    <p>{item.programLocation}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}

        {!loading && programs.length === 0 && (
          <div className={styles.empty}>No programs available</div>
        )}
      </section>
    </main>
  )
}