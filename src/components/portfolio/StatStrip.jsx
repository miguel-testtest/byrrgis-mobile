import { useState, useEffect, useRef } from 'react'

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

const DIGITS = '0123456789'
const SCRAMBLE_DURATION = 520

export default function StatStrip({ stats }) {
  const [hidden, setHidden] = useState(false)
  const [displayValue, setDisplayValue] = useState(stats.totalValue)
  const rafRef = useRef(null)

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)

    if (hidden) {
      setDisplayValue(stats.totalValue)
      return
    }

    const target = stats.totalValue
    const chars = target.split('')
    const digitIdxs = chars.reduce((acc, c, i) => (/\d/.test(c) ? [...acc, i] : acc), [])
    const start = performance.now()

    function tick(now) {
      const t = Math.min((now - start) / SCRAMBLE_DURATION, 1)

      const result = chars.map((ch, i) => {
        if (!/\d/.test(ch)) return ch
        const pos = digitIdxs.length > 1
          ? digitIdxs.indexOf(i) / (digitIdxs.length - 1)
          : 1
        // digits lock left-to-right: first locks at t=0.25, last at t=1
        const threshold = 0.25 + pos * 0.75
        return t >= threshold ? ch : DIGITS[Math.floor(Math.random() * 10)]
      })

      setDisplayValue(result.join(''))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hidden, stats.totalValue])

  return (
    <div className="port-stat-strip">

        <div className="port-stat-hero">
          <div className="port-stat-hero__value-row">
            <div className={`port-stat-hero__value ${hidden ? 'port-stat-hero__value--hidden' : 'port-stat-hero__value--shimmer'}`}>
              {hidden ? '••••••••' : displayValue}
            </div>
            <button
              className="port-stat-hero__eye"
              onClick={() => setHidden(h => !h)}
              aria-label={hidden ? 'Show balance' : 'Hide balance'}
            >
              {hidden ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <div className={`port-stat-hero__sub ${stats.totalGainPos ? 'pos' : 'neg'}`}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              {stats.totalGainPos
                ? <path d="M4.5 1.5L8 7.5H1L4.5 1.5Z" fill="currentColor"/>
                : <path d="M4.5 7.5L1 1.5H8L4.5 7.5Z" fill="currentColor"/>}
            </svg>
            {stats.totalGain} {stats.totalGainPct}
            <span className="port-stat-cell__period">{stats.totalGainPeriod}</span>
          </div>
        </div>

        <div className="port-stat-row">
          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Invested</div>
            <div className="port-stat-cell__value">
              {stats.invested}
            </div>
          </div>

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Unreal. P&amp;L</div>
            <div className="port-stat-cell__value">
              {stats.unrealisedPnl}
            </div>
            <div className={`port-stat-cell__sub ${stats.unrealisedPos ? 'pos' : 'neg'}`}>
              {stats.unrealisedPnlPct}
              <span className="port-stat-cell__period">all time</span>
            </div>
          </div>

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Real. P&amp;L</div>
            <div className="port-stat-cell__value">
              {stats.realisedPnl}
            </div>
            <div className={`port-stat-cell__sub ${stats.realisedPos ? 'pos' : 'neg'}`}>
              {stats.realisedPnlPct}
              <span className="port-stat-cell__period">all time</span>
            </div>
          </div>
        </div>

        <div className="port-stat-triggers">
          <span className="port-stat-triggers__count">{stats.activeTriggers}</span>
          <span className="port-stat-triggers__label">on autosell</span>
          <span className="port-trigger-pill tp">{stats.tpCount} TP</span>
          <span className="port-trigger-pill sl">{stats.slCount} SL</span>
        </div>

    </div>
  )
}
