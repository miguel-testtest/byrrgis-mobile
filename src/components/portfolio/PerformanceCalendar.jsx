import { useState } from 'react'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function buildGrid(year, month, days) {
  const totalDays = new Date(year, month, 0).getDate()
  const rawFirst  = new Date(year, month - 1, 1).getDay()
  const offset    = (rawFirst + 6) % 7

  const byDay = {}
  days.forEach(d => { byDay[d.day] = d })

  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) {
    cells.push(byDay[d] ?? { day: d, pnl: null, trades: 0 })
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function getIntensity(pnl, maxAbs) {
  if (pnl === null || maxAbs === 0) return 0
  return Math.min(Math.abs(pnl) / maxAbs, 1)
}

function cellStyle(pnl, intensity) {
  if (pnl === null) return {}
  const alpha = 0.12 + intensity * 0.72
  if (pnl >= 0) {
    return { background: `rgba(26,188,163,${alpha.toFixed(2)})` }
  }
  return { background: `rgba(253,73,145,${alpha.toFixed(2)})` }
}

function fmtAmount(pnl) {
  const abs = Math.abs(pnl)
  const str = abs >= 1000 ? `$${(abs / 1000).toFixed(1)}k` : `$${abs.toFixed(2)}`
  return pnl >= 0 ? `+${str}` : `-${str}`
}

function fmtWeekday(year, month, day) {
  const d = new Date(year, month - 1, day)
  return WEEKDAYS[d.getDay()]
}

export default function PerformanceCalendar({ year, month, days, meta }) {
  const [pnlMode, setPnlMode]     = useState('realised')
  const [currentMonth, setMonth]  = useState(month)
  const [currentYear, setYear]    = useState(year)
  const [selected, setSelected]   = useState(null)

  function prevMonth() {
    if (currentMonth === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelected(null)
  }
  function nextMonth() {
    if (currentMonth === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelected(null)
  }

  const activeDays = currentMonth === month && currentYear === year ? days : []
  const cells      = buildGrid(currentYear, currentMonth, activeDays)

  const maxAbs = Math.max(0, ...activeDays.filter(d => d.pnl !== null).map(d => Math.abs(d.pnl)))

  function handleCellTap(entry) {
    if (!entry || entry.pnl === null) { setSelected(null); return }
    setSelected(prev => prev?.day === entry.day ? null : entry)
  }

  return (
    <div className="perf-cal">
      {/* Controls */}
      <div className="perf-cal-controls">
        <div className="perf-cal-nav">
          <button className="perf-cal-nav-btn" onClick={prevMonth} aria-label="Previous month">
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
              <path d="M5 1L1 6l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="perf-cal-month-label">{MONTHS[currentMonth - 1]} {currentYear}</span>
          <button className="perf-cal-nav-btn" onClick={nextMonth} aria-label="Next month">
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
              <path d="M1 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="perf-cal-toggle">
          <button
            className={`perf-cal-toggle-btn${pnlMode === 'realised' ? ' active' : ''}`}
            onClick={() => setPnlMode('realised')}
          >
            Realised
          </button>
          <button
            className={`perf-cal-toggle-btn${pnlMode === 'unrealised' ? ' active' : ''}`}
            onClick={() => setPnlMode('unrealised')}
          >
            Unrealised
          </button>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="perf-cal-grid">
        {DAYS.map(d => (
          <div key={d} className="perf-cal-header-cell">{d}</div>
        ))}
        {cells.map((entry, i) => {
          if (!entry) return <div key={i} className="perf-cal-cell perf-cal-cell--empty" />

          const intensity = getIntensity(entry.pnl, maxAbs)
          const style     = cellStyle(entry.pnl, intensity)
          const isSelected = selected?.day === entry.day
          const hasData   = entry.pnl !== null

          return (
            <button
              key={i}
              className={`perf-cal-cell${!hasData ? ' perf-cal-cell--none' : ''}${isSelected ? ' perf-cal-cell--selected' : ''}`}
              style={style}
              onClick={() => handleCellTap(entry)}
              aria-label={hasData ? `Day ${entry.day}: ${fmtAmount(entry.pnl)}` : `Day ${entry.day}: no trades`}
            >
              <span className="perf-cal-day">{String(entry.day).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>

      {/* Selected day detail */}
      {selected && (
        <div className="perf-cal-detail">
          <div className="perf-cal-detail-date">
            {fmtWeekday(currentYear, currentMonth, selected.day)},{' '}
            {MONTHS[currentMonth - 1].slice(0, 3)} {String(selected.day).padStart(2, '0')}
          </div>
          <div className={`perf-cal-detail-amount ${selected.pnl >= 0 ? 'gain' : 'loss'}`}>
            {fmtAmount(selected.pnl)}
            <span className="perf-cal-detail-ccy"> USD</span>
          </div>
          <div className="perf-cal-detail-trades">
            {selected.trades} trade{selected.trades !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="perf-cal-legend">
        <span className="perf-cal-legend-label">Less</span>
        <div className="perf-cal-legend-gain">
          {[0.15, 0.35, 0.55, 0.75, 0.95].map(a => (
            <div key={a} className="perf-cal-legend-swatch" style={{ background: `rgba(26,188,163,${a})` }} />
          ))}
        </div>
        <span className="perf-cal-legend-label">More</span>
        <span className="perf-cal-legend-sep" />
        <div className="perf-cal-legend-loss">
          {[0.15, 0.35, 0.55, 0.75, 0.95].map(a => (
            <div key={a} className="perf-cal-legend-swatch" style={{ background: `rgba(253,73,145,${a})` }} />
          ))}
        </div>
      </div>

      {/* Summary cards */}
      {meta && (
        <div className="perf-cal-summary">
          <div className="perf-cal-stat">
            <span className="perf-cal-stat-label">
              {pnlMode === 'realised' ? 'REALISED P&L' : 'UNREALISED P&L'}
            </span>
            <span className="perf-cal-stat-value">
              {pnlMode === 'realised' ? meta.realisedPnl : meta.unrealisedPnl}
              <span className="perf-cal-stat-ccy"> USD</span>
            </span>
            <span className={`perf-cal-stat-pct ${(pnlMode === 'realised' ? meta.realisedPnlPct : meta.unrealisedPnlPct).startsWith('+') ? 'gain' : 'loss'}`}>
              {pnlMode === 'realised' ? meta.realisedPnlPct : meta.unrealisedPnlPct} all time
            </span>
          </div>

          <div className="perf-cal-stat">
            <span className="perf-cal-stat-label">ACTIVE TRIGGERS</span>
            <span className="perf-cal-stat-value">{meta.activeTriggers}</span>
            <div className="perf-cal-trigger-tags">
              <span className="perf-cal-tag">{meta.tpActive} TP active</span>
              <span className="perf-cal-tag">{meta.slActive} SL active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
