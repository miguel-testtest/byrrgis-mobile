import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { IconChainSolana, IconChainEthereum } from '../ui/Icons'

function PackAvatar({ emoji }) {
  return (
    <div className="asset-av">
      <span style={{ fontSize: 22 }}>{emoji}</span>
    </div>
  )
}

function CoinAvatar({ bg, init, chain }) {
  const ChainIcon = chain === 'Solana' ? IconChainSolana : IconChainEthereum
  return (
    <div className="asset-av round" style={{ background: bg }}>
      {init}
      <div className="asset-chain-dot"><ChainIcon /></div>
    </div>
  )
}

function getDisplayName(asset) {
  if (asset._type !== 'coin') return { name: asset.name, sub: asset.sub }
  const slash = asset.name.indexOf(' / ')
  if (slash === -1) return { name: asset.name, sub: asset.sub }
  const symbol  = asset.name.slice(0, slash)
  const network = asset.name.slice(slash + 3)
  return { name: symbol, sub: `${network} · ${asset.sub}` }
}

export default function PortfolioSearchOverlay({ open, onClose, onSelectAsset, packs, coins }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const all = [
    ...packs.map(p => ({ ...p, _type: 'pack' })),
    ...coins.map(c => ({ ...c, _type: 'coin' })),
  ]
  const results = q
    ? all.filter(a => a.name.toLowerCase().includes(q) || a.sub.toLowerCase().includes(q))
    : all

  return (
    <div className={`srch-overlay${open ? ' open' : ''}`}>
      <div className="srch-topbar">
        <div className="srch-field-wrap">
          <Search size={14} />
          <input
            ref={inputRef}
            className="srch-field"
            placeholder="Search assets..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="srch-field-clear" onClick={() => setQuery('')} aria-label="Clear">
              <X size={10} />
            </button>
          )}
        </div>
        <button className="srch-cancel-btn" onClick={onClose} aria-label="Close search">
          <X size={16} />
        </button>
      </div>

      <div className="srch-results">
        {results.length === 0 ? (
          <p className="srch-empty">No results for "{query}"</p>
        ) : (
          <ul className="srch-list">
            {results.map(asset => {
              const { name, sub } = getDisplayName(asset)
              return (
                <li key={asset.id} className="srch-row" onClick={() => onSelectAsset(asset.id, asset._type)}>
                  {asset._type === 'pack'
                    ? <PackAvatar emoji={asset.emoji} />
                    : <CoinAvatar bg={asset.bg} init={asset.init} chain={asset.chain} />
                  }
                  <div className="asset-info">
                    <div className="asset-name">{name}</div>
                    <div className="asset-sub">{sub}</div>
                  </div>
                  <span className="srch-row__icon">
                    <Search size={14} />
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
