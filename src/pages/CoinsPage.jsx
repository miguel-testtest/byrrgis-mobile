import { useState, useMemo } from 'react'
import AppShell from '../components/layout/AppShell'
import CategoryTabs from '../components/coins/CategoryTabs'
import FilterRow from '../components/coins/FilterRow'
import FilterBottomSheet from '../components/coins/FilterBottomSheet'
import CoinsTable from '../components/coins/CoinsTable'
import NewListingsCard from '../components/coins/NewListingsCard'
import NewListingsToolbar from '../components/coins/NewListingsToolbar'
import { coins, newListings } from '../data/mockData'

const NETWORKS = ['All networks', 'Ethereum', 'Solana']
const TIME_OPTS = ['1h', '24h', '7D', '30D']
const NL_CHAINS = ['BNB', 'ETH', 'SOL']

export default function CoinsPage() {
  const [category, setCategory] = useState('Vetted')
  const [network, setNetwork]   = useState('All networks')
  const [time, setTime]         = useState('24h')
  const [sheet, setSheet]       = useState(null)

  // New Listings sub-state
  const [nlSubTab, setNlSubTab] = useState('New pairs')
  const [nlChain, setNlChain]   = useState('BNB')
  const [nlSearch, setNlSearch] = useState('')

  const filtered = useMemo(() => {
    if (network === 'All networks') return coins
    return coins.filter(c => c.chain === network)
  }, [network])

  const filteredNewListings = useMemo(() => {
    if (!nlSearch) return newListings
    const q = nlSearch.toLowerCase()
    return newListings.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    )
  }, [nlSearch])

  const isNewListings = category === 'New Listings'

  return (
    <AppShell>
      <CategoryTabs active={category} onChange={setCategory} />

      {isNewListings ? (
        <>
          <NewListingsToolbar
            subTab={nlSubTab}
            onSubTabChange={setNlSubTab}
            chain={nlChain}
            onChainOpen={() => setSheet('nlChain')}
            search={nlSearch}
            onSearchChange={setNlSearch}
            onFilterOpen={() => setSheet('nlFilter')}
          />
          <div className="nl-list">
            {filteredNewListings.map(coin => (
              <NewListingsCard key={coin.id} coin={coin} />
            ))}
          </div>
        </>
      ) : (
        <>
          <FilterRow
            network={network}
            time={time}
            onNetworkOpen={() => setSheet('network')}
            onTimeOpen={() => setSheet('time')}
          />
          <CoinsTable coins={filtered} />
        </>
      )}

      <FilterBottomSheet
        open={sheet === 'network'}
        onClose={() => setSheet(null)}
        title="Network"
        options={NETWORKS}
        value={network}
        onChange={setNetwork}
      />
      <FilterBottomSheet
        open={sheet === 'time'}
        onClose={() => setSheet(null)}
        title="Time period"
        options={TIME_OPTS}
        value={time}
        onChange={setTime}
      />
      <FilterBottomSheet
        open={sheet === 'nlChain'}
        onClose={() => setSheet(null)}
        title="Chain"
        options={NL_CHAINS}
        value={nlChain}
        onChange={setNlChain}
      />
    </AppShell>
  )
}
