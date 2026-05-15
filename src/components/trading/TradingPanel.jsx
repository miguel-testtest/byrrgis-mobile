import { useState, useRef } from 'react'
import {
  IconChevronDown, IconSwapArrows, IconChevronRight,
  IconArrowUpRight, IconArrowDownRight, IconCrosshair,
} from '../ui/Icons'

const PRESETS_BUY    = ['0.01', '0.1', '1', '10']
const SELL_FRACS     = [0.25, 0.5, 0.75, 1]
const SELL_LABELS    = ['25%', '50%', '75%', '100%']
const BALANCE_ETH    = 2.45
const BALANCE_TOKEN  = 1.41
const ETH_USD        = 2800
const TOKEN_USD      = 85

function AmountRow({ placeholder, tokenLabel, tokenBg, tokenInitial, sell, value, onChange }) {
  return (
    <div className="amount-row">
      <input
        type="number"
        placeholder={placeholder}
        inputMode="decimal"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button className={`token-selector${sell ? ' token-selector--sell' : ''}`}>
        {tokenBg ? (
          <div style={{
            width: 16, height: 16, borderRadius: '50%',
            background: tokenBg, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff',
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
  const [expanded, setExpanded]     = useState(false)
  const [buyAmount, setBuyAmount]   = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [swapAmount, setSwapAmount] = useState('')
  const [stopLoss, setStopLoss]     = useState('80.00')
  const [takeProfit, setTakeProfit] = useState('120.00')
  const [isAutoActive, setIsAutoActive] = useState(false)
  const dragStart = useRef(null)

  const onDragStart = e => {
    dragStart.current = { y: e.touches[0].clientY, wasExpanded: expanded }
  }
  const onDragEnd = e => {
    if (dragStart.current === null) return
    const dy = e.changedTouches[0].clientY - dragStart.current.y
    if (dy > 40 && dragStart.current.wasExpanded) setExpanded(false)
    else if (dy < -40 && !dragStart.current.wasExpanded) setExpanded(true)
    dragStart.current = null
  }
  const handleTabClick = op => { onOpChange(op); setExpanded(true) }

  const buyVal  = parseFloat(buyAmount)
  const sellVal = parseFloat(sellAmount)
  const swapVal = parseFloat(swapAmount)

  const buyCta  = buyAmount  ? `Buy ${buyAmount} ETH`           : `Buy ${symbol}`
  const sellCta = sellAmount ? `Sell ${sellAmount} ${symbol}`    : `Sell ${symbol}`

  const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div
      className={`op-panel${expanded ? ' op-panel--expanded' : ''}`}
      data-op={activeOp}
    >
      <div
        className="op-panel__handle-area"
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
        onClick={() => setExpanded(p => !p)}
      >
        <div className="op-panel__handle" />
      </div>

      <div className="op-tabs">
        <button className={`op-tab${activeOp === 'buy'  ? ' active-buy'  : ''}`} onClick={() => handleTabClick('buy')}>
          <IconArrowUpRight size={11} />Buy
        </button>
        <button className={`op-tab${activeOp === 'sell' ? ' active-sell' : ''}`} onClick={() => handleTabClick('sell')}>
          <IconArrowDownRight size={11} />Sell
        </button>
        <button className={`op-tab${activeOp === 'swap' ? ' active-swap' : ''}`} onClick={() => handleTabClick('swap')}>
          <IconSwapArrows size={11} />Swap
        </button>
        <button className={`op-tab${activeOp === 'auto' ? ' active-auto' : ''}`} onClick={() => handleTabClick('auto')}>
          <IconCrosshair size={11} />Auto
        </button>
      </div>

      {/* BUY */}
      <div className={`op-sub${activeOp === 'buy' ? ' active' : ''}`}>
        <AmountRow
          placeholder="0.00"
          tokenLabel="ETH"
          value={buyAmount}
          onChange={setBuyAmount}
        />
        <div className="amount-meta">
          <span className="amount-usd">
            {buyAmount && !isNaN(buyVal) ? `≈ $${fmt(buyVal * ETH_USD)}` : ''}
          </span>
          <span>
            {BALANCE_ETH} ETH
            <button className="max-btn" onClick={() => setBuyAmount(String(BALANCE_ETH))}>MAX</button>
          </span>
        </div>
        <div className="quick-presets">
          {PRESETS_BUY.map(p => (
            <button key={p} className="preset-btn" onClick={() => setBuyAmount(p)}>{p}</button>
          ))}
        </div>
        <div className="fees-row">
          <span>Est. network fee</span><span className="fees-row__val">~$0.04</span>
        </div>
        <button className={`op-cta buy-cta${!buyAmount ? ' op-cta--empty' : ''}`}>{buyCta}</button>
      </div>

      {/* SELL */}
      <div className={`op-sub${activeOp === 'sell' ? ' active' : ''}`}>
        <AmountRow
          placeholder="0.00"
          tokenLabel={symbol}
          tokenBg="#B6509E"
          tokenInitial={symbol[0]}
          sell
          value={sellAmount}
          onChange={setSellAmount}
        />
        <div className="amount-meta">
          <span className="amount-usd">
            {sellAmount && !isNaN(sellVal) ? `≈ $${fmt(sellVal * TOKEN_USD)}` : ''}
          </span>
          <span>
            {BALANCE_TOKEN} {symbol}
            <button className="max-btn" onClick={() => setSellAmount(String(BALANCE_TOKEN))}>MAX</button>
          </span>
        </div>
        <div className="quick-presets">
          {SELL_FRACS.map((frac, i) => (
            <button
              key={SELL_LABELS[i]}
              className="preset-btn preset-btn--sell"
              onClick={() => setSellAmount((BALANCE_TOKEN * frac).toFixed(4))}
            >{SELL_LABELS[i]}</button>
          ))}
        </div>
        <div className="fees-row">
          <span>Est. network fee</span><span className="fees-row__val">~$0.03</span>
        </div>
        <button className={`op-cta sell-cta${!sellAmount ? ' op-cta--empty' : ''}`}>{sellCta}</button>
      </div>

      {/* SWAP */}
      <div className={`op-sub${activeOp === 'swap' ? ' active' : ''}`}>
        <div className="swap-card">
          <div className="swap-card__label">You pay</div>
          <div className="amount-row" style={{ background: 'transparent', border: 'none', padding: 0, marginBottom: 4 }}>
            <input
              type="number"
              placeholder="0.05"
              inputMode="decimal"
              value={swapAmount}
              onChange={e => setSwapAmount(e.target.value)}
              style={{ fontSize: 22 }}
            />
            <button className="token-selector">
              <svg width="14" height="14" viewBox="0 0 128 128" fill="none">
                <path d="M24 88h80l-16 16H8l16-16zm0-32h80L88 72H8l16-16zm64-32H8L24 8h80L88 24z" fill="#627EEA" opacity=".8"/>
              </svg>
              ETH
              <IconChevronDown />
            </button>
          </div>
          <div className="amount-meta" style={{ marginBottom: 0 }}>
            <span className="amount-usd">
              {swapAmount && !isNaN(swapVal) ? `≈ $${fmt(swapVal * ETH_USD)}` : '$0.00'}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {BALANCE_ETH} ETH
              <button className="max-btn" onClick={() => setSwapAmount(String(BALANCE_ETH))}>MAX</button>
            </span>
          </div>
        </div>
        <div className="swap-divider">
          <button className="swap-flip-btn"><IconSwapArrows /></button>
        </div>
        <div className="swap-card">
          <div className="swap-card__label">You receive</div>
          <div className="amount-row" style={{ background: 'transparent', border: 'none', padding: 0, marginBottom: 4 }}>
            <input
              type="number"
              placeholder="0.00"
              inputMode="decimal"
              readOnly
              value={swapAmount && !isNaN(swapVal) ? (swapVal * ETH_USD / TOKEN_USD).toFixed(4) : ''}
              style={{ fontSize: 22 }}
            />
            <button className="token-selector">
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B6509E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>
                {symbol[0]}
              </div>
              {symbol}
              <IconChevronDown />
            </button>
          </div>
          <div className="amount-meta" style={{ marginBottom: 0 }}>
            <span className="amount-usd">
              {swapAmount && !isNaN(swapVal) ? `≈ $${fmt(swapVal * ETH_USD)}` : '$0.00'}
            </span>
          </div>
        </div>
        <div className="fees-row" style={{ marginTop: 8 }}>
          <span>Est. network fees</span><span className="fees-row__val">~$0.04</span>
        </div>
        <div className="fees-row" style={{ marginTop: 0 }}>
          <span>Platform fee</span><span className="fees-row__val">0.5%</span>
        </div>
        <button className="op-cta swap-cta">
          ETH <IconChevronRight size={11} /> {symbol}
        </button>
      </div>

      {/* AUTO */}
      <div className={`op-sub${activeOp === 'auto' ? ' active' : ''}`}>
        <div className="auto-position-row">
          <span className="auto-position-balance">{BALANCE_TOKEN} {symbol}</span>
          <span className="auto-position-usd">≈ ${fmt(BALANCE_TOKEN * TOKEN_USD)}</span>
        </div>

        <div className="auto-heading">Manage exit rules</div>

        <div className="adv-field">
          <div className="adv-field__label">Stop Loss Trigger</div>
          <div className="adv-field__input-wrap">
            <input
              className="adv-field__input adv-field__input--icon"
              type="number"
              inputMode="decimal"
              value={stopLoss}
              onChange={e => setStopLoss(e.target.value)}
              placeholder="0.00"
            />
            <span className="adv-field__suffix">$</span>
          </div>
        </div>

        <div className="adv-field">
          <div className="adv-field__label">Take Profit Trigger</div>
          <div className="adv-field__input-wrap">
            <input
              className="adv-field__input adv-field__input--icon"
              type="number"
              inputMode="decimal"
              value={takeProfit}
              onChange={e => setTakeProfit(e.target.value)}
              placeholder="0.00"
            />
            <span className="adv-field__suffix">$</span>
          </div>
        </div>

        <button
          className={`op-cta${isAutoActive ? ' auto-stop-cta' : ' auto-cta'}`}
          onClick={() => setIsAutoActive(p => !p)}
        >
          {isAutoActive ? 'Stop auto-sell' : 'Start auto-sell'}
        </button>

        {!isAutoActive && (
          <p className="auto-disclaimer">
            Enabling this rule will automatically pause your portfolio's global auto-sell.
          </p>
        )}
      </div>
    </div>
  )
}
