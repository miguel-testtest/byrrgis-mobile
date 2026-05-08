import { useState } from 'react'
import AssetActionSheet from './AssetActionSheet'
import { portfolioPacks, portfolioCoins } from '../../data/mockData'

export default {
  title: 'Portfolio / AssetActionSheet',
  component: AssetActionSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, height: '100dvh', background: 'var(--color-bg)', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

function SheetWrapper({ initialSheet }) {
  const [sheet, setSheet] = useState(initialSheet)
  return (
    <AssetActionSheet
      sheet={sheet}
      packs={portfolioPacks}
      coins={portfolioCoins}
      onClose={() => setSheet(null)}
    />
  )
}

export const SellCoin = {
  render: () => (
    <SheetWrapper initialSheet={{ id: 'btc-p', type: 'coin', tab: 'sell' }} />
  ),
}

export const AutosellCoin = {
  render: () => (
    <SheetWrapper initialSheet={{ id: 'link-p', type: 'coin', tab: 'autosell' }} />
  ),
}

export const SellPack = {
  render: () => (
    <SheetWrapper initialSheet={{ id: 'astroverse', type: 'pack', tab: 'sell' }} />
  ),
}

export const AutosellPack = {
  render: () => (
    <SheetWrapper initialSheet={{ id: 'defi-blue', type: 'pack', tab: 'autosell' }} />
  ),
}

export const Closed = {
  render: () => (
    <SheetWrapper initialSheet={null} />
  ),
}
