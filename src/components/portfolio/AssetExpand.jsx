import MiniCoinRow from './MiniCoinRow'
import { IconAutosell } from '../ui/Icons'

function PositionStats({ stats }) {
  return (
    <div className="ae-stats">
      <div className="ae-stat">
        <div className="aes-label">Current Value</div>
        <div className="aes-value">{stats.cur}</div>
      </div>
      <div className="ae-stat">
        <div className="aes-label">Invested</div>
        <div className="aes-value">{stats.inv}</div>
      </div>
      <div className="ae-stat">
        <div className="aes-label">Profit</div>
        <div className={`aes-value ${stats.pnlPos ? 'pos' : 'neg'}`}>{stats.pnl}</div>
        <div className={`aes-sub  ${stats.pnlPos ? 'pos' : 'neg'}`}>{stats.pnlPct}</div>
      </div>
    </div>
  )
}

export default function AssetExpand({ asset, type, miniCoins = [], onAction }) {
  const visibleCoins = miniCoins.slice(0, 4)
  const more = type === 'pack' ? Math.max(0, asset.coinCount - visibleCoins.length) : 0

  return (
    <div className="ae-inner">
      <PositionStats stats={asset.stats} />

      {type === 'pack' && (
        <>
          <div className="ae-coins-hdr">Coins ({asset.coinCount})</div>
          {visibleCoins.map((c, i) => <MiniCoinRow key={i} coin={c} />)}
          {more > 0 && (
            <div className="ae-more-hint">↓ {more} more coin{more > 1 ? 's' : ''}</div>
          )}
        </>
      )}

      <div className="ae-actions">
        <button
          className="ae-btn-sell"
          onClick={e => { e.stopPropagation(); onAction(asset.id, type, 'sell') }}
        >
          Sell
        </button>
        <button
          className="ae-btn-autosell"
          onClick={e => { e.stopPropagation(); onAction(asset.id, type, 'autosell') }}
        >
          <IconAutosell size={13} />
          Auto-sell
        </button>
      </div>
    </div>
  )
}
