import AssetTable from './AssetTable'
import { portfolioPacks, portfolioCoins, packMiniCoins } from '../../data/mockData'

// AssetItem renders <tr> fragments — always preview it through AssetTable.
// See Portfolio / AssetTable for the full table stories.

const decorator = (Story) => (
  <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
    <Story />
  </div>
)

export default {
  title: 'Portfolio / AssetItem',
  parameters: { layout: 'fullscreen' },
  decorators: [decorator],
}

export const SingleCoin = {
  render: () => <AssetTable assets={[portfolioCoins[0]]} type="coin" onAction={() => {}} />,
}

export const SinglePack = {
  render: () => <AssetTable assets={[portfolioPacks[0]]} type="pack" miniCoins={packMiniCoins} onAction={() => {}} />,
}

export const AllCoins = {
  render: () => <AssetTable assets={portfolioCoins} type="coin" onAction={() => {}} />,
}

export const AllPacks = {
  render: () => <AssetTable assets={portfolioPacks} type="pack" miniCoins={packMiniCoins} onAction={() => {}} />,
}
