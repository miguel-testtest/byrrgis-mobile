export default function OHLCBar({ ohlc }) {
  return (
    <div className="ohlc-bar">
      <div className="ohlc-bar__item">
        <span className="ohlc-bar__label">O</span>
        <span className="ohlc-bar__val">{ohlc.O}</span>
      </div>
      <div className="ohlc-bar__item">
        <span className="ohlc-bar__label">H</span>
        <span className="ohlc-bar__val">{ohlc.H}</span>
      </div>
      <div className="ohlc-bar__item">
        <span className="ohlc-bar__label">L</span>
        <span className="ohlc-bar__val">{ohlc.L}</span>
      </div>
      <div className="ohlc-bar__item">
        <span className="ohlc-bar__label">C</span>
        <span className="ohlc-bar__val">{ohlc.C}</span>
      </div>
      <div className="ohlc-bar__item">
        <span className={`ohlc-bar__val${ohlc.neg ? ' neg' : ''}`}>{ohlc.chg}</span>
      </div>
    </div>
  )
}
