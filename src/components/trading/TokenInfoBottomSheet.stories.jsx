import { useState } from 'react'
import TokenInfoBottomSheet from './TokenInfoBottomSheet'
import { aaveDetail } from '../../data/mockData'

export default {
  title: 'Trading / TokenInfoBottomSheet',
  component: TokenInfoBottomSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', height: 932, position: 'relative', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const Open = {
  args: { open: true, onClose: () => {}, coin: aaveDetail },
}

export const Closed = {
  args: { open: false, onClose: () => {}, coin: aaveDetail },
}

export const LowRisk = {
  args: {
    open: true,
    onClose: () => {},
    coin: {
      ...aaveDetail,
      riskScore: 18,
      riskLabel: 'Low',
      techScore: 92,
      socialScore: 88,
    },
  },
}

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
            padding: '8px 24px', background: 'var(--color-teal)', color: 'var(--color-bg)',
            border: 'none', borderRadius: 'var(--r-full)', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Token Info
        </button>
        <TokenInfoBottomSheet open={open} onClose={() => setOpen(false)} coin={aaveDetail} />
      </>
    )
  },
}
