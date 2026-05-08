import { useState } from 'react'
import CategoryTabs from './CategoryTabs'

export default {
  title: 'Coins / CategoryTabs',
  component: CategoryTabs,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Interactive = {
  render: () => {
    const [active, setActive] = useState('Vetted')
    return <CategoryTabs active={active} onChange={setActive} />
  },
}

export const VettedActive      = { args: { active: 'Vetted',       onChange: () => {} } }
export const TrendingActive    = { args: { active: 'Trending',     onChange: () => {} } }
export const BlueChipsActive   = { args: { active: 'Blue Chips',   onChange: () => {} } }
export const NewListingsActive = { args: { active: 'New Listings', onChange: () => {} } }
