import AssetTable from './AssetTable'
import { portfolioPacks, portfolioCoins, packMiniCoins } from '../../data/mockData'

const decorator = (Story) => (
  <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
    <Story />
  </div>
)

export default {
  title: 'Portfolio / AssetTable',
  component: AssetTable,
  parameters: { layout: 'fullscreen' },
  decorators: [decorator],
}

export const Coins = {
  render: () => <AssetTable assets={portfolioCoins} type="coin" onAction={() => {}} />,
}

export const Packs = {
  render: () => <AssetTable assets={portfolioPacks} type="pack" miniCoins={packMiniCoins} onAction={() => {}} />,
}

export const CoinsAndPacks = {
  render: () => (
    <>
      <div style={{ padding: '12px 12px 4px', fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Coins</div>
      <AssetTable assets={portfolioCoins} type="coin" onAction={() => {}} />
      <div style={{ padding: '20px 12px 4px', fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Packs</div>
      <AssetTable assets={portfolioPacks} type="pack" miniCoins={packMiniCoins} onAction={() => {}} />
    </>
  ),
}
