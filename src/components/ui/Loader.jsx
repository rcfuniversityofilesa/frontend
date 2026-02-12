import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaChurch } from 'react-icons/fa'
import styles from '../../styles/components/ui/Loader.module.css'

export default function Loader({
  size = 96,
  text = 'Loading…',
  fullscreen = false
}) {
  const cssVars = {
    '--loader-size': `${size}px`
  }

  useEffect(() => {
    if (!fullscreen) return
    document.body.classList.add('rcf-loader-open')
    return () => {
      document.body.classList.remove('rcf-loader-open')
    }
  }, [fullscreen])

  return (
    <div
      className={fullscreen ? styles.overlay : styles.wrapper}
      style={cssVars}
      role={fullscreen ? 'dialog' : 'status'}
      aria-modal={fullscreen ? 'true' : undefined}
      aria-live={fullscreen ? undefined : 'polite'}
      aria-label={text}
    >
      <motion.div
        className={styles.loader}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <div className={styles.ring} />
        <div className={styles.ring2} />

        <motion.div
          className={styles.icon}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          <FaChurch />
        </motion.div>
      </motion.div>

      {text && <div className={styles.text}>{text}</div>}

      {fullscreen && (
        <>
          <div className={styles.otherText}>
            “Let your light so shine before men”
            <span> Matthew 5:16</span>
          </div>

          <div className={styles.footer}>
            © {new Date().getFullYear()} Transformation Chapel.
          </div>
        </>
      )}
    </div>
  )
}