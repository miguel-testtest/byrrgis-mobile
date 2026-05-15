import { useState } from 'react'
import TradingProfileListSheet from '../trading/TradingProfileListSheet'
import TradingProfileEditor from '../trading/TradingProfileEditor'
import WithdrawSheet from '../trading/WithdrawSheet'

const INITIAL_PROFILES = [
  { id: 1, name: "Rob's mode",  active: true  },
  { id: 2, name: 'Degen mode',  active: false },
  { id: 3, name: 'Safe mode',   active: false },
]

const NAV_ITEMS = [
  { label: 'Configuración' },
  { label: 'Seguridad' },
  { label: 'Notificaciones' },
]

function ChevronRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        background: 'var(--color-surface-3)',
        border: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
        {label}
      </span>
    </button>
  )
}

export default function ProfileSheet({ user, onClose }) {
  const initial = (user?.initial || user?.name?.[0] || '?').toUpperCase()

  const [profiles,       setProfiles]       = useState(INITIAL_PROFILES)
  const [listOpen,       setListOpen]       = useState(false)
  const [editorOpen,     setEditorOpen]     = useState(false)
  const [withdrawOpen,   setWithdrawOpen]   = useState(false)
  const [editingProfile, setEditingProfile] = useState(null)

  const activeName = profiles.find(p => p.active)?.name ?? '—'

  const handleSelect = (id) => {
    setProfiles(prev => prev.map(p => ({ ...p, active: p.id === id })))
    setListOpen(false)
  }
  const handleEdit   = (p) => { setEditingProfile(p); setEditorOpen(true) }
  const handleNew    = ()  => { setEditingProfile(null); setEditorOpen(true) }
  const handleDelete = (id) => setProfiles(prev => {
    const next = prev.filter(p => p.id !== id)
    if (!next.some(p => p.active) && next.length) next[0].active = true
    return next
  })
  const handleSave = () => { setEditorOpen(false); setListOpen(false); setEditingProfile(null) }

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, zIndex: 110,
          background: 'rgba(5,10,10,0.65)',
          animation: 'sidebar-fade-in 200ms ease-out forwards',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        zIndex: 111,
        background: 'var(--color-surface-1)',
        borderRadius: '20px 20px 0 0',
        display: 'flex', flexDirection: 'column',
        animation: 'profile-sheet-up 280ms cubic-bezier(0.2,0,0,1) forwards',
        maxHeight: '88%', overflowY: 'auto',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
        </div>

        {/* Avatar + identity */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 20px 20px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: user?.avatarColor || 'var(--color-surface-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-ui)', lineHeight: 1 }}>
              {initial}
            </span>
          </div>

          <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', marginBottom: 4 }}>
            {user?.name || 'Cuenta 1'}
          </div>

          {/* Wallet address pill */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--color-surface-3)',
            border: '1px solid var(--color-border)',
            borderRadius: 20, padding: '5px 12px',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              5xHY…w3Kp
            </span>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          </button>
        </div>

        {/* Quick actions */}
        <div style={{
          display: 'flex', gap: 4,
          padding: '0 20px 24px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <QuickAction
            label="Deposit"
            onClick={() => {}}
            icon={
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v13M5 14l7 7 7-7" />
              </svg>
            }
          />
          <QuickAction
            label="Withdraw"
            onClick={() => setWithdrawOpen(true)}
            icon={
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21V8M5 10l7-7 7 7" />
              </svg>
            }
          />
          <QuickAction
            label={activeName}
            onClick={() => setListOpen(true)}
            icon={
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            }
          />
        </div>

        {/* Nav rows */}
        <div style={{ padding: '8px 0' }}>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '15px 20px',
                background: 'none', border: 'none',
                borderBottom: i < NAV_ITEMS.length - 1 ? '1px solid var(--color-border)' : 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                {item.label}
              </span>
              <ChevronRight />
            </button>
          ))}
        </div>

        {/* Sign out */}
        <div style={{ borderTop: '1px solid var(--color-border)', padding: '8px 0 32px' }}>
          <button style={{
            width: '100%', padding: '15px 20px',
            background: 'none', border: 'none',
            color: 'var(--color-red)', fontSize: 15, fontWeight: 500,
            fontFamily: 'var(--font-ui)', cursor: 'pointer', textAlign: 'left',
          }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Sub-sheets */}
      {listOpen && (
        <TradingProfileListSheet
          profiles={profiles}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onNew={handleNew}
          onDelete={handleDelete}
          onClose={() => setListOpen(false)}
        />
      )}
      {editorOpen && (
        <TradingProfileEditor
          profile={editingProfile}
          onSave={handleSave}
          onClose={() => { setEditorOpen(false); setEditingProfile(null) }}
        />
      )}
      {withdrawOpen && (
        <WithdrawSheet onClose={() => setWithdrawOpen(false)} />
      )}
    </>
  )
}
