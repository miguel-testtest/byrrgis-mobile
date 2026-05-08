import AssetExpand from './AssetExpand'
import { portfolioPacks, portfolioCoins, packMiniCoins } from '../../data/mockData'

export default {
  title: 'Portfolio / AssetExpand',
  component: AssetExpand,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const PackExpanded = {
  render: () => (
    <AssetExpand
      asset={portfolioPacks[0]}
      type="pack"
      miniCoins={packMiniCoins}
      onAction={() => {}}
    />
  ),
}

export const PackNegative = {
  render: () => (
    <AssetExpand
      asset={portfolioPacks[4]}
      type="pack"
      miniCoins={packMiniCoins}
      onAction={() => {}}
    />
  ),
}

export const CoinExpanded = {
  render: () => (
    <AssetExpand
      asset={portfolioCoins[0]}
      type="coin"
      miniCoins={[]}
      onAction={() => {}}
    />
  ),
}

export const CoinNegative = {
  render: () => (
    <AssetExpand
      asset={portfolioCoins[1]}
      type="coin"
      miniCoins={[]}
      onAction={() => {}}
    />
  ),
}
