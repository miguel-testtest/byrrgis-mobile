import AllocationSection from './AllocationSection'
import { holdings } from '../../data/mockData'

export default {
  title: 'Portfolio / AllocationSection',
  component: AllocationSection,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: { holdings },
}

export const TwoAssets = {
  args: {
    holdings: [
      { id: 'aave', symbol: 'AAVE', alloc: 70, allocColor: '#B6509E' },
      { id: 'uni',  symbol: 'UNI',  alloc: 30, allocColor: '#FF007A' },
    ],
  },
}
