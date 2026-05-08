import { useNavigate } from 'react-router-dom'
import CoinAvatar from '../ui/CoinAvatar'
import {
  IconShield, IconTrophy, IconCandlestick,
  IconUserStar, IconChefHat, IconCrosshair,
  IconGhost, IconLayers, IconCopy,
  IconChainSolana, IconChainEthereum,
} from '../ui/Icons'

// Higher audit = better
function auditLevel(v) {
  if (v >= 80) return 'safe'
  if (v >= 50) return 'warn'
  return 'danger'
}
// Lower fees = better
function feesLevel(v) {
  if (v < 3)  return 'safe'
  if (v < 7)  return 'warn'
  return 'danger'
}
// Lower = safer (insider, bundled, honeypot, concentration)
function riskLevel(v, warnAt = 15, dangerAt = 25) {
  if (v < warnAt)   return 'safe'
  if (v < dangerAt) return 'warn'
  return 'danger'
}

function StatItem({ icon: Icon, value, level }) {
  return (
    <div className={`nl-stat${level ? ` ${level}` : ''}`}>
      <Icon size={14} />
      <span>{value}</span>
    </div>
  )
}

function TagItem({ icon: Icon, value, level }) {
  return (
    <div className={`nl-tag${level ? ` ${level}` : ''}`}>
      <Icon size={14} />
      <span>{value}</span>
    </div>
  )
}

function MiniBar({ buyPct }) {
  const buyW = Math.round(buyPct * 0.29)
  const sellW = 29 - buyW
  return (
    <div className="nl-mini-bar">
      <div className="nl-mini-bar__buy" style={{ width: buyW }} />
      <div className="nl-mini-bar__sell" style={{ width: sellW }} />
    </div>
  )
}

function ChainLogo({ chain }) {
  const Icon = chain === 'Solana' ? IconChainSolana : IconChainEthereum
  return <Icon size={16} />
}

export default function NewListingsCard({ coin }) {
  const navigate = useNavigate()
  const buyW = `${coin.buyPct}%`

  return (
    <div className="nl-card" onClick={() => navigate(`/coin/${coin.id}`)}>
      <div className="nl-card__body">
        {/* Left section */}
        <div className="nl-left">
          <div className="nl-top-row">
            <CoinAvatar avatarBg={coin.avatarBg} initial={coin.initial} chain={coin.chain} size={40} />
            <div className="nl-info">
              <div className="nl-title-row">
                <span className="nl-name">{coin.name}</span>
                <span className="nl-meta">{coin.symbol} · {coin.age}</span>
                <button className="nl-copy-btn" onClick={e => e.stopPropagation()} aria-label="Copy">
                  <IconCopy size={16} />
                </button>
              </div>
              <div className="nl-stats-row">
                <StatItem icon={IconShield}     value={`${coin.audit}%`}   level={auditLevel(coin.audit)} />
                <StatItem icon={IconTrophy}     value={`${coin.fees}%`}    level={feesLevel(coin.fees)} />
                <StatItem icon={IconCandlestick} value={coin.markets} />
              </div>
            </div>
          </div>
          <div className="nl-tags-row">
            <TagItem icon={IconUserStar}  value={`${coin.insider}%`}       level={riskLevel(coin.insider, 15, 25)} />
            <TagItem icon={IconChefHat}   value="DS" />
            <TagItem icon={IconCrosshair} value={`${coin.bundled}%`}       level={riskLevel(coin.bundled, 10, 20)} />
            <TagItem icon={IconGhost}     value={`${coin.honeypot}%`}      level={coin.honeypot === 0 ? 'safe' : 'danger'} />
            <TagItem icon={IconLayers}    value={`${coin.concentration}%`} level={riskLevel(coin.concentration, 15, 25)} />
          </div>
        </div>

        {/* Right section */}
        <div className="nl-right">
          <div className="nl-data-top">
            <div className="nl-vol-mc">
              <span className="nl-label">V</span>
              <span className="nl-value">{coin.vol}</span>
              <span className="nl-label">MC</span>
              <span className="nl-value">{coin.mcap}</span>
            </div>
            <div className="nl-price-row">
              <span className="nl-label">F</span>
              <ChainLogo chain={coin.chain} />
              <span className="nl-value">{coin.floorPrice}</span>
              <span className="nl-label">TX</span>
              <span className="nl-value">{coin.txCount}</span>
              <MiniBar buyPct={coin.buyPct} />
            </div>
          </div>
          <button className="nl-buy-btn" onClick={e => { e.stopPropagation() }}>Buy</button>
        </div>
      </div>

      {/* Bottom buy/sell bar */}
      <div className="nl-bottom-bar__bg" />
      <div className="nl-bottom-bar__buy" style={{ width: buyW }} />
    </div>
  )
}
