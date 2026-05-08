import { useState } from 'react'
import FilterBottomSheet from './FilterBottomSheet'

const NETWORKS = ['All networks', 'Ethereum', 'Solana', 'BNB Chain']
const TIMEFRAMES = ['1h', '4h', '24h', '7D', '30D']

export default {
  title: 'Coins / FilterBottomSheet',
  component: FilterBottomSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', height: 600, position: 'relative', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const OpenNetworks = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Network',
    options: NETWORKS,
    value: 'All networks',
    onChange: () => {},
  },
}

export const OpenTimeframe = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Time period',
    options: TIMEFRAMES,
    value: '24h',
    onChange: () => {},
  },
}

export const Closed = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Network',
    options: NETWORKS,
    value: 'Ethereum',
    onChange: () => {},
  },
}

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('All networks')
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
          Open filter ({value})
        </button>
        <FilterBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Network"
          options={NETWORKS}
          value={value}
          onChange={setValue}
        />
      </>
    )
  },
}
