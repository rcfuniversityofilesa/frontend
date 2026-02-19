import React, { useEffect, useState } from 'react'
import styles from '../../styles/pages/public/News.module.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        'https://backend-04sy.onrender.com/api/admin/published/news'
      )
      setNews(res.data?.data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <main className={styles.page}>
      <Toaster position="top-center" />

      <section className={styles.header}>
        <h1>Fellowship News</h1>
        <p>Updates and announcements of the Fellowship and the University of Ilesa</p>
      </section>

      <section className={styles.newsGrid}>
        {loading && <div className={styles.empty}>Loading news…</div>}

        {!loading && news.length === 0 && (
          <div className={styles.empty}>No news posts yet</div>
        )}

        {!loading &&
          news.map(item => (
            <article key={item._id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img src={item.newsImage} alt={item.headLine} />
              </div>

              <div className={styles.content}>
                <h3>{item.headLine}</h3>

                <p>{item.newsBody}</p>
                {item.paragraphTwo && <p>{item.paragraphTwo}</p>}
                {item.paragraphThree && <p>{item.paragraphThree}</p>}
                {item.paragraphFour && <p>{item.paragraphFour}</p>}

                <div className={styles.meta}>
                  <span>
                    {item.newsDate ? item.newsDate.split('T')[0] : ''}
                  </span>
                  <span>{item.newsAuthor}</span>
                </div>
              </div>
            </article>
          ))}
      </section>
    </main>
  )
}