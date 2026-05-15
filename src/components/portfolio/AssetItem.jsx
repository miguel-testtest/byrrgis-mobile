import TpSlTag from '../ui/TpSlTag'
import CoinAvatar from '../ui/CoinAvatar'

function PackAvatar({ emoji }) {
  return (
    <div className="asset-av">
      <span style={{ fontSize: 22 }}>{emoji}</span>
    </div>
  )
}

function coinDisplayName(name, sub) {
  const cleanSub = sub.replace(/\s*·\s*\d+\s*tokens/i, '').trim()
  const slash = name.indexOf(' / ')
  if (slash === -1) return { name, sub: cleanSub }
  return {
    name: name.slice(0, slash),
    sub: cleanSub,
  }
}

export default function AssetItem({ asset, type, onAction }) {
  const { name, sub } = type === 'coin'
    ? coinDisplayName(asset.name, asset.sub)
    : { name: asset.name, sub: asset.sub }

  const stats = asset.stats || {}

  return (
    <tr className="asset-tr" onClick={() => onAction(asset.id, type, 'sell')}>
      <td className="at-col-token">
        <div className="token-cell">
          {type === 'pack'
            ? <PackAvatar emoji={asset.emoji} />
            : <CoinAvatar avatarBg={asset.bg} initial={asset.init} chain={asset.chain} symbol={asset.symbol} size={40} />
          }
          <div className="token-cell__info">
            <div className="at-name-row">
              <span className="at-name-text">{name}</span>
              <span className="at-score-badge">{asset.score}</span>
              {asset.tpsl && <TpSlTag />}
            </div>
            <div className="token-cell__sub">{sub}</div>
          </div>
        </div>
      </td>

      <td className="at-col-cur">
        <div className="tcell__primary">{stats.cur ?? asset.val}</div>
      </td>

      <td className="at-col-inv">
        <div className="tcell__primary">{stats.inv ?? '—'}</div>
      </td>

      <td className="at-col-pnl">
        <div className={`tcell__primary ${stats.pnlPos ? 'pos' : 'neg'}`}>{stats.pnl}</div>
        <div className={`tcell__secondary ${stats.pnlPos ? 'pos' : 'neg'}`}>{stats.pnlPct}</div>
      </td>

      <td className="at-col-sell" onClick={e => e.stopPropagation()}>
        {asset.autosell
          ? <button className="stop-pill-btn" onClick={() => onAction(asset.id, type, 'autosell')}>Stop</button>
          : <button className="sell-pill-btn" onClick={() => onAction(asset.id, type, 'sell')}>Sell</button>
        }
      </td>
    </tr>
  )
}
