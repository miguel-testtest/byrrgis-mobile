import { useState } from 'react'
import { topHolders, topTraders, openPositions, openOrders, liquidityPools, devTokens } from '../../data/mockData'

const TABS = [
  { key: 'holders',      label: 'Top holders',   count: '857K' },
  { key: 'traders',      label: 'Top traders',   count: '48'   },
  { key: 'positions',    label: 'Positions',      count: null   },
  { key: 'orders',       label: 'Orders',         count: null   },
  { key: 'lp',           label: 'Liquidity Pool', count: '6'    },
  { key: 'dev',          label: 'Dev Tokens',     count: '3'    },
]

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
  return (
    <div className="dht-wrapper">
      <table className="dht-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Wallet</th>
            <th>% Supply</th>
            <th>Amount</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {topHolders.map(row => (
            <tr key={row.rank}>
              <td><span className="dht-muted">{row.rank}</span></td>
              <td><WalletCell address={row.address} label={row.label} /></td>
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
  return (
    <>
      <div className="dht-toolbar"><FilterBtn /></div>
      <div className="dht-wrapper">
        <table className="dht-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Wallet</th>
              <th>Bought</th>
              <th>Sold</th>
              <th>Trades</th>
              <th>R. PnL</th>
            </tr>
          </thead>
          <tbody>
            {topTraders.map(row => (
              <tr key={row.rank}>
                <td><span className="dht-muted">{row.rank}</span></td>
                <td><WalletCell address={row.address} label={row.label} /></td>
                <td><span className="dht-primary teal">{row.bought}</span></td>
                <td><span className="dht-primary red">{row.sold}</span></td>
                <td><span className="dht-primary">{row.trades}</span></td>
                <td>
                  <span className={`dht-primary ${row.pnlPos ? 'teal' : 'red'}`}>{row.pnl}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function PositionsTable() {
  return (
    <>
      <div className="dht-toolbar"><FilterBtn /></div>
      <div className="dht-wrapper">
        <table className="dht-table">
          <thead>
            <tr>
              <th>Wallet</th>
              <th>Side</th>
              <th>Amount</th>
              <th>Entry</th>
              <th>PnL</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {openPositions.map((row, i) => (
              <tr key={i}>
                <td><WalletCell address={row.address} label={row.label} /></td>
                <td>
                  <span className={`dht-side-badge ${row.side}`}>{row.side.toUpperCase()}</span>
                </td>
                <td><span className="dht-primary">{row.amount}</span></td>
                <td><span className="dht-primary">{row.entry}</span></td>
                <td>
                  <span className={`dht-primary ${row.pnlPos ? 'teal' : 'red'}`}>{row.pnl}</span>
                </td>
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
  return (
    <div className="dht-wrapper">
      <table className="dht-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Label</th>
            <th>Amount</th>
            <th>Trigger</th>
            <th>Value</th>
            <th>Placed</th>
          </tr>
        </thead>
        <tbody>
          {openOrders.map(row => (
            <tr key={row.id}>
              <td><span className="dht-muted">{row.id}</span></td>
              <td>
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
  return (
    <>
      <div className="dht-toolbar"><FilterBtn /></div>
      <div className="dht-wrapper">
        <table className="dht-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Wallet</th>
              <th>Pool</th>
              <th>Pair</th>
              <th>Share</th>
              <th>Fees</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {liquidityPools.map(row => (
              <tr key={row.rank}>
                <td><span className="dht-muted">{row.rank}</span></td>
                <td><WalletCell address={row.address} label={row.label} /></td>
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
  return (
    <div className="dht-wrapper">
      <table className="dht-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Wallet</th>
            <th>Amount</th>
            <th>% Supply</th>
            <th>Value</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {devTokens.map(row => (
            <tr key={row.rank}>
              <td><span className="dht-muted">{row.rank}</span></td>
              <td><WalletCell address={row.address} label={row.label} /></td>
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
      {activeTab === 'traders'      && <TradersTable />}
      {activeTab === 'positions'    && <PositionsTable />}
      {activeTab === 'orders'       && <OrdersTable />}
      {activeTab === 'lp'           && <LiquidityTable />}
      {activeTab === 'dev'          && <DevTokensTable />}
    </div>
  )
}
