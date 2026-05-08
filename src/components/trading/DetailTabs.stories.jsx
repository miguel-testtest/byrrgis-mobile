import { useState } from 'react'
import DetailTabs from './DetailTabs'

export default {
  title: 'Trading / DetailTabs',
  component: DetailTabs,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Trade = { args: { active: 'Trade', onChange: () => {} } }
export const Transactions = { args: { active: 'Transactions', onChange: () => {} } }
export const Tables = { args: { active: 'Tables', onChange: () => {} } }

export const Interactive = {
  render: () => {
    const [active, setActive] = useState('Trade')
    return <DetailTabs active={active} onChange={setActive} />
  },
}
