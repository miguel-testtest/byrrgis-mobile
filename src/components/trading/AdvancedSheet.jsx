import { useState } from 'react'

const SLIPPAGE_OPTS = ['0.5%', '1%', '2%', 'Custom']

export default function AdvancedSheet({ open, onClose }) {
  const [slippage, setSlippage] = useState('0.5%')

  return (
    <>
      <div className={`adv-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`adv-sheet${open ? ' open' : ''}`}>
        <div className="adv-sheet__handle" />
        <div className="adv-sheet__title">Advanced Trading Strategy</div>

        <div className="adv-field">
          <div className="adv-field__label">Stop Loss Trigger</div>
          <input className="adv-field__input" type="text" placeholder="SL" />
        </div>
        <div className="adv-field">
          <div className="adv-field__label">Take Profit Trigger</div>
          <input className="adv-field__input" type="text" placeholder="TP" />
        </div>

        <div className="adv-field__label" style={{ marginBottom: 8 }}>Slippage</div>
        <div className="slippage-row">
          {SLIPPAGE_OPTS.map(opt => (
            <button
              key={opt}
              className={`slip-btn${slippage === opt ? ' active' : ''}`}
              onClick={() => setSlippage(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        <button className="auto-sell-btn">Start auto-sell</button>
      </div>
    </>
  )
}
