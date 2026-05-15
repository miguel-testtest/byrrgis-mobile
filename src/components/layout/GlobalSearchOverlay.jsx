import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import CoinAvatar from '../ui/CoinAvatar'
import { portfolioCoins, portfolioPacks, coins as marketCoins } from '../../data/mockData'

function PackAvatar({ emoji }) {
  return (
    <div className="asset-av" style={{ width: 36, height: 36, flexShrink: 0 }}>
      <span style={{ fontSize: 18 }}>{emoji}</span>
    </div>
  )
}

export default function GlobalSearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [open])

  const q = query.trim().toLowerCase()

  const portfolioResults = q
    ? [
        ...portfolioCoins.map(c => ({ ...c, _kind: 'coin' })),
        ...portfolioPacks.map(p => ({ ...p, _kind: 'pack' })),
      ].filter(a =>
        a.name.toLowerCase().includes(q) ||
        (a.sub || '').toLowerCase().includes(q)
      )
    : []

  const marketResults = q
    ? marketCoins.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
      )
    : []

  function handleSelect(item, source) {
    if (source === 'portfolio') {
      if (item._kind === 'pack') {
        navigate('/')
      } else {
        navigate(`/coin/${item.symbol.toLowerCase()}`)
      }
    } else {
      navigate(`/coin/${item.id}`)
    }
    onClose()
  }

  const hasResults = portfolioResults.length > 0 || marketResults.length > 0

  return (
    <div className={`srch-overlay${open ? ' open' : ''}`}>
      <div className="srch-topbar">
        <div className="srch-field-wrap">
          <Search size={14} />
          <input
            ref={inputRef}
            className="srch-field"
            placeholder="Search portfolio or any token…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="srch-field-clear" onClick={() => setQuery('')} aria-label="Clear">
              <X size={10} />
            </button>
          )}
        </div>
        <button className="srch-cancel-btn" onClick={onClose}>Cancel</button>
      </div>

      <div className="srch-results">
        {!q && (
          <p className="srch-hint">Search for tokens in your portfolio or the market</p>
        )}

        {q && !hasResults && (
          <p className="srch-empty">No results for "{query}"</p>
        )}

        {portfolioResults.length > 0 && (
          <>
            <div className="srch-section-hdr">Your Portfolio</div>
            <ul className="srch-list">
              {portfolioResults.map(asset => {
                const displayName = asset._kind === 'coin'
                  ? asset.name.split(' / ')[0]
                  : asset.name
                return (
                  <li key={asset.id} className="srch-row" onClick={() => handleSelect(asset, 'portfolio')}>
                    {asset._kind === 'pack'
                      ? <PackAvatar emoji={asset.emoji} />
                      : <CoinAvatar avatarBg={asset.bg} initial={asset.init} chain={asset.chain} symbol={asset.symbol} size={36} />
                    }
                    <div className="srch-row__info">
                      <div className="srch-row__name">{displayName}</div>
                      <div className="srch-row__sub">{asset.val}</div>
                    </div>
                    <span className="srch-portfolio-tag">Portfolio</span>
                  </li>
                )
              })}
            </ul>
          </>
        )}

        {marketResults.length > 0 && (
          <>
            <div className="srch-section-hdr">All Tokens</div>
            <ul className="srch-list">
              {marketResults.map(coin => (
                <li key={coin.id} className="srch-row" onClick={() => handleSelect(coin, 'market')}>
                  <CoinAvatar symbol={coin.symbol} avatarBg={coin.avatarBg} initial={coin.initial} chain={coin.chain} imageUrl={coin.imageUrl} size={36} />
                  <div className="srch-row__info">
                    <div className="srch-row__name">{coin.name}</div>
                    <div className="srch-row__sub">{coin.symbol} · {coin.chain}</div>
                  </div>
                  <div className="srch-row__price">
                    <div className="tcell__primary">{coin.price}</div>
                    <div className={`tcell__secondary ${coin.pos ? 'pos' : 'neg'}`}>{coin.change}</div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
