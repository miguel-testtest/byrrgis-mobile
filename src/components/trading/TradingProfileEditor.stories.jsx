import { useState } from 'react'
import { fn } from '@storybook/test'
import TradingProfileEditor from './TradingProfileEditor'

const MOCK_PROFILE = { id: 1, name: "Rob's mode", active: true }

const phoneDecorator = (Story) => (
  <div style={{
    width: 430, height: 932,
    background: 'var(--color-bg)',
    position: 'relative', overflow: 'hidden',
  }}>
    <Story />
  </div>
)

export default {
  title: 'Trading / TradingProfileEditor',
  component: TradingProfileEditor,
  parameters: { layout: 'fullscreen' },
  decorators: [phoneDecorator],
  args: { onSave: fn(), onClose: fn() },
}

export const NewProfile = {
  args: { profile: null },
}

export const EditProfile = {
  args: { profile: MOCK_PROFILE },
}

export const Interactive = {
  render: () => {
    const [profile, setProfile] = useState(null)
    const [open, setOpen] = useState(true)
    return (
      <>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { setProfile(null); setOpen(true) }}
              style={{
                flex: 1, padding: '10px 0',
                background: 'var(--color-teal)', border: 'none', borderRadius: 10,
                color: '#03110F', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              New profile
            </button>
            <button
              onClick={() => { setProfile(MOCK_PROFILE); setOpen(true) }}
              style={{
                flex: 1, padding: '10px 0',
                background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 10,
                color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: 13, cursor: 'pointer',
              }}
            >
              Edit profile
            </button>
          </div>
        </div>
        {open && (
          <TradingProfileEditor profile={profile} onSave={() => setOpen(false)} onClose={() => setOpen(false)} />
        )}
      </>
    )
  },
}
