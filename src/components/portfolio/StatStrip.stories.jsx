import StatStrip from './StatStrip'
import { portfolioStats } from '../../data/mockData'

export default {
  title: 'Portfolio / StatStrip',
  component: StatStrip,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', paddingTop: 8 }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: { stats: portfolioStats },
}

export const AllNegative = {
  args: {
    stats: {
      ...portfolioStats,
      unrealisedPnl: '-$140.50',
      unrealisedPnlPct: '-4.2%',
      unrealisedPos: false,
      realisedPnl: '-$88.00',
      realisedPnlPct: '-2.7%',
      realisedPos: false,
      totalGain: '-$1,200',
      totalGainPct: '-3.1%',
      totalGainPos: false,
    },
  },
}

export const NoTriggers = {
  args: {
    stats: {
      ...portfolioStats,
      activeTriggers: 0,
      tpCount: 0,
      slCount: 0,
    },
  },
}
