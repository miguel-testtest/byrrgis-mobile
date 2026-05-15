import { useState } from 'react'
import { fn } from '@storybook/test'
import GlobalSearchOverlay from './GlobalSearchOverlay'

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
  title: 'Layout / GlobalSearchOverlay',
  component: GlobalSearchOverlay,
  parameters: { layout: 'fullscreen' },
  decorators: [phoneDecorator],
  args: { open: true, onClose: fn() },
}

export const Default = {}

export const Closed = {
  args: { open: false },
}

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 8, background: 'var(--color-surface-2)', opacity: 1 - i * 0.12 }} />
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
            borderRadius: 8, padding: '8px 14px',
            color: 'var(--text-muted)', fontSize: 13,
            fontFamily: 'var(--font-ui)', cursor: 'pointer',
          }}
        >
          Open search
        </button>
        <GlobalSearchOverlay open={open} onClose={() => setOpen(false)} />
      </>
    )
  },
}
