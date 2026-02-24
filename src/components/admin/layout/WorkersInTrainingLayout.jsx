import WorkersInTrainingSideNav from './WorkersInTrainingSideNav'
import styles from '../../../styles/components/admin/layout/WorkersInTrainingLayout.module.css'

/**
 * Workers In Training Admin Layout
 * Wraps all Workers In Training pages with the sidebar
 */
export default function WorkersInTrainingLayout({
  children,
  isExpanded,
  setIsExpanded,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <div className={styles.witLayout}>
      <WorkersInTrainingSideNav
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div
        className={`${styles.witContent} ${
          isExpanded
            ? styles.witContentExpanded
            : styles.witContentCollapsed
        } ${mobileOpen ? styles.witContentMobile : ''}`}
      >
        {children}
      </div>
    </div>
  )
}
