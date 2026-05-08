import { useNavigate } from 'react-router-dom'
import Sparkline from '../ui/Sparkline'
import { IconChainSolana, IconChainEthereum } from '../ui/Icons'

function fmtPnl(value, cost) {
  const diff = value - cost
  const pct  = ((diff / cost) * 100).toFixed(1)
  const sign = diff >= 0 ? '+' : ''
  return { str: `${sign}$${Math.abs(diff).toFixed(0)} (${sign}${pct}%)`, pos: diff >= 0 }
}

export default function HoldingRow({ holding: h }) {
  const navigate = useNavigate()
  const pnl = fmtPnl(h.value, h.costBasis)
  const ChainIcon = h.chain === 'Solana' ? IconChainSolana : IconChainEthereum

  return (
    <div className="holding-row" onClick={() => navigate(`/coin/${h.id}`)}>
      <div
        className="holding-avatar"
        style={{ background: h.avatarBg, fontSize: h.emoji ? 17 : 15 }}
      >
        {h.initial}
        <div className="holding-chain-badge">
          <ChainIcon />
        </div>
      </div>

      <div className="holding-info">
        <div className="holding-info__top">
          <span className="holding-info__name">{h.name}</span>
          <span className="holding-info__value">
            ${h.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="holding-info__bottom">
          <span className="holding-info__sub">{h.qty} {h.symbol}</span>
          <span className={`holding-info__pnl ${pnl.pos ? 'pos' : 'neg'}`}>{pnl.str}</span>
        </div>
        <div className="holding-alloc-bar">
          <div
            className="holding-alloc-bar__fill"
            style={{ width: `${h.alloc}%`, background: h.allocColor, opacity: 0.6 }}
          />
        </div>
      </div>

      <div className="holding-spark">
        <Sparkline trend={h.trend} width={56} height={28} />
      </div>
    </div>
  )
}
