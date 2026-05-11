import { useState, useRef } from 'react'
import { IconChevronDown, IconSwapArrows } from '../ui/Icons'

const PRESETS_BUY  = ['0.01', '0.1', '1', '10']
const PRESETS_SELL = ['25%', '50%', '75%', '100%']
const SLIPPAGE_OPTS = ['0.5%', '1%', '2%', 'Custom']

function AmountRow({ placeholder, tokenLabel, tokenBg, tokenInitial, sell }) {
  return (
    <div className="amount-row">
      <input type="number" placeholder={placeholder} inputMode="decimal" />
      <button className="token-selector" style={sell ? { color: 'var(--color-red)' } : {}}>
        {tokenBg ? (
          <div style={{
            width: 16, height: 16, borderRadius: '50%',
            background: tokenBg, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff'
          }}>{tokenInitial}</div>
        ) : (
          <svg width="16" height="16" viewBox="0 0 128 128" fill="none">
            <path d="M24 88h80l-16 16H8l16-16zm0-32h80L88 72H8l16-16zm64-32H8L24 8h80L88 24z" fill="#627EEA" opacity=".8"/>
          </svg>
        )}
        {tokenLabel}
        <IconChevronDown />
      </button>
    </div>
  )
}

export default function TradingPanel({ activeOp, onOpChange, symbol }) {
  const [expanded, setExpanded] = useState(false)
  const [slippage, setSlippage] = useState('0.5%')
  const dragStart = useRef(null)

  const onDragStart = (e) => {
    dragStart.current = { y: e.touches[0].clientY, wasExpanded: expanded }
  }

  const onDragEnd = (e) => {
    if (dragStart.current === null) return
    const dy = e.changedTouches[0].clientY - dragStart.current.y
    if (dy > 40 && dragStart.current.wasExpanded) setExpanded(false)
    else if (dy < -40 && !dragStart.current.wasExpanded) setExpanded(true)
    dragStart.current = null
  }

  const handleTabClick = (op) => {
    onOpChange(op)
    setExpanded(true)
  }

  return (
    <div className={`op-panel${expanded ? ' op-panel--expanded' : ''}`}>
      <div
        className="op-panel__handle-area"
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
        onClick={() => setExpanded(e => !e)}
      >
        <div className="op-panel__handle" />
      </div>

      <div className="op-tabs">
        <button
          className={`op-tab${activeOp === 'buy' ? ' active-buy' : ''}`}
          onClick={() => handleTabClick('buy')}
        >Buy</button>
        <button
          className={`op-tab${activeOp === 'sell' ? ' active-sell' : ''}`}
          onClick={() => handleTabClick('sell')}
        >Sell</button>
        <button
          className={`op-tab${activeOp === 'swap' ? ' active-swap' : ''}`}
          onClick={() => handleTabClick('swap')}
        >Swap</button>
        <button
          className={`op-tab${activeOp === 'auto' ? ' active-auto' : ''}`}
          onClick={() => handleTabClick('auto')}
        >Auto</button>
      </div>

      {/* BUY */}
      <div className={`op-sub${activeOp === 'buy' ? ' active' : ''}`}>
        <AmountRow placeholder="0.00" tokenLabel="ETH" />
        <div className="amount-meta">
          <span>Balance: 2.45 ETH</span>
          <button className="max-btn">MAX</button>
        </div>
        <div className="quick-presets">
          {PRESETS_BUY.map(p => (
            <button key={p} className="preset-btn">{p}</button>
          ))}
        </div>
        <div className="fees-row">
          <span>Est. network fee</span><span className="fees-row__val">0.04</span>
        </div>
        <button className="op-cta buy-cta">Buy {symbol}</button>
      </div>

      {/* SELL */}
      <div className={`op-sub${activeOp === 'sell' ? ' active' : ''}`}>
        <AmountRow placeholder="0.00" tokenLabel={symbol} tokenBg="#B6509E" tokenInitial={symbol[0]} sell />
        <div className="amount-meta">
          <span>Balance: 1.41 {symbol}</span>
          <button className="max-btn">MAX</button>
        </div>
        <div className="quick-presets">
          {PRESETS_SELL.map(p => (
            <button key={p} className="preset-btn" style={{ color: 'var(--color-red)' }}>{p}</button>
          ))}
        </div>
        <div className="fees-row">
          <span>Est. network fee</span><span className="fees-row__val">0.03</span>
        </div>
        <button className="op-cta sell-cta">Sell {symbol}</button>
      </div>

      {/* SWAP */}
      <div className={`op-sub${activeOp === 'swap' ? ' active' : ''}`}>
        <div className="swap-card">
          <div className="swap-card__label">You pay</div>
          <div className="amount-row" style={{ background: 'transparent', border: 'none', padding: 0, marginBottom: 4 }}>
            <input type="number" placeholder="0.05" inputMode="decimal" style={{ fontSize: 22 }} />
            <button className="token-selector">
              <svg width="14" height="14" viewBox="0 0 128 128" fill="none">
                <path d="M24 88h80l-16 16H8l16-16zm0-32h80L88 72H8l16-16zm64-32H8L24 8h80L88 24z" fill="#627EEA" opacity=".8"/>
              </svg>
              ETH
              <IconChevronDown />
            </button>
          </div>
          <div className="amount-meta" style={{ marginBottom: 0 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>$140.25</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>2.45 ETH <button className="max-btn">MAX</button></span>
          </div>
        </div>
        <div className="swap-divider">
          <button className="swap-flip-btn"><IconSwapArrows /></button>
        </div>
        <div className="swap-card">
          <div className="swap-card__label">You receive</div>
          <div className="amount-row" style={{ background: 'transparent', border: 'none', padding: 0, marginBottom: 4 }}>
            <input type="number" placeholder="0.00" inputMode="decimal" style={{ fontSize: 22 }} readOnly />
            <button className="token-selector">
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B6509E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>
                {symbol[0]}
              </div>
              {symbol}
              <IconChevronDown />
            </button>
          </div>
          <div className="amount-meta" style={{ marginBottom: 0 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>$140.25</span>
          </div>
        </div>
        <div className="fees-row" style={{ marginTop: 8 }}>
          <span>Est. network fees</span><span className="fees-row__val">0.04</span>
        </div>
        <div className="fees-row" style={{ marginTop: 0 }}>
          <span>Platform fee</span><span className="fees-row__val">0.5%</span>
        </div>
        <button className="op-cta swap-cta">Swap</button>
      </div>

      {/* AUTO */}
      <div className={`op-sub${activeOp === 'auto' ? ' active' : ''}`}>
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
            >{opt}</button>
          ))}
        </div>
        <button className="op-cta auto-cta">Start Auto-Sell</button>
      </div>
    </div>
  )
}
