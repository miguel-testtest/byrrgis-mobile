export default function AllocationSection({ holdings }) {
  return (
    <div className="alloc-section">
      <div className="alloc-bar">
        {holdings.map(h => (
          <div
            key={h.id}
            className="alloc-bar__seg"
            style={{ width: `${h.alloc}%`, background: h.allocColor }}
          />
        ))}
      </div>
      <div className="alloc-legend">
        {holdings.map(h => (
          <div key={h.id} className="alloc-legend__item">
            <div className="alloc-legend__dot" style={{ background: h.allocColor }} />
            {h.symbol}
            <span className="alloc-legend__pct">{h.alloc}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
