import { useState } from 'react'
import { fn } from '@storybook/test'
import WithdrawSheet from './WithdrawSheet'

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
  title: 'Trading / WithdrawSheet',
  component: WithdrawSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [phoneDecorator],
  args: { onClose: fn() },
}

export const Default = {}

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 8, background: 'var(--color-surface-2)', opacity: 1 - i * 0.15 }} />
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--color-teal)', border: 'none', borderRadius: 12,
            padding: '12px 28px', color: '#03110F',
            fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-ui)', cursor: 'pointer',
          }}
        >
          Withdraw
        </button>
        {open && <WithdrawSheet onClose={() => setOpen(false)} />}
      </>
    )
  },
}
