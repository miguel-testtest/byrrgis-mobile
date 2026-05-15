import { useState, useMemo } from 'react'
import { topHolders, topTraders, openPositions, openOrders, liquidityPools, devTokens } from '../../data/mockData'
import { IconChevronUp, IconChevronDown, IconSort } from '../ui/Icons'

const TABS = [
  { key: 'holders',   label: 'Top holders',   count: '857K' },
  { key: 'traders',   label: 'Top traders',   count: '48'   },
  { key: 'positions', label: 'Positions',     count: null   },
  { key: 'orders',    label: 'Orders',        count: null   },
  { key: 'lp',        label: 'Liquidity Pool', count: '6'   },
  { key: 'dev',       label: 'Dev Tokens',    count: '3'    },
]

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

function parsePct(str) {
  return parseFloat(String(str)) || 0
}

function parseAmount(str) {
  return parseFloat(String(str)) || 0
}

function useSortedData(data, accessors) {
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
    if (!sortKey || !accessors[sortKey]) return data
    const accessor = accessors[sortKey]
    return [...data].sort((a, b) => {
      const av = accessor(a)
      const bv = accessor(b)
      if (typeof av === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sortDir === 'asc' ? av - bv : bv - av
    })
  }, [data, sortKey, sortDir])

  return { sorted, sortKey, sortDir, handleSort }
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

function FilterBtn() {
  return (
    <button className="dht-filter-btn">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M1 2.5h10M3 6h6M5 9.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      Filter
    </button>
  )
}

function WalletCell({ address, label }) {
  return (
    <div className="dht-wallet">
      <span className="dht-addr">{address}</span>
      {label && <span className="dht-label">{label}</span>}
    </div>
  )
}

