import { useState } from 'react'
import NewListingsToolbar from './NewListingsToolbar'

export default {
  title: 'Coins / NewListingsToolbar',
  component: NewListingsToolbar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: {
    subTab: 'New pairs',
    onSubTabChange: () => {},
    chain: 'SOL',
    onChainOpen: () => {},
    search: '',
    onSearchChange: () => {},
    onFilterOpen: () => {},
  },
}

export const FinalStretch = {
  args: {
    subTab: 'Final Stretch',
    onSubTabChange: () => {},
    chain: 'ETH',
    onChainOpen: () => {},
    search: '',
    onSearchChange: () => {},
    onFilterOpen: () => {},
  },
}

export const Migrated = {
  args: {
    subTab: 'Migrated',
    onSubTabChange: () => {},
    chain: 'BNB',
    onChainOpen: () => {},
    search: '',
    onSearchChange: () => {},
    onFilterOpen: () => {},
  },
}

export const WithSearch = {
  args: {
    subTab: 'New pairs',
    onSubTabChange: () => {},
    chain: 'SOL',
    onChainOpen: () => {},
    search: 'bonk',
    onSearchChange: () => {},
    onFilterOpen: () => {},
  },
}

export const Interactive = {
  render: () => {
    const [subTab, setSubTab] = useState('New pairs')
    const [chain, setChain] = useState('SOL')
    const [search, setSearch] = useState('')
    return (
      <NewListingsToolbar
        subTab={subTab}
        onSubTabChange={setSubTab}
        chain={chain}
        onChainOpen={() => setChain(c => c === 'SOL' ? 'ETH' : c === 'ETH' ? 'BNB' : 'SOL')}
        search={search}
        onSearchChange={setSearch}
        onFilterOpen={() => {}}
      />
    )
  },
}
