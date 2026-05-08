import { useRef, useEffect } from 'react'

const TEAL = '#1ABCA3'
const RED  = '#fd4991'

export default function CandlestickChart({ candles, currentPrice = '169.42' }) {
  const gRef = useRef()
  const pillRef = useRef()
  const wrapRef = useRef()

  useEffect(() => {
    const g = gRef.current
    if (!g) return
    g.innerHTML = ''

    const W = 14
    candles.forEach(([cx, wt, bt, bb, wb, bull]) => {
      const color = bull ? TEAL : RED

      const wick = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      wick.setAttribute('x', cx - 1)
      wick.setAttribute('y', wt)
      wick.setAttribute('width', 2)
      wick.setAttribute('height', wb - wt)
      wick.setAttribute('fill', color)
      wick.setAttribute('rx', 1)
      g.appendChild(wick)

      const body = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      body.setAttribute('x', cx - W / 2)
      body.setAttribute('y', bt)
      body.setAttribute('width', W)
      body.setAttribute('height', Math.max(2, bb - bt))
      body.setAttribute('fill', color)
      body.setAttribute('rx', 2)
      g.appendChild(body)
    })

    requestAnimationFrame(() => {
      const svg = wrapRef.current?.querySelector('svg')
      if (!svg || !pillRef.current) return
      const svgH = svg.getBoundingClientRect().height
      const ratio = svgH / 200
      pillRef.current.style.top = (92 * ratio - 9) + 'px'
    })
  }, [candles])

  return (
    <div className="candle-chart-wrap" ref={wrapRef}>
      <svg id="candleChart" viewBox="0 0 390 200" preserveAspectRatio="none">
        <line x1="0" y1="40"  x2="340" y2="40"  stroke="#1C3432" strokeWidth="0.5"/>
        <line x1="0" y1="80"  x2="340" y2="80"  stroke="#1C3432" strokeWidth="0.5"/>
        <line x1="0" y1="120" x2="340" y2="120" stroke="#1C3432" strokeWidth="0.5"/>
        <line x1="0" y1="160" x2="340" y2="160" stroke="#1C3432" strokeWidth="0.5"/>
        <text x="346" y="44"  fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#7B8799">172</text>
        <text x="346" y="84"  fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#7B8799">168</text>
        <text x="346" y="124" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#7B8799">165</text>
        <text x="346" y="164" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#7B8799">161</text>
        <line x1="0" y1="92" x2="340" y2="92" stroke="#fd4991" strokeWidth="0.8" strokeDasharray="4 3"/>
        <g ref={gRef} />
        <text x="10"  y="195" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#7B8799">Jan 20</text>
        <text x="90"  y="195" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#7B8799">Jan 24</text>
        <text x="170" y="195" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#7B8799">Jan 28</text>
        <text x="245" y="195" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#7B8799">Feb 1</text>
        <text x="310" y="195" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#7B8799">Feb 5</text>
      </svg>
      <div className="candle-price-pill" ref={pillRef}>{currentPrice}</div>
    </div>
  )
}
