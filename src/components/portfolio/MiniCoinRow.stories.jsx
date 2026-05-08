import MiniCoinRow from './MiniCoinRow'
import { packMiniCoins } from '../../data/mockData'

export default {
  title: 'Portfolio / MiniCoinRow',
  component: MiniCoinRow,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', padding: '0 16px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Positive = {
  render: () => <MiniCoinRow coin={packMiniCoins[0]} />,
}

export const Negative = {
  render: () => <MiniCoinRow coin={packMiniCoins[1]} />,
}

export const AllCoins = {
  render: () => (
    <>
      {packMiniCoins.map((coin, i) => (
        <MiniCoinRow key={i} coin={coin} />
      ))}
    </>
  ),
}
