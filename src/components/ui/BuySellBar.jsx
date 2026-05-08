export default function BuySellBar({ buyPct, buys, sells, showLabels = true }) {
  const sellPct = 100 - buyPct
  return (
    <div className="bs-bar">
      <div className="bs-bar__track">
        <div className="bs-bar__buy" style={{ width: `${buyPct}%` }} />
        <div className="bs-bar__sell" style={{ width: `${sellPct}%` }} />
      </div>
      {showLabels && (
        <div className="bs-bar__labels">
          <span className="buy-lbl">{buys}</span>
          <span className="sell-lbl">{sells}</span>
        </div>
      )}
    </div>
  )
}
