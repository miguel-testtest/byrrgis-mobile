import { useState, useMemo } from 'react'
import AppShell from '../components/layout/AppShell'
import StatStrip from '../components/portfolio/StatStrip'
import PortfolioSubTabs from '../components/portfolio/PortfolioSubTabs'
import AssetTable from '../components/portfolio/AssetTable'
import AssetActionSheet from '../components/portfolio/AssetActionSheet'
import { portfolioStats, portfolioPacks, portfolioCoins, packMiniCoins, performanceDays, performanceMeta } from '../data/mockData'
import PerformanceCalendar from '../components/portfolio/PerformanceCalendar'

function parseNum(str) {
  if (typeof str === 'number') return str
  const s = String(str).replace(/[$,%+ ]/g, '').replace(/,/g, '')
  const suffix = s.slice(-1).toUpperCase()
  const n = parseFloat(s)
  if (suffix === 'B') return n * 1e9
  if (suffix === 'M') return n * 1e6
  if (suffix === 'K') return n * 1e3
  return isNaN(n) ? 0 : n
}

function fmtUSD(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function buildAggregate(assets, type) {
  let cur = 0, inv = 0, pnl = 0
  assets.forEach(a => {
    cur += parseNum(a.stats?.cur ?? a.val)
    inv += parseNum(a.stats?.inv ?? '0')
    pnl += parseNum(a.stats?.pnl ?? '0')
  })
  const pnlPct = inv > 0 ? (pnl / inv) * 100 : 0
  const sign = n => n >= 0 ? '+' : '-'
  return {
    id: `all-${type}`,
    name: type === 'coin' ? 'All Coins' : 'All Packs',
    emoji: type === 'coin' ? '🪙' : '📦',
    symbol: type === 'coin' ? 'COINS' : 'PACKS',
    val: fmtUSD(cur),
    stats: {
      cur: fmtUSD(cur),
      inv: fmtUSD(inv),
      pnl: `${sign(pnl)}${fmtUSD(pnl)}`,
      pnlPct: `${sign(pnl)}${Math.abs(pnlPct).toFixed(2)}%`,
      pnlPos: pnl >= 0,
    },
  }
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [sheet, setSheet]         = useState(null)

  const allCoinsAgg = useMemo(() => buildAggregate(portfolioCoins, 'coin'), [])
  const allPacksAgg = useMemo(() => buildAggregate(portfolioPacks, 'pack'), [])

  const augmentedCoins = useMemo(() => [allCoinsAgg, ...portfolioCoins], [allCoinsAgg])
  const augmentedPacks = useMemo(() => [allPacksAgg, ...portfolioPacks], [allPacksAgg])

  function handleAction(id, type, tab) {
    setSheet({ id, type, tab })
  }

  function handleTabChange(tab) {
    setActiveTab(tab)
    setSheet(null)
  }

  return (
    <AppShell>
      <StatStrip stats={portfolioStats} />

      <PortfolioSubTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        packCount={portfolioPacks.length}
        coinCount={portfolioCoins.length}
      />

      {activeTab === 'all' && (
        <>
          <div className="port-section-hdr">Coins</div>
          <AssetTable assets={portfolioCoins} type="coin" onAction={handleAction} />
          <div className="port-section-hdr">Packs</div>
          <AssetTable assets={portfolioPacks} type="pack" miniCoins={packMiniCoins} onAction={handleAction} />
        </>
      )}

      {activeTab === 'packs' && (
        <>
          <div className="port-section-hdr">Packs ({portfolioPacks.length})</div>
          <AssetTable assets={portfolioPacks} type="pack" miniCoins={packMiniCoins} onAction={handleAction} />
        </>
      )}

      {activeTab === 'coins' && (
        <>
          <div className="port-section-hdr">Coins ({portfolioCoins.length})</div>
          <AssetTable assets={portfolioCoins} type="coin" onAction={handleAction} />
        </>
      )}

      {activeTab === 'performance' && (
        <PerformanceCalendar
          year={performanceMeta.year}
          month={performanceMeta.month}
          days={performanceDays}
          meta={performanceMeta}
        />
      )}

      <AssetActionSheet
        sheet={sheet}
        packs={augmentedPacks}
        coins={augmentedCoins}
        miniCoins={packMiniCoins}
        onClose={() => setSheet(null)}
      />
    </AppShell>
  )
}
