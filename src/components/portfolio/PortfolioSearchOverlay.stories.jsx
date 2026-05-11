import { useState } from 'react'
import PortfolioSearchOverlay from './PortfolioSearchOverlay'
import { portfolioPacks, portfolioCoins } from '../../data/mockData'

export default {
  title: 'Portfolio/PortfolioSearchOverlay',
  component: PortfolioSearchOverlay,
  parameters: { layout: 'fullscreen' },
}

function Controlled({ initialOpen = true }) {
  const [open, setOpen] = useState(initialOpen)
  return (
    <div style={{ position: 'relative', width: 430, height: 844, background: '#050A0A', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(true)}
        style={{ position: 'absolute', top: 60, right: 16, background: '#1C3432', color: '#EEF0F5', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}
      >
        Open Search
      </button>
      <PortfolioSearchOverlay
        open={open}
        onClose={() => setOpen(false)}
        packs={portfolioPacks}
        coins={portfolioCoins}
      />
    </div>
  )
}

export const Default = { render: () => <Controlled initialOpen={true} /> }
export const Closed  = { render: () => <Controlled initialOpen={false} /> }
