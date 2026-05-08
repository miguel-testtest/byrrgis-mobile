import { useState } from 'react'
import { IconChevronDown } from './Icons'

export default function InfoCard({ title, headerRight, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`info-card${open ? '' : ' collapsed'}`}>
      <div className="info-card__header" onClick={() => setOpen(o => !o)}>
        <span className="info-card__title">{title}</span>
        {headerRight ?? (
          <svg className="info-card__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        )}
      </div>
      <div className="info-card__body">
        {children}
      </div>
    </div>
  )
}
