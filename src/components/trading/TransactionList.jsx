import { useState, useMemo } from 'react'
import { IconExternalLink, IconChevronUp, IconChevronDown, IconSort } from '../ui/Icons'

function parseNum(str) {
  if (typeof str === 'number') return str
  if (!str || str === '-') return -Infinity
  const s = String(str).replace(/[$,%+, ]/g, '')
  const suffix = s.slice(-1).toUpperCase()
  const n = parseFloat(s)
  if (suffix === 'B') return n * 1e9
  if (suffix === 'M') return n * 1e6
  if (suffix === 'K') return n * 1e3
  return isNaN(n) ? -Infinity : n
}

function parseAmount(str) {
  return parseFloat(String(str)) || 0
}

const SORT_ACCESSORS = {
  date:         tx => tx.date,
  type:         tx => tx.type,
  usd:          tx => parseNum(tx.usd),
  amount:       tx => parseAmount(tx.amount),
  price:        tx => parseNum(tx.price),
  platform:     tx => tx.platform.toLowerCase(),
  remainingUsd: tx => parseNum(tx.remainingUsd),
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

export default function TransactionList({ transactions }) {
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
    if (!sortKey) return transactions
    const accessor = SORT_ACCESSORS[sortKey]
    return [...transactions].sort((a, b) => {
      const av = accessor(a)
      const bv = accessor(b)
      if (typeof av === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sortDir === 'asc' ? av - bv : bv - av
    })
  }, [transactions, sortKey, sortDir])

  const sh = (label, colKey) => (
    <SortHeader label={label} colKey={colKey} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )

  return (
    <div className="tx-table-wrap">
      <table className="tx-table">
        <thead>
          <tr>
            <th className="tx-th tx-th--date">{sh('Date', 'date')}</th>
            <th className="tx-th tx-th--type">{sh('Type', 'type')}</th>
            <th className="tx-th">{sh('USD', 'usd')}</th>
            <th className="tx-th">{sh('Amount', 'amount')}</th>
            <th className="tx-th">{sh('Price', 'price')}</th>
            <th className="tx-th">{sh('Platform', 'platform')}</th>
            <th className="tx-th">Maker</th>
            <th className="tx-th">{sh('Remaining USD', 'remainingUsd')}</th>
            <th className="tx-th">Explorer</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((tx, i) => (
            <tr key={i} className="tx-tr">
              <td className="tx-td tx-td--date tx-td--muted">{tx.date}</td>
              <td className="tx-td tx-td--type">
                <span className={`tx-type-badge ${tx.type}`}>
                  {tx.type === 'buy' ? 'BUY' : 'SELL'}
                </span>
              </td>
              <td className="tx-td tx-td--mono">{tx.usd}</td>
              <td className="tx-td tx-td--mono">{tx.amount}</td>
              <td className="tx-td tx-td--mono">{tx.price}</td>
              <td className="tx-td tx-td--muted">{tx.platform}</td>
              <td className="tx-td">
                <span className="tx-maker">{tx.maker}</span>
              </td>
              <td className="tx-td tx-td--mono">{tx.remainingUsd}</td>
              <td className="tx-td">
                <a
                  className="tx-explorer-link"
                  href={tx.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tx.explorerLabel}
                  <IconExternalLink size={10} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
