const TIME_BTNS = ['1s', '1m', '5m', '1h', '4h', '1D', '1W', '1M']

export default function TimeSelector({ active, onChange }) {
  return (
    <div className="time-selector">
      {TIME_BTNS.map(t => (
        <button
          key={t}
          className={`time-btn${active === t ? ' active' : ''}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
