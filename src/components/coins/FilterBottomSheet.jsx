import { useEffect } from 'react'

export default function FilterBottomSheet({ open, onClose, title, options, value, onChange }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  function select(opt) {
    onChange(opt)
    onClose()
  }

  return (
    <>
      <div className={`adv-overlay${open ? ' open' : ''}`} onClick={onClose} aria-hidden="true" />
      <div
        className={`adv-sheet filter-sheet${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="adv-sheet__handle" />
        <div className="filter-sheet__header">
          <span className="filter-sheet__title">{title}</span>
          <button className="filter-sheet__close" onClick={onClose} aria-label="Cerrar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="filter-sheet__list" role="listbox" aria-label={title}>
          {options.map(opt => (
            <li key={opt} role="option" aria-selected={opt === value}>
              <button
                className={`filter-sheet__option${opt === value ? ' selected' : ''}`}
                onClick={() => select(opt)}
              >
                <span>{opt}</span>
                <span className="filter-sheet__option__check" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
