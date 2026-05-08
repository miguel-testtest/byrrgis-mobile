import { IconChevronDown, IconFilters, IconSearch, IconChainBNB, IconChainEthereum, IconChainSolana } from '../ui/Icons'

const SUB_TABS = ['New pairs', 'Final Stretch', 'Migrated']

const CHAIN_ICONS = {
  BNB: IconChainBNB,
  ETH: IconChainEthereum,
  SOL: IconChainSolana,
}

function ChainIcon({ chain }) {
  const Icon = CHAIN_ICONS[chain] || IconChainBNB
  return <Icon size={18} />
}

export default function NewListingsToolbar({
  subTab, onSubTabChange,
  chain, onChainOpen,
  search, onSearchChange,
  onFilterOpen,
}) {
  return (
    <div className="nl-toolbar">
      <div className="nl-toolbar__top">
        <div className="nl-subtabs">
          {SUB_TABS.map(tab => (
            <button
              key={tab}
              className={`nl-subtab${subTab === tab ? ' active' : ''}`}
              onClick={() => onSubTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="nl-chain-select" onClick={onChainOpen} aria-label="Select chain">
          <ChainIcon chain={chain} />
          <span>{chain}</span>
          <IconChevronDown size={14} />
        </button>
      </div>
      <div className="nl-toolbar__search">
        <div className="nl-searchbar">
          <IconSearch size={16} />
          <input
            type="text"
            placeholder="Search by token or name"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
        <button className="nl-filter-btn" onClick={onFilterOpen} aria-label="Filters">
          <IconFilters size={16} />
        </button>
      </div>
    </div>
  )
}
