import NewListingsCard from './NewListingsCard'
import { newListings } from '../../data/mockData'

const [chainlink, solpill, degen, mooncat] = newListings

export default {
  title: 'Coins / NewListingsCard',
  component: NewListingsCard,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', padding: '12px 16px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: { coin: chainlink },
}

export const HighRisk = {
  args: { coin: degen },
}

export const MidRisk = {
  args: { coin: solpill },
}

export const LowRisk = {
  args: { coin: mooncat },
}

export const FullList = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {newListings.map(coin => (
        <NewListingsCard key={coin.id} coin={coin} />
      ))}
    </div>
  ),
}

