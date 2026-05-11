import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/layout/PageHeader'
import { IconSearch, IconUserCircle } from '../components/ui/Icons'
import StatStrip from '../components/portfolio/StatStrip'
import PortfolioSubTabs from '../components/portfolio/PortfolioSubTabs'
import AssetItem from '../components/portfolio/AssetItem'
import AssetActionSheet from '../components/portfolio/AssetActionSheet'
import { portfolioStats, portfolioPacks, portfolioCoins, packMiniCoins, performanceDays, performanceMeta } from '../data/mockData'
import PerformanceCalendar from '../components/portfolio/PerformanceCalendar'

export default function PortfolioPage() {
  const [activeTab, setActiveTab]   = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [sheet, setSheet]           = useState(null)

  function handleToggle(id) {
    setExpandedId(prev => (prev === id ? null : id))
    setSheet(null)
  }

  function handleAction(id, type, tab) {
    setSheet({ id, type, tab })
  }

  function handleTabChange(tab) {
    setActiveTab(tab)
    setExpandedId(null)
    setSheet(null)
  }

  const packItems = portfolioPacks.map(p => (
    <AssetItem
      key={p.id}
      asset={p}
      type="pack"
      miniCoins={packMiniCoins}
      expandedId={expandedId}
      onToggle={handleToggle}
      onAction={handleAction}
    />
  ))

  const coinItems = portfolioCoins.map(c => (
    <AssetItem
      key={c.id}
      asset={c}
      type="coin"
      expandedId={expandedId}
      onToggle={handleToggle}
      onAction={handleAction}
    />
  ))

  return (
    <AppShell>
      <PageHeader
        title="My Portfolio"
        actions={
          <>
            <button className="header-icon-btn" aria-label="Search">
              <IconSearch size={20} />
            </button>
            <button className="header-icon-btn" aria-label="Profile">
              <IconUserCircle size={20} />
            </button>
          </>
        }
      />

      <StatStrip stats={portfolioStats} />

      <PortfolioSubTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        packCount={portfolioPacks.length}
        coinCount={portfolioCoins.length}
      />

      {activeTab === 'all' && (
        <>
          <div className="port-section-hdr">Packs</div>
          <div className="asset-list">{packItems}</div>
          <div className="port-section-hdr">Coins</div>
          <div className="asset-list">{coinItems}</div>
        </>
      )}

      {activeTab === 'packs' && (
        <>
          <div className="port-section-hdr">Packs ({portfolioPacks.length})</div>
          <div className="asset-list">{packItems}</div>
        </>
      )}

      {activeTab === 'coins' && (
        <>
          <div className="port-section-hdr">Coins ({portfolioCoins.length})</div>
          <div className="asset-list">{coinItems}</div>
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
        packs={portfolioPacks}
        coins={portfolioCoins}
        onClose={() => setSheet(null)}
      />
    </AppShell>
  )
}
