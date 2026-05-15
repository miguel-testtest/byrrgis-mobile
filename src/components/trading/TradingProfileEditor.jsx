import { useState } from 'react'

const SLIPPAGE_OPTS = ['0.5%', '1%', '2%', 'Auto']
const PRIORITY_OPTS = ['Slow', 'Normal', 'Fast']
const PRESET_TABS   = ['Buy', 'Sell', 'Exit rules']

const inputStyle = {
  background: 'var(--color-surface-3)',
  border: '1px solid var(--color-border)',
  borderRadius: 8,
  padding: '11px 12px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

export default function TradingProfileEditor({ profile, onSave, onClose }) {
  const isEdit = !!profile

  const [name,         setName]         = useState(profile?.name || '')
  const [preset,       setPreset]       = useState('Buy')
  const [slippage,     setSlippage]     = useState('0.5%')
  const [customSlip,   setCustomSlip]   = useState('')
  const [priority,     setPriority]     = useState('Normal')
  const [stopLoss,     setStopLoss]     = useState(isEdit ? '10%' : '')
  const [takeProfit,   setTakeProfit]   = useState(isEdit ? '50%' : '')
  const [exitSlippage, setExitSlippage] = useState('0.5%')
  const [exitCustom,   setExitCustom]   = useState('')
  const [exitPriority, setExitPriority] = useState('Normal')

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,10,0.75)' }} />

      <div style={{
        position: 'relative',
        background: 'var(--color-surface-2)',
        borderRadius: '16px 16px 0 0',
        padding: '20px 20px 48px',
        display: 'flex', flexDirection: 'column', gap: 20,
        maxHeight: '92%', overflowY: 'auto',
      }}>
        <div style={{ width: 32, height: 3, borderRadius: 9999, background: 'var(--color-border)', margin: '-8px auto 0' }} />

        <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
          {isEdit ? 'Edit profile' : 'Set up your trading profile'}
        </div>

        {/* Profile name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Profile name</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rob's mode" style={inputStyle} />
        </div>

        {/* Preset tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Set your preset</span>
          <div style={{ display: 'flex', background: 'var(--color-surface-3)', borderRadius: 10, padding: 3 }}>
            {PRESET_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setPreset(tab)}
                style={{
                  flex: 1, padding: '9px 0',
                  background: preset === tab ? 'var(--color-teal)' : 'none',
                  border: 'none', borderRadius: 8,
                  color: preset === tab ? '#03110F' : 'var(--text-muted)',
                  fontFamily: 'var(--font-ui)', fontSize: 14,
                  fontWeight: preset === tab ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {preset !== 'Exit rules' ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Slippage</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {SLIPPAGE_OPTS.map(opt => (
                  <button key={opt} onClick={() => setSlippage(opt)} style={{
                    flex: 1, padding: '9px 0',
                    background: slippage === opt ? 'var(--color-teal)' : 'var(--color-surface-3)',
                    border: '1px solid', borderColor: slippage === opt ? 'var(--color-teal)' : 'var(--color-border)',
                    borderRadius: 8,
                    color: slippage === opt ? '#03110F' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: slippage === opt ? 600 : 400,
                    cursor: 'pointer',
                  }}>{opt}</button>
                ))}
              </div>
              <input value={customSlip} onChange={e => setCustomSlip(e.target.value)} placeholder="Custom amount"
                style={{ ...inputStyle, color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Priority fee</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {PRIORITY_OPTS.map(opt => (
                  <button key={opt} onClick={() => setPriority(opt)} style={{
                    flex: 1, padding: '10px 0', background: 'none',
                    border: '1px solid', borderColor: priority === opt ? 'var(--color-teal)' : 'var(--color-border)',
                    borderRadius: 8,
                    color: priority === opt ? 'var(--color-teal)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-ui)', fontSize: 13, cursor: 'pointer',
                  }}>{opt}</button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'Stop loss',   val: stopLoss,   set: setStopLoss,   ph: 'e.g 10%' },
                { label: 'Take profit', val: takeProfit, set: setTakeProfit, ph: 'e.g 50%' },
              ].map(f => (
                <div key={f.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>{f.label}</span>
                  <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={inputStyle} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Exit slippage</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {SLIPPAGE_OPTS.map(opt => (
                  <button key={opt} onClick={() => setExitSlippage(opt)} style={{
                    flex: 1, padding: '9px 0',
                    background: exitSlippage === opt ? 'var(--color-teal)' : 'var(--color-surface-3)',
                    border: '1px solid', borderColor: exitSlippage === opt ? 'var(--color-teal)' : 'var(--color-border)',
                    borderRadius: 8,
                    color: exitSlippage === opt ? '#03110F' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: exitSlippage === opt ? 600 : 400,
                    cursor: 'pointer',
                  }}>{opt}</button>
                ))}
              </div>
              <input value={exitCustom} onChange={e => setExitCustom(e.target.value)} placeholder="Custom amount"
                style={{ ...inputStyle, color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Exit priority fee</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {PRIORITY_OPTS.map(opt => (
                  <button key={opt} onClick={() => setExitPriority(opt)} style={{
                    flex: 1, padding: '10px 0', background: 'none',
                    border: '1px solid', borderColor: exitPriority === opt ? 'var(--color-teal)' : 'var(--color-border)',
                    borderRadius: 8,
                    color: exitPriority === opt ? 'var(--color-teal)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-ui)', fontSize: 13, cursor: 'pointer',
                  }}>{opt}</button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          onClick={onSave}
          style={{
            width: '100%', padding: '15px',
            background: 'var(--color-teal)', border: 'none', borderRadius: 14,
            color: '#03110F', fontSize: 15, fontWeight: 600,
            fontFamily: 'var(--font-ui)', cursor: 'pointer',
          }}
        >
          Save profile
        </button>
      </div>
    </div>
  )
}
