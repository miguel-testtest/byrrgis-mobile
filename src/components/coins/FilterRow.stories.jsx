import { useState } from 'react'
import FilterRow from './FilterRow'
import FilterBottomSheet from './FilterBottomSheet'

const NETWORKS = ['All networks', 'Ethereum', 'Solana']
const TIME_OPTS = ['1h', '24h', '7D', '30D']

export default {
  title: 'Coins / FilterRow',
  component: FilterRow,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', position: 'relative', height: 500, overflow: 'hidden', transform: 'translateZ(0)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Interactive = {
  render: () => {
    const [network, setNetwork] = useState('All networks')
    const [time, setTime]       = useState('24h')
    const [sheet, setSheet]     = useState(null)
    return (
      <>
        <FilterRow
          network={network}
          time={time}
          onNetworkOpen={() => setSheet('network')}
          onTimeOpen={() => setSheet('time')}
        />
        <FilterBottomSheet
          open={sheet === 'network'}
          onClose={() => setSheet(null)}
          title="Network"
          options={NETWORKS}
          value={network}
          onChange={setNetwork}
        />
        <FilterBottomSheet
          open={sheet === 'time'}
          onClose={() => setSheet(null)}
          title="Time period"
          options={TIME_OPTS}
          value={time}
          onChange={setTime}
        />
      </>
    )
  },
}

export const AllNetworks = {
  args: { network: 'All networks', time: '24h', onNetworkOpen: () => {}, onTimeOpen: () => {} },
}
export const EthereumOnly = {
  args: { network: 'Ethereum', time: '7D', onNetworkOpen: () => {}, onTimeOpen: () => {} },
}
