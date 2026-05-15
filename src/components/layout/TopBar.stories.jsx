import { useState } from 'react'
import { fn } from '@storybook/test'
import TopBar from './TopBar'

const MOCK_USER = {
  name: 'Cuenta 1',
  handle: '@willingreed',
  avatarColor: '#2D6A61',
  initial: 'M',
}

const MOCK_USER_WITH_AVATAR = {
  name: 'Main Wallet',
  avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=byrrgis&backgroundColor=1ABCA3',
}

// ─── Stub: Profile Sheet ─────────────────────────────────────────────────────
function StubProfileSheet({ user, onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,10,0.7)' }}
      />

      {/* Sheet */}
      <div style={{
        position: 'relative',
        background: 'var(--color-surface-2)',
        borderRadius: '16px 16px 0 0',
        padding: '20px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        {/* Handle */}
        <div style={{
          width: 32, height: 3, borderRadius: 9999,
          background: 'var(--color-border)',
          margin: '-8px auto 4px',
        }} />

        {/* User row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: user?.avatarColor || 'var(--color-surface-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: 'var(--text-primary)', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-ui)' }}>
              {(user?.initial || user?.name?.[0] || '?').toUpperCase()}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>
              {user?.name || 'Cuenta 1'}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-ui)' }}>
              {user?.handle || '@usuario'}
            </span>
          </div>
        </div>

        {/* Wallet address stub */}
        <div style={{
          background: 'var(--color-surface-3)',
          borderRadius: 8, padding: '10px 14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            5xHY…w3Kp
          </span>
          <span style={{ color: 'var(--color-teal)', fontSize: 11, fontWeight: 500, fontFamily: 'var(--font-ui)' }}>
            Copiar
          </span>
        </div>

        {/* Stub items */}
        {['Configuración', 'Seguridad', 'Cerrar sesión'].map((label, i) => (
          <div
            key={label}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingBottom: i < 2 ? 20 : 0,
              borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <span style={{
              color: i === 2 ? 'var(--color-red)' : 'var(--text-primary)',
              fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 500,
            }}>
              {label}
            </span>
            {i < 2 && (
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stub: Search Overlay ─────────────────────────────────────────────────────
function StubSearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')

  const tokenResults = query
    ? [
        { symbol: 'SOL', name: 'Solana', price: '$148.20', delta: '+3.1%', positive: true },
        { symbol: 'JUP', name: 'Jupiter', price: '$0.94', delta: '-1.4%', positive: false },
      ]
    : []

  const portfolioResults = query
    ? [{ symbol: 'SOL', name: 'Solana', balance: '12.5 SOL', value: '$1,852.50' }]
    : []

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Search input */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-surface-3)',
          borderRadius: 8, padding: '9px 12px',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tokens o portfolio…"
            style={{
              background: 'none', border: 'none', outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 400,
              flex: 1,
            }}
          />
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', padding: 0,
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          Cancelar
        </button>
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
        {!query && (
          <div style={{ padding: '40px 16px', textAlign: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
              Busca un token o activo de tu portfolio
            </span>
          </div>
        )}

        {tokenResults.length > 0 && (
          <>
            <div style={{ padding: '0 16px 8px', color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Tokens
            </div>
            {tokenResults.map((t) => (
              <div key={t.symbol} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--color-surface-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-ui)' }}>
                    {t.symbol.slice(0, 2)}
                  </span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>{t.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-ui)' }}>{t.symbol}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{t.price}</span>
                  <span style={{ color: t.positive ? 'var(--color-teal)' : 'var(--color-red)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{t.delta}</span>
                </div>
              </div>
            ))}
          </>
        )}

        {portfolioResults.length > 0 && (
          <>
            <div style={{ padding: '12px 16px 8px', color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Mi Portfolio
            </div>
            {portfolioResults.map((p) => (
              <div key={p.symbol} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--color-surface-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'var(--color-teal)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-ui)' }}>
                    {p.symbol.slice(0, 2)}
                  </span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-ui)' }}>{p.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{p.balance}</span>
                </div>
                <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
                  {p.value}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Decorator ───────────────────────────────────────────────────────────────
const phoneDecorator = (Story) => (
  <div style={{
    width: 430, height: 932,
    background: 'var(--color-bg)',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <Story />
  </div>
)

// ─── Meta ─────────────────────────────────────────────────────────────────────
export default {
  title: 'Layout / TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
  decorators: [phoneDecorator],
  args: {
    user: MOCK_USER,
    onProfilePress: fn(),
    onSearchPress: fn(),
  },
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default = {}

export const WithAvatarImage = {
  args: { user: MOCK_USER_WITH_AVATAR },
}

export const ProfileSheetOpen = {
  render: (args) => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <TopBar {...args} onProfilePress={() => setOpen(true)} />
        {/* Page content placeholder */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 8, background: 'var(--color-surface-2)', opacity: 1 - i * 0.15 }} />
          ))}
        </div>
        {open && <StubProfileSheet user={args.user} onClose={() => setOpen(false)} />}
      </>
    )
  },
}

export const SearchOpen = {
  render: (args) => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <TopBar {...args} onSearchPress={() => setOpen(true)} />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 8, background: 'var(--color-surface-2)', opacity: 1 - i * 0.15 }} />
          ))}
        </div>
        {open && <StubSearchOverlay onClose={() => setOpen(false)} />}
      </>
    )
  },
}

export const InPageContext = {
  render: (args) => {
    const [sheet, setSheet] = useState(false)
    const [search, setSearch] = useState(false)
    return (
      <>
        <TopBar {...args} onProfilePress={() => setSheet(true)} onSearchPress={() => setSearch(true)} />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-ui)', letterSpacing: '0.05em', textTransform: 'uppercase', paddingTop: 4 }}>
            Portfolio
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 8, background: 'var(--color-surface-2)', opacity: 1 - i * 0.12 }} />
          ))}
        </div>
        {sheet && <StubProfileSheet user={args.user} onClose={() => setSheet(false)} />}
        {search && <StubSearchOverlay onClose={() => setSearch(false)} />}
      </>
    )
  },
}
