import CoinsTable from './CoinsTable'
import { coins } from '../../data/mockData'

export default {
  title: 'Coins / CoinsTable',
  component: CoinsTable,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', overflowX: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const AllCoins = {
  args: { coins },
}

export const EthereumOnly = {
  args: { coins: coins.filter(c => c.chain === 'Ethereum') },
}

export const SolanaOnly = {
  args: { coins: coins.filter(c => c.chain === 'Solana') },
}

export const Empty = {
  args: { coins: [] },
}
