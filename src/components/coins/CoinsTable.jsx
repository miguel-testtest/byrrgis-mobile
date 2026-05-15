import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CoinAvatar from '../ui/CoinAvatar'
import ScoreBadge from '../ui/ScoreBadge'
import BuySellBar from '../ui/BuySellBar'
import Sparkline from '../ui/Sparkline'
import { IconChevronUp, IconChevronDown, IconSort, IconLock } from '../ui/Icons'

// Converts "$2.5B", "124K", "+2.14%", "$0.001" → number
function parseNum(str) {
  if (typeof str === 'number') return str
  const s = String(str).replace(/[$,%+,]/g, '')
  const suffix = s.slice(-1).toUpperCase()
  const n = parseFloat(s)
  if (suffix === 'B') return n * 1e9
  if (suffix === 'M') return n * 1e6
  if (suffix === 'K') return n * 1e3
  return isNaN(n) ? 0 : n
}

const SORT_ACCESSORS = {
  token:   c => c.name.toLowerCase(),
  score:   c => c.score,
  price:   c => parseNum(c.price),
  mcap:    c => parseNum(c.mcap),
  liq:     c => parseNum(c.liq),
  holders: c => parseNum(c.holders),
  vol:     c => parseNum(c.vol),
}

function SortHeader({ label, colKey, sortKey, sortDir, onSort }) {
  const active = sortKey === colKey
  return (
    <button
      className={`th-inner${active ? ' active' : ''}`}
      onClick={() => onSort(colKey)}
      aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      {label}
      {active
        ? sortDir === 'asc' ? <IconChevronUp size={12} /> : <IconChevronDown size={12} />
        : <IconSort />
      }
    </button>
  )
}

export default function CoinsTable({ coins }) {
  const navigate = useNavigate()
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('desc')

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey) return coins
    const accessor = SORT_ACCESSORS[sortKey]
    return [...coins].sort((a, b) => {
      const av = accessor(a)
      const bv = accessor(b)
      if (typeof av === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sortDir === 'asc' ? av - bv : bv - av
    })
  }, [coins, sortKey, sortDir])

  if (coins.length === 0) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
        No coins found
      </div>
    )
  }

  const sh = (label, colKey) => (
    <SortHeader label={label} colKey={colKey} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )

  return (
    <div className="table-scroll-wrapper">
      <table className="coins-table">
        <thead>
          <tr>
            <th className="col-token">{sh('Token', 'token')}</th>
            <th className="col-score">{sh('Score', 'score')}</th>
            <th className="col-price">{sh('Price / 24H', 'price')}</th>
            <th className="col-mcap">{sh('MCap', 'mcap')}</th>
            <th className="col-liq">{sh('Liquidity', 'liq')}</th>
            <th className="col-holders">{sh('Holders', 'holders')}</th>
            <th className="col-vol">{sh('Vol 24H', 'vol')}</th>
            <th className="col-bs">Buy / Sell</th>
            <th className="col-trend">7D Trend</th>
            <th className="col-buy"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(c => (
            <CoinRow key={c.id} coin={c} onNavigate={() => navigate(`/coin/${c.id}`)} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CoinRow({ coin: c, onNavigate }) {
  return (
    <tr onClick={onNavigate} data-chain={c.chain}>
      <td className="col-token">
        <div className="token-cell">
          <CoinAvatar avatarBg={c.avatarBg} initial={c.initial} chain={c.chain} emoji={c.emoji} symbol={c.symbol} imageUrl={c.imageUrl} />
          <div className="token-cell__info">
            <div className="token-cell__name">{c.name}</div>
            <div className="token-cell__sub">{c.symbol} · {c.age}</div>
          </div>
        </div>
      </td>

      <td className="col-score" style={{ textAlign: 'center' }}>
        <ScoreBadge score={c.score} />
      </td>

      <td className="col-price">
        <div className="tcell__primary">{c.price}</div>
        <div className={`tcell__secondary ${c.pos ? 'pos' : 'neg'}`}>{c.change}</div>
      </td>

      <td className="col-mcap">
        <div className="tcell__primary">{c.mcap}</div>
      </td>

      <td className="col-liq">
        <div className="tcell__primary">{c.liq}</div>
        {c.liqLocked && (
          <div className="tcell__icon-row">
            <IconLock />
            <span className="tcell__secondary muted" style={{ marginTop: 0 }}>Locked</span>
          </div>
        )}
      </td>

      <td className="col-holders">
        <div className="tcell__primary">{c.holders}</div>
        <div className={`tcell__secondary ${c.holdersPos ? 'pos' : 'neg'}`}>{c.holdersChange}</div>
      </td>

      <td className="col-vol">
        <div className="tcell__primary">{c.vol}</div>
        <div className={`tcell__secondary ${c.volPos ? 'pos' : 'neg'}`}>{c.volChange}</div>
      </td>

      <td className="col-bs">
        <BuySellBar buyPct={c.buyPct} buys={c.buys} sells={c.sells} />
      </td>

      <td className="col-trend">
        <Sparkline trend={c.trend} />
      </td>

      <td className="col-buy">
        <button className="buy-pill-btn" onClick={e => { e.stopPropagation() }}>Buy</button>
      </td>
    </tr>
  )
}
