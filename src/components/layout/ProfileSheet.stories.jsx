import { useState } from 'react'
import { fn } from '@storybook/test'
import ProfileSheet from './ProfileSheet'
import TradingProfileListSheet from '../trading/TradingProfileListSheet'
import TradingProfileEditor from '../trading/TradingProfileEditor'
import WithdrawSheet from '../trading/WithdrawSheet'

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: 'Cuenta 1',
  handle: '@willingreed',
  avatarColor: '#2D6A61',
  initial: 'M',
}

const MOCK_USER_MINIMAL = {
  name: 'Main Wallet',
}

const INITIAL_PROFILES = [
  { id: 1, name: "Rob's mode",  active: true  },
  { id: 2, name: 'Degen mode',  active: false },
  { id: 3, name: 'Safe mode',   active: false },
]

// ─── Decorator ────────────────────────────────────────────────────────────────

const phoneDecorator = (Story) => (
  <div style={{
    width: 430, height: 932,
    background: 'var(--color-bg)',
    position: 'relative', overflow: 'hidden',
  }}>
    <Story />
  </div>
)

// ─── Meta ─────────────────────────────────────────────────────────────────────

export default {
  title: 'Layout / ProfileSheet',
  component: ProfileSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [phoneDecorator],
  args: { user: MOCK_USER, onClose: fn() },
}

// ─── Basic stories ────────────────────────────────────────────────────────────

export const Default = {}

export const MinimalUser = {
  args: { user: MOCK_USER_MINIMAL },
}

// Full interactive flow — open the sidebar then tap Trading profile or Withdraw
export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-ui)', letterSpacing: '0.05em', textTransform: 'uppercase', paddingTop: 4 }}>
            Portfolio
          </div>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 8, background: 'var(--color-surface-2)', opacity: 1 - i * 0.1 }} />
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute', top: 16, left: 16,
            width: 36, height: 36, borderRadius: '50%',
            background: '#2D6A61', border: 'none',
            color: 'var(--text-primary)', fontSize: 16, fontWeight: 700,
            fontFamily: 'var(--font-ui)', cursor: 'pointer',
          }}
        >
          M
        </button>
        {open && <ProfileSheet user={MOCK_USER} onClose={() => setOpen(false)} />}
      </>
    )
  },
}

// ─── Individual panel snapshots ───────────────────────────────────────────────

export const ProfileListSheet = {
  render: () => {
    const [profiles, setProfiles] = useState(INITIAL_PROFILES)
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <TradingProfileListSheet
          profiles={profiles}
          onSelect={id => setProfiles(prev => prev.map(p => ({ ...p, active: p.id === id })))}
          onEdit={fn()}
          onNew={fn()}
          onDelete={id => setProfiles(prev => prev.filter(p => p.id !== id))}
          onClose={fn()}
        />
      </div>
    )
  },
}

export const EditorNewProfile = {
  render: () => (
    <div style={{ position: 'absolute', inset: 0 }}>
      <TradingProfileEditor profile={null} onSave={fn()} onClose={fn()} />
    </div>
  ),
}

export const EditorEditProfile = {
  render: () => (
    <div style={{ position: 'absolute', inset: 0 }}>
      <TradingProfileEditor profile={INITIAL_PROFILES[0]} onSave={fn()} onClose={fn()} />
    </div>
  ),
}

export const WithdrawFlow = {
  render: () => (
    <div style={{ position: 'absolute', inset: 0 }}>
      <WithdrawSheet onClose={fn()} />
    </div>
  ),
}
