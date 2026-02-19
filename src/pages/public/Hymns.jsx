import React, { useEffect, useState } from 'react'
import styles from '../../styles/pages/public/Hymns.module.css'
import axios from 'axios'
import { FiSearch, FiX, FiMusic } from 'react-icons/fi'
import toast, { Toaster } from 'react-hot-toast'

export default function Hymns() {
    const [hymns, setHymns] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(null)

    const fetchHymns = async () => {
        setLoading(true)
        try {
            const res = await axios.get('https://backend-04sy.onrender.com/api/admin/published/hymns')
            const data = res.data?.data || res.data || []

            const normalized = (data || [])
                .map((item) => {
                    const raw = item.hymnNumber || item.number || ''
                    const match = raw.toString().match(/\d+/)
                    const parsedNumber = match ? Number(match[0]) : 0

                    return {
                        ...item,
                        hymnNumber: parsedNumber,
                        hymnNumberText: item.hymnNumber || item.number || ''
                    }
                })
                .sort((a, b) => a.hymnNumber - b.hymnNumber)

            setHymns(normalized)
            setFiltered(normalized)
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Failed to load hymns')
        } finally {
            setLoading(false)
        }


    }

    useEffect(() => {
        fetchHymns()
    }, [])

    useEffect(() => {
        const term = search.trim().toLowerCase()
        if (!term) {
            setFiltered(hymns)
            return
        }

        const results = hymns.filter((h) => {
            return (
                (h.title || '').toLowerCase().includes(term) ||
                h.hymnNumber.toString().includes(term) ||
                (h.hymnNumberText || '').toLowerCase().includes(term)
            )
        })

        setFiltered(results)


    }, [search, hymns])

    function openHymn(h) {
        setSelected(h)
    }

    function closeHymn() {
        setSelected(null)
    }

    return (
        <main className={styles.hymnsPage}>
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h2><FiMusic /> Hymns</h2>
                        <p className={styles.lead}>
                            Browse and search hymns. Tap a title to view full content.
                        </p>
                    </div>

                    <div className={styles.searchWrap}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            className={styles.searchInput}
                            placeholder="Search by title or hymn number"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <section className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Title</th>
                                <th>Hymn No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className={styles.loading}>Loading hymns...</td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className={styles.empty}>No hymns found</td>
                                </tr>
                            ) : (
                                filtered.map((h, idx) => (
                                    <tr key={h._id || idx} className={styles.row}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <button
                                                className={styles.titleBtn}
                                                onClick={() => openHymn(h)}
                                            >
                                                {h.title || 'Untitled'}
                                            </button>
                                        </td>
                                        <td>{h.hymnNumberText || h.hymnNumber}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>

                {selected && (
                    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
                        <div className={styles.modal}>
                            <button
                                className={styles.modalClose}
                                onClick={closeHymn}
                                aria-label="Close hymn"
                            >
                                <FiX />
                            </button>

                            <div className={styles.modalHeader}>
                                <h3>{selected.title || 'Hymn'}</h3>
                                <div className={styles.meta}>
                                    Hymn No. {selected.hymnNumberText || selected.hymnNumber}
                                </div>
                            </div>

                            <div className={styles.modalBody}>
                                {(() => {
                                    const stanzas =
                                        selected.stanzas ||
                                        selected.stanza ||
                                        (selected.body && selected.body.split('\n')) ||
                                        []

                                    const chorus =
                                        selected.chorus ||
                                        selected.chors ||
                                        selected.chor ||
                                        selected.ref ||
                                        null

                                    return (
                                        <div>
                                            {Array.isArray(stanzas) ? (
                                                stanzas.map((s, i) => (
                                                    <p key={i} className={styles.stanza}>
                                                        <strong>Verse {i + 1}.</strong> {s}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className={styles.stanza}>{stanzas}</p>
                                            )}

                                            {chorus && (
                                                <div className={styles.chorusWrap}>
                                                    <h4>Chorus</h4>
                                                    <p className={styles.chorus}>{chorus}</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>


    )
}