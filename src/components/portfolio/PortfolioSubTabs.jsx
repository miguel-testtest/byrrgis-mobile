export default function PortfolioSubTabs({ activeTab, onTabChange, packCount, coinCount }) {
  const tabs = [
    { id: 'all',         label: `All Assets (${packCount + coinCount})` },
    { id: 'coins',       label: `Coins (${coinCount})` },
    { id: 'packs',       label: `Packs (${packCount})` },
    { id: 'performance', label: 'Performance' },
  ]

  return (
    <div className="port-sub-tabs">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`port-sub-tab${activeTab === t.id ? ' active' : ''}`}
          onClick={() => onTabChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
