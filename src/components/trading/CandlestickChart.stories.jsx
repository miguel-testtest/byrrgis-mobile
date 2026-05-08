import CandlestickChart from './CandlestickChart'
import { aaveDetail } from '../../data/mockData'

export default {
  title: 'Trading / CandlestickChart',
  component: CandlestickChart,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: {
    candles: aaveDetail.candles,
    currentPrice: '169.42',
  },
}
