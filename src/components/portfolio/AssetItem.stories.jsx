import { useState } from 'react'
import AssetItem from './AssetItem'
import { portfolioPacks, portfolioCoins, packMiniCoins } from '../../data/mockData'

const decorator = (Story) => (
  <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
    <div className="asset-list">
      <Story />
    </div>
  </div>
)

export default {
  title: 'Portfolio / AssetItem',
  component: AssetItem,
  parameters: { layout: 'fullscreen' },
  decorators: [decorator],
}

function Controlled({ asset, type, miniCoins }) {
  const [expandedId, setExpandedId] = useState(null)
  const [sheet, setSheet] = useState(null)
  return (
    <AssetItem
      asset={asset}
      type={type}
      miniCoins={miniCoins}
      expandedId={expandedId}
      onToggle={id => setExpandedId(prev => prev === id ? null : id)}
      onAction={(id, t, tab) => setSheet({ id, type: t, tab })}
    />
  )
}

export const Pack = {
  render: () => <Controlled asset={portfolioPacks[0]} type="pack" miniCoins={packMiniCoins} />,
}

export const PackNoTpSl = {
  render: () => <Controlled asset={portfolioPacks[1]} type="pack" miniCoins={packMiniCoins} />,
}

export const PackNegative = {
  render: () => <Controlled asset={portfolioPacks[4]} type="pack" miniCoins={packMiniCoins} />,
}

export const Coin = {
  render: () => <Controlled asset={portfolioCoins[0]} type="coin" miniCoins={[]} />,
}

export const CoinEthereum = {
  render: () => <Controlled asset={portfolioCoins[3]} type="coin" miniCoins={[]} />,
}

export const AllPacks = {
  render: () => {
    const [expandedId, setExpandedId] = useState(null)
    return (
      <>
        {portfolioPacks.map(p => (
          <AssetItem
            key={p.id}
            asset={p}
            type="pack"
            miniCoins={packMiniCoins}
            expandedId={expandedId}
            onToggle={id => setExpandedId(prev => prev === id ? null : id)}
            onAction={() => {}}
          />
        ))}
      </>
    )
  },
}

export const AllCoins = {
  render: () => {
    const [expandedId, setExpandedId] = useState(null)
    return (
      <>
        {portfolioCoins.map(c => (
          <AssetItem
            key={c.id}
            asset={c}
            type="coin"
            expandedId={expandedId}
            onToggle={id => setExpandedId(prev => prev === id ? null : id)}
            onAction={() => {}}
          />
        ))}
      </>
    )
  },
}
