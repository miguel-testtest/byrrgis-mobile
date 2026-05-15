import { useState } from 'react'

const MOCK_BALANCES = [
  { symbol: 'SOL', name: 'Solana',   amount: 12.45, usdRate: 148.20 },
  { symbol: 'ETH', name: 'Ethereum', amount: 2.45,  usdRate: 2920.00 },
]

const MOCK_RECENTS = [
  { id: 1, name: 'John Doe',    address: 'Fcvb...13H3' },
  { id: 2, name: 'Alice Smith', address: '3xKp...9Y2Q' },
  { id: 3, name: 'Bob Jones',   address: '8mNt...4W7R' },
]

const tokenColor = (symbol) => symbol === 'SOL' ? '#9945FF' : '#627EEA'

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

export default function WithdrawSheet({ onClose }) {
  const [selectedToken,   setSelectedToken]   = useState(MOCK_BALANCES[0])
  const [tokenPickerOpen, setTokenPickerOpen] = useState(false)
  const [amount,          setAmount]          = useState('')
  const [recipient,       setRecipient]       = useState('')
  const [address,         setAddress]         = useState('')
  const [recents,         setRecents]         = useState(MOCK_RECENTS)

  const numAmount = parseFloat(amount) || 0
  const usdValue  = (numAmount * selectedToken.usdRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,10,0.75)' }} />

      <div style={{
        position: 'relative',
        background: 'var(--color-surface-2)',
        borderRadius: '16px 16px 0 0',
        padding: '20px 20px 48px',
        display: 'flex', flexDirection: 'column', gap: 20,
        maxHeight: '94%', overflowY: 'auto',
      }}>
        <div style={{ width: 32, height: 3, borderRadius: 9999, background: 'var(--color-border)', margin: '-8px auto 0' }} />

        {/* Header */}
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', marginBottom: 4 }}>
            Withdraw my balance
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
            Send tokens to an exchange or external wallet
          </div>
        </div>

        {/* Amount card */}
        <div style={{
          background: 'var(--color-surface-3)',
          border: '1px solid var(--color-border)',
          borderRadius: 12, padding: '16px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: amount ? 'var(--color-teal)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600,
              }}
            />

            {/* Token selector pill */}
            <button
              onClick={() => setTokenPickerOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 20, padding: '6px 10px 6px 8px',
                cursor: 'pointer', flexShrink: 0,
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: tokenColor(selectedToken.symbol),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-ui)' }}>
                  {selectedToken.symbol[0]}
                </span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                {selectedToken.symbol}
              </span>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Token picker dropdown */}
          {tokenPickerOpen && (
            <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
              {MOCK_BALANCES.map((token, i) => (
                <button
                  key={token.symbol}
                  onClick={() => { setSelectedToken(token); setTokenPickerOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '11px 14px',
                    background: selectedToken.symbol === token.symbol ? 'var(--color-teal-dim)' : 'none',
                    border: 'none',
                    borderBottom: i < MOCK_BALANCES.length - 1 ? '1px solid var(--color-border)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: tokenColor(token.symbol),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-ui)' }}>
                        {token.symbol[0]}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>{token.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{token.symbol}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {token.amount}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* USD equivalent + MAX */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {numAmount > 0 ? usdValue : '$0.00'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {selectedToken.amount} {selectedToken.symbol}
              </span>
              <button
                onClick={() => setAmount(String(selectedToken.amount))}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  color: 'var(--color-teal)', fontSize: 12, fontWeight: 600,
                  fontFamily: 'var(--font-ui)', cursor: 'pointer',
                }}
              >
                MAX
              </button>
            </div>
          </div>
        </div>

        {/* Recipient */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Recipient wallet</span>

          <div style={{ position: 'relative' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <input
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="Recipient name"
              style={{ ...inputStyle, paddingLeft: 36 }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 11a1 1 0 100 2 1 1 0 000-2z" fill="var(--text-muted)" />
              <path d="M2 11h20" />
            </svg>
            <input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Wallet address"
              style={{ ...inputStyle, paddingLeft: 36, fontFamily: 'var(--font-mono)', fontSize: 13 }}
            />
          </div>
        </div>

        {/* Recents */}
        {recents.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Recents</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {recents.map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => { setRecipient(r.name); setAddress(r.address) }}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'var(--color-surface-3)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8, padding: '11px 14px', cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                      {r.name}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {r.address}
                    </span>
                  </button>
                  <button
                    onClick={() => setRecents(prev => prev.filter(x => x.id !== r.id))}
                    style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', flexShrink: 0 }}
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          style={{
            width: '100%', padding: '15px',
            background: 'var(--color-teal)', border: 'none', borderRadius: 14,
            color: '#03110F', fontSize: 15, fontWeight: 600,
            fontFamily: 'var(--font-ui)', cursor: 'pointer',
            opacity: !amount || !address ? 0.5 : 1,
          }}
        >
          Withdraw funds
        </button>
      </div>
    </div>
  )
}
