import DetailHeader from './DetailHeader'
import { aaveDetail } from '../../data/mockData'

export default {
  title: 'Trading / DetailHeader',
  component: DetailHeader,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const AAVE = {
  args: { coin: aaveDetail },
}

export const NegativeChange = {
  args: {
    coin: {
      ...aaveDetail,
      price: '$3.90',
      change: '-3.00%',
      changeDollar: '-$0.12 (3,00%)',
      pos: false,
      symbol: 'TRUMP',
      name: 'OFFICIAL TRUMP',
      chain: 'SOL',
      avatarBg: '#B8860B',
      initial: 'T',
      riskScore: 58,
      riskLabel: 'Med',
      vol: '$210M',
      volChange: '-22,3%',
      volPos: false,
    },
  },
}
