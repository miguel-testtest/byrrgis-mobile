import { useState } from 'react'
import AdvancedSheet from './AdvancedSheet'

export default {
  title: 'Trading / AdvancedSheet',
  component: AdvancedSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', height: 600, position: 'relative', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const Open = {
  args: { open: true, onClose: () => {} },
}

export const Closed = {
  args: { open: false, onClose: () => {} },
}

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            padding: '8px 24px', background: 'var(--color-teal)', color: 'var(--color-bg)',
            border: 'none', borderRadius: 'var(--r-full)', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Open sheet
        </button>
        <AdvancedSheet open={open} onClose={() => setOpen(false)} />
      </>
    )
  },
}
