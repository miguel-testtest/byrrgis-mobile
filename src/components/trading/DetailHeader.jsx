import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBack, IconChevronDown, IconLock } from '../ui/Icons'
import TokenInfoBottomSheet from './TokenInfoBottomSheet'

export default function DetailHeader({ coin }) {
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <div className="detail-header">

        {/* Row 1: back / avatar / name+sub / price */}
        <div className="detail-header__top">
          <button className="detail-back" onClick={() => navigate(-1)} aria-label="Back">
            <IconBack />
          </button>
          <div
            className="detail-avatar"
            style={{ background: coin.avatarBg, fontSize: coin.emoji ? 17 : 13 }}
          >
            {coin.initial}
          </div>
          <div className="detail-token-info">
            <div className="detail-token-info__symbol">{coin.symbol}</div>
            <div className="detail-token-info__sub">
              {coin.name} · {coin.chain} · {coin.age}
            </div>
          </div>
          <div className="detail-price-col">
            <div className="detail-price-col__value">{coin.price}</div>
            <div className={`detail-price-col__change ${coin.pos ? 'pos' : 'neg'}`}>
              {coin.changeDollar ?? coin.change}
            </div>
          </div>
        </div>

        {/* Row 2: stats + dropdown button */}
        <div className="detail-stats-row">
          <div className="detail-stats-strip">

            {/* Liq with lock icon + locked % */}
            <div className="detail-stat">
              <span className="detail-stat__label">Liq</span>
              <div className="detail-stat__liq-val">
                <span className="detail-stat__value">{coin.liq}</span>
                {coin.liqLockPct && (
                  <span className="detail-stat__liq-lock">
                    <IconLock size={11} />
                    <span>{coin.liqLockPct}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="detail-stat">
              <span className="detail-stat__label">MCap</span>
              <span className="detail-stat__value">{coin.mcap}</span>
            </div>

            <div className="detail-stat">
              <span className="detail-stat__label">Holders</span>
              <span className="detail-stat__value">{coin.holders}</span>
            </div>

            <div className="detail-stat">
              <span className="detail-stat__label">24h Vol</span>
              <div className="detail-stat__vol-row">
                <span className="detail-stat__value pos">{coin.vol}</span>
                <span className={`detail-stat__value ${coin.volPos ? 'pos' : 'neg'}`}>
                  {coin.volChange}
                </span>
              </div>
            </div>

            {/* Score pill as last stat */}
            {coin.riskScore != null && (
              <div className="detail-stat">
                <span className="detail-stat__label">Score</span>
                <span className="risk-pill">
                  {coin.riskScore} · {coin.riskLabel}
                </span>
              </div>
            )}

          </div>

          <button
            className="detail-dropdown-btn"
            onClick={() => setSheetOpen(true)}
            aria-label="Token info"
          >
            <IconChevronDown size={16} />
          </button>
        </div>

      </div>

      <TokenInfoBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        coin={coin}
      />
    </>
  )
}
