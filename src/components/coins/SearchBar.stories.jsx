import { useState } from 'react'
import SearchBar from './SearchBar'

export default {
  title: 'Coins / SearchBar',
  component: SearchBar,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Empty = {
  render: () => {
    const [v, setV] = useState('')
    return <SearchBar value={v} onChange={setV} />
  },
}

export const WithQuery = {
  render: () => {
    const [v, setV] = useState('aave')
    return <SearchBar value={v} onChange={setV} />
  },
}