function HoldersTable() {
  const { sorted, sortKey, sortDir, handleSort } = useSortedData(topHolders, {
    pct:    r => parsePct(r.pct),
    amount: r => parseNum(r.amount),
    value:  r => parseNum(r.value),
  })
  const sh = (label, key) => (
    <SortHeader label={label} colKey={key} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )
  return (
    <div className="dht-wrapper">
      <table className="dht-table">
        <thead>
          <tr>
            <th className="dht-col--rank">#</th>
            <th className="dht-col--wallet">Wallet</th>
            <th>{sh('% Supply', 'pct')}</th>
            <th>{sh('Amount', 'amount')}</th>
            <th>{sh('Value', 'value')}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(row => (
            <tr key={row.rank}>
              <td className="dht-col--rank"><span className="dht-muted">{row.rank}</span></td>
              <td className="dht-col--wallet"><WalletCell address={row.address} label={row.label} /></td>
              <td><span className="dht-primary">{row.pct}</span></td>
              <td><span className="dht-primary">{row.amount} AAVE</span></td>
              <td><span className="dht-primary">{row.value}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TradersTable() {
  const { sorted, sortKey, sortDir, handleSort } = useSortedData(topTraders, {
    bought: r => parseNum(r.bought),
    sold:   r => parseNum(r.sold),
    trades: r => r.trades,
    pnl:    r => parseNum(r.pnl),
  })
  const sh = (label, key) => (
    <SortHeader label={label} colKey={key} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )
  return (
    <>
      <div className="dht-toolbar"><FilterBtn /></div>
      <div className="dht-wrapper">
        <table className="dht-table">
          <thead>
            <tr>
              <th className="dht-col--rank">#</th>
              <th className="dht-col--wallet">Wallet</th>
              <th>{sh('Bought', 'bought')}</th>
              <th>{sh('Sold', 'sold')}</th>
              <th>{sh('Trades', 'trades')}</th>
              <th>{sh('R. PnL', 'pnl')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => (
              <tr key={row.rank}>
                <td className="dht-col--rank"><span className="dht-muted">{row.rank}</span></td>
                <td className="dht-col--wallet"><WalletCell address={row.address} label={row.label} /></td>
                <td><span className="dht-primary teal">{row.bought}</span></td>
                <td><span className="dht-primary red">{row.sold}</span></td>
                <td><span className="dht-primary">{row.trades}</span></td>
                <td><span className={`dht-primary ${row.pnlPos ? 'teal' : 'red'}`}>{row.pnl}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function PositionsTable() {
  const { sorted, sortKey, sortDir, handleSort } = useSortedData(openPositions, {
    side:   r => r.side,
    amount: r => parseAmount(r.amount),
    entry:  r => parseNum(r.entry),
    pnl:    r => parseNum(r.pnl),
    value:  r => parseNum(r.value),
  })
  const sh = (label, key) => (
    <SortHeader label={label} colKey={key} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )
  return (
    <>
      <div className="dht-toolbar"><FilterBtn /></div>
      <div className="dht-wrapper">
        <table className="dht-table">
          <thead>
            <tr>
              <th className="dht-col--wallet-first">Wallet</th>
              <th>{sh('Side', 'side')}</th>
              <th>{sh('Amount', 'amount')}</th>
              <th>{sh('Entry', 'entry')}</th>
              <th>{sh('PnL', 'pnl')}</th>
              <th>{sh('Value', 'value')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={i}>
                <td className="dht-col--wallet-first"><WalletCell address={row.address} label={row.label} /></td>
                <td>
                  <span className={`dht-side-badge ${row.side}`}>{row.side.toUpperCase()}</span>
                </td>
                <td><span className="dht-primary">{row.amount}</span></td>
                <td><span className="dht-primary">{row.entry}</span></td>
                <td><span className={`dht-primary ${row.pnlPos ? 'teal' : 'red'}`}>{row.pnl}</span></td>
                <td><span className="dht-primary">{row.value}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function OrdersTable() {
  const { sorted, sortKey, sortDir, handleSort } = useSortedData(openOrders, {
    type:    r => r.type,
    amount:  r => parseAmount(r.amount),
    trigger: r => parseNum(r.trigger),
    value:   r => parseNum(r.value),
  })
  const sh = (label, key) => (
    <SortHeader label={label} colKey={key} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )
  return (
    <div className="dht-wrapper">
      <table className="dht-table">
        <thead>
          <tr>
            <th className="dht-col--rank">#</th>
            <th className="dht-col--type">{sh('Type', 'type')}</th>
            <th>Label</th>
            <th>{sh('Amount', 'amount')}</th>
            <th>{sh('Trigger', 'trigger')}</th>
            <th>{sh('Value', 'value')}</th>
            <th>Placed</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(row => (
            <tr key={row.id}>
              <td className="dht-col--rank"><span className="dht-muted">{row.id}</span></td>
              <td className="dht-col--type">
                <span className={`dht-side-badge ${row.type}`}>{row.type.toUpperCase()}</span>
              </td>
              <td><span className="dht-primary">{row.label}</span></td>
              <td><span className="dht-primary">{row.amount}</span></td>
              <td><span className="dht-primary">{row.trigger}</span></td>
              <td><span className="dht-primary">{row.value}</span></td>
              <td><span className="dht-muted">{row.placed}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LiquidityTable() {
  const { sorted, sortKey, sortDir, handleSort } = useSortedData(liquidityPools, {
    share: r => parsePct(r.share),
    fees:  r => parseNum(r.fees),
    value: r => parseNum(r.value),
  })
  const sh = (label, key) => (
    <SortHeader label={label} colKey={key} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )
  return (
    <>
      <div className="dht-toolbar"><FilterBtn /></div>
      <div className="dht-wrapper">
        <table className="dht-table">
          <thead>
            <tr>
              <th className="dht-col--rank">#</th>
              <th className="dht-col--wallet">Wallet</th>
              <th>Pool</th>
              <th>Pair</th>
              <th>{sh('Share', 'share')}</th>
              <th>{sh('Fees', 'fees')}</th>
              <th>{sh('Value', 'value')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => (
              <tr key={row.rank}>
                <td className="dht-col--rank"><span className="dht-muted">{row.rank}</span></td>
                <td className="dht-col--wallet"><WalletCell address={row.address} label={row.label} /></td>
                <td><span className="dht-primary">{row.pool}</span></td>
                <td><span className="dht-primary">{row.pair}</span></td>
                <td><span className="dht-primary">{row.share}</span></td>
                <td><span className="dht-primary teal">{row.fees}</span></td>
                <td><span className="dht-primary">{row.value}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function DevTokensTable() {
  const { sorted, sortKey, sortDir, handleSort } = useSortedData(devTokens, {
    amount: r => parseNum(r.amount),
    pct:    r => parsePct(r.pct),
    value:  r => parseNum(r.value),
    sold:   r => parsePct(r.sold),
  })
  const sh = (label, key) => (
    <SortHeader label={label} colKey={key} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  )
  return (
    <div className="dht-wrapper">
      <table className="dht-table">
        <thead>
          <tr>
            <th className="dht-col--rank">#</th>
            <th className="dht-col--wallet">Wallet</th>
            <th>{sh('Amount', 'amount')}</th>
            <th>{sh('% Supply', 'pct')}</th>
            <th>{sh('Value', 'value')}</th>
            <th>{sh('Sold', 'sold')}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(row => (
            <tr key={row.rank}>
              <td className="dht-col--rank"><span className="dht-muted">{row.rank}</span></td>
              <td className="dht-col--wallet"><WalletCell address={row.address} label={row.label} /></td>
              <td><span className="dht-primary">{row.amount} AAVE</span></td>
              <td><span className="dht-primary">{row.pct}</span></td>
              <td><span className="dht-primary">{row.value}</span></td>
              <td>
                <span className={`dht-primary ${row.soldPct > 0 ? 'red' : ''}`}>{row.sold} sold</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TablesPanel() {
  const [activeTab, setActiveTab] = useState('holders')

  return (
    <div className="tables-panel">
      <div className="tables-subtabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`tables-subtab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}{tab.count != null ? ` (${tab.count})` : ''}
          </button>
        ))}
      </div>

      {activeTab === 'holders'   && <HoldersTable />}
      {activeTab === 'traders'   && <TradersTable />}
      {activeTab === 'positions' && <PositionsTable />}
      {activeTab === 'orders'    && <OrdersTable />}
      {activeTab === 'lp'        && <LiquidityTable />}
      {activeTab === 'dev'       && <DevTokensTable />}
    </div>
  )
}
