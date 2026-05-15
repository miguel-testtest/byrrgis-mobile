import { useState, useMemo } from 'react'
import AssetItem from './AssetItem'
import AvatarStack from './AvatarStack'
import { IconChevronUp, IconChevronDown, IconSort } from '../ui/Icons'

function parseNum(str) {
  if (typeof str === 'number') return str
  const s = String(str).replace(/[$,%+ ]/g, '').replace(/,/g, '')
  const suffix = s.slice(-1).toUpperCase()
  const n = parseFloat(s)
  if (suffix === 'B') return n * 1e9
  if (suffix === 'M') return n * 1e6
  if (suffix === 'K') return n * 1e3
  return isNaN(n) ? 0 : n
}

function fmtUSD(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const SORT_ACCESSORS = {
  score: a => a.score,
  cur:   a => parseNum(a.stats?.cur ?? a.val),
  inv:   a => parseNum(a.stats?.inv ?? '0'),
  pnl:   a => parseNum(a.stats?.pnl ?? '0'),
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
        : <IconSort />}
    </button>
  )
}

function useAggregate(assets, type) {
  return useMemo(() => {
    let cur = 0, inv = 0, pnl = 0, scoreSum = 0
    assets.forEach(a => {
      cur += parseNum(a.stats?.cur ?? a.val)
      inv += parseNum(a.stats?.inv ?? '0')
      pnl += parseNum(a.stats?.pnl ?? '0')
      scoreSum += a.score
    })
    const avgScore = assets.length ? Math.round(scoreSum / assets.length) : 0
    const pnlPct = inv > 0 ? (pnl / inv) * 100 : 0
    const sign = n => n >= 0 ? '+' : '-'
    return {
      id: `all-${type}`,
      name: type === 'coin' ? 'All Coins' : 'All Packs',
      emoji: type === 'coin' ? '🪙' : '📦',
      score: avgScore,
      cur: fmtUSD(cur),
      inv: fmtUSD(inv),
      pnl: `${sign(pnl)}${fmtUSD(pnl)}`,
      pnlPct: `${sign(pnl)}${Math.abs(pnlPct).toFixed(2)}%`,
      pnlPos: pnl >= 0,
      count: assets.length,
    }
  }, [assets, type])
}

function AggregateRow({ agg, assets, type, onAction }) {
  return (
    <tr className="asset-tr asset-tr-agg" onClick={() => onAction(agg.id, type, 'sell')}>
      <td className="at-col-token">
        <div className="token-cell">
          <AvatarStack assets={assets} size={28} maxVisible={2} />
          <div className="token-cell__info">
            <div className="token-cell__name">{agg.name}</div>
            <div className="token-cell__sub">{agg.count} {type === 'coin' ? 'coins' : 'packs'}</div>
          </div>
        </div>
      </td>
      <td className="at-col-cur">
        <div className="tcell__primary">{agg.cur}</div>
      </td>
      <td className="at-col-inv">
        <div className="tcell__primary">{agg.inv}</div>
      </td>
      <td className="at-col-pnl">
        <div className={`tcell__primary ${agg.pnlPos ? 'pos' : 'neg'}`}>{agg.pnl}</div>
        <div className={`tcell__secondary ${agg.pnlPos ? 'pos' : 'neg'}`}>{agg.pnlPct}</div>
      </td>
      <td className="at-col-sell">
        <button className="sell-pill-btn" onClick={e => { e.stopPropagation(); onAction(agg.id, type, 'sell') }}>Sell</button>
      </td>
    </tr>
  )
}

export default function AssetTable({ assets, type, miniCoins = [], onAction }) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('desc')

  const agg = useAggregate(assets, type)

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = useMemo(() => {
    const base = sortKey
      ? [...assets].sort((a, b) => {
          const av = SORT_ACCESSORS[sortKey](a)
          const bv = SORT_ACCESSORS[sortKey](b)
          return sortDir === 'asc' ? av - bv : bv - av
        })
      : [...assets]
    // autosell-active assets always float to the top
    return base.sort((a, b) => (b.autosell ? 1 : 0) - (a.autosell ? 1 : 0))
  }, [assets, sortKey, sortDir])

  const sh = (label, colKey) => (
    <SortHeader label={label} colKey={colKey} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )

  return (
    <div className="table-scroll-wrapper">
      <table className="asset-table">
        <thead>
          <tr>
            <th className="at-col-token">Asset Name</th>
            <th className="at-col-cur">{sh('Current Value', 'cur')}</th>
            <th className="at-col-inv">{sh('Invested', 'inv')}</th>
            <th className="at-col-pnl">{sh('Profit', 'pnl')}</th>
            <th className="at-col-sell"></th>
          </tr>
        </thead>
        <tbody>
          <AggregateRow agg={agg} assets={assets} type={type} onAction={onAction} />
          {sorted.map(asset => (
            <AssetItem
              key={asset.id}
              asset={asset}
              type={type}
              onAction={onAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
