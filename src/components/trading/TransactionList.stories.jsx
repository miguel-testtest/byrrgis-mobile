import TransactionList from './TransactionList'
import { aaveDetail } from '../../data/mockData'

export default {
  title: 'Trading / TransactionList',
  component: TransactionList,
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
  args: { transactions: aaveDetail.transactions },
}

export const BuysOnly = {
  args: { transactions: aaveDetail.transactions.filter(t => t.type === 'buy') },
}

export const SellsOnly = {
  args: { transactions: aaveDetail.transactions.filter(t => t.type === 'sell') },
}
