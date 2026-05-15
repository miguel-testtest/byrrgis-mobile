import { useState } from 'react'
import { fn } from '@storybook/test'
import TradingProfileListSheet from './TradingProfileListSheet'

const MOCK_PROFILES = [
  { id: 1, name: "Rob's mode",  active: true  },
  { id: 2, name: 'Degen mode',  active: false },
  { id: 3, name: 'Safe mode',   active: false },
]

const SINGLE_PROFILE = [
  { id: 1, name: "Rob's mode", active: true },
]

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
  title: 'Trading / TradingProfileListSheet',
  component: TradingProfileListSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [phoneDecorator],
  args: {
    profiles: MOCK_PROFILES,
    onSelect: fn(), onEdit: fn(), onNew: fn(), onDelete: fn(), onClose: fn(),
  },
}

export const Default = {}

export const SingleProfile = {
  args: { profiles: SINGLE_PROFILE },
}

export const Interactive = {
  render: () => {
    const [profiles, setProfiles] = useState(MOCK_PROFILES)
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <TradingProfileListSheet
          profiles={profiles}
          onSelect={id => setProfiles(prev => prev.map(p => ({ ...p, active: p.id === id })))}
          onEdit={fn()}
          onNew={() => setProfiles(prev => [...prev, { id: Date.now(), name: `Profile ${prev.length + 1}`, active: false }])}
          onDelete={id => setProfiles(prev => prev.filter(p => p.id !== id))}
          onClose={fn()}
        />
      </div>
    )
  },
}
