import { useState } from 'react'
import PortfolioSubTabs from './PortfolioSubTabs'

export default {
  title: 'Portfolio / PortfolioSubTabs',
  component: PortfolioSubTabs,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

function Controlled({ initialTab = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  return (
    <PortfolioSubTabs
      activeTab={activeTab}
      onTabChange={setActiveTab}
      packCount={5}
      coinCount={8}
    />
  )
}

export const All         = { render: () => <Controlled initialTab="all" /> }
export const Packs       = { render: () => <Controlled initialTab="packs" /> }
export const Coins       = { render: () => <Controlled initialTab="coins" /> }
export const Performance = { render: () => <Controlled initialTab="performance" /> }
