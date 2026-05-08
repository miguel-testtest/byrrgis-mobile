import HoldingRow from './HoldingRow'
import { holdings } from '../../data/mockData'

export default {
  title: 'Portfolio / HoldingRow',
  component: HoldingRow,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const AAVE    = { args: { holding: holdings[0] } }
export const BONK    = { args: { holding: holdings[1] } }
export const RAY     = { args: { holding: holdings[2] } }
export const UNI     = { args: { holding: holdings[3] } }

export const AllHoldings = {
  render: () => (
    <div>
      {holdings.map(h => <HoldingRow key={h.id} holding={h} />)}
    </div>
  ),
}
