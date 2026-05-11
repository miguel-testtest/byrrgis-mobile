import { useNavigate } from 'react-router-dom'
import CoinAvatar from '../ui/CoinAvatar'
import ScoreBadge from '../ui/ScoreBadge'
import BuySellBar from '../ui/BuySellBar'
import Sparkline from '../ui/Sparkline'
import { IconSort, IconLock } from '../ui/Icons'

function SortHeader({ label }) {
  return (
    <span className="th-inner">
      {label}
      <IconSort />
    </span>
  )
}

export default function CoinsTable({ coins }) {
  const navigate = useNavigate()

  if (coins.length === 0) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
        No coins found
      </div>
    )
  }

  return (
    <div className="table-scroll-wrapper">
      <table className="coins-table">
        <thead>
          <tr>
            <th className="col-token"><SortHeader label="Token" /></th>
            <th className="col-score"><SortHeader label="Score" /></th>
            <th className="col-price"><SortHeader label="Price / 24H" /></th>
            <th className="col-mcap"><SortHeader label="MCap" /></th>
            <th className="col-liq"><SortHeader label="Liquidity" /></th>
            <th className="col-holders"><SortHeader label="Holders" /></th>
            <th className="col-vol"><SortHeader label="Vol 24H" /></th>
            <th className="col-bs">Buy / Sell</th>
            <th className="col-trend">7D Trend</th>
            <th className="col-buy"></th>
          </tr>
        </thead>
        <tbody>
          {coins.map(c => (
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
