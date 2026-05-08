import { useState } from 'react'
import TimeSelector from './TimeSelector'

export default {
  title: 'Trading / TimeSelector',
  component: TimeSelector,
  parameters: { layout: 'padded' },
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
    const [active, setActive] = useState('1D')
    return <TimeSelector active={active} onChange={setActive} />
  },
}

export const DaySelected   = { args: { active: '1D', onChange: () => {} } }
export const HourSelected  = { args: { active: '1h', onChange: () => {} } }
export const WeekSelected  = { args: { active: '1W', onChange: () => {} } }
