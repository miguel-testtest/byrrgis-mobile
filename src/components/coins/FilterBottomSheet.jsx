export default function FilterBottomSheet({ open, onClose, title, options, value, onChange }) {
  function select(opt) {
    onChange(opt)
    onClose()
  }

  return (
    <>
      <div className={`adv-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`adv-sheet filter-sheet${open ? ' open' : ''}`}>
        <div className="adv-sheet__handle" />
        <div className="filter-sheet__title">{title}</div>
        <ul className="filter-sheet__list">
          {options.map(opt => (
            <li key={opt}>
              <button
                className={`filter-sheet__option${opt === value ? ' selected' : ''}`}
                onClick={() => select(opt)}
              >
                <span>{opt}</span>
                {opt === value && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
