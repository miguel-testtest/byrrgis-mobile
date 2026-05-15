import { useState } from 'react'
import { IconX, IconTrophy, IconChefHat, IconCrosshair, IconGhost, IconLayers, IconCandlestick, IconChevronRight, IconX as IconXSocial, IconTelegram, IconGlobe } from '../ui/Icons'

const TIME_OPTIONS = ['5m', '1h', '4h', '24h']

function SectionLabel({ children }) {
  return <div className="ti-section-label">{children}</div>
}

function StatCol({ label, children }) {
  return (
    <div className="ti-stat-col">
      <span className="ti-stat-label">{label}</span>
      {children}
    </div>
  )
}

export default function TokenInfoBottomSheet({ open, onClose, coin }) {
  const [volTime, setVolTime] = useState('24h')

  const buyRatio = Math.round((coin.buys24h / (coin.buys24h + coin.sells24h)) * 100)
  const sellRatio = 100 - buyRatio

  const riskPct = coin.riskScore ?? 0
  const techPct = coin.techScore ?? 0
  const socialPct = coin.socialScore ?? 0

  return (
    <>
      <div className={`adv-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`adv-sheet ti-sheet${open ? ' open' : ''}`}>
        <div className="adv-sheet__handle" />

        {/* ── Market ── */}
        <section className="ti-section">
          <SectionLabel>Market</SectionLabel>
          <div className="ti-stat-grid">
            <StatCol label="Liquidity">
              <span className="ti-value">{coin.liq}</span>
              <span className="ti-sub pos">{coin.liqLockPct}</span>
            </StatCol>
            <StatCol label="MCap">
              <span className="ti-value">{coin.mcap}</span>
            </StatCol>
            <StatCol label="Supply">
              <span className="ti-value">{coin.supply}</span>
            </StatCol>
          </div>
          <div className="ti-stat-grid">
            <StatCol label="Active T">
              <span className="ti-value">{coin.activeTx}</span>
            </StatCol>
            <StatCol label="Unique T">
              <span className="ti-value">{coin.uniqueTx}</span>
            </StatCol>
            <StatCol label="Holders">
              <span className="ti-value">{coin.holders}</span>
            </StatCol>
          </div>
          <div className="ti-channels-row">
            <span className="ti-channels-label">Channels</span>
            <div className="ti-channels-icons">
              <button className="ti-channel-btn" aria-label="X / Twitter"><IconXSocial size={12} /></button>
              <button className="ti-channel-btn" aria-label="Telegram"><IconTelegram size={12} /></button>
              <button className="ti-channel-btn" aria-label="Website"><IconGlobe size={12} /></button>
            </div>
          </div>
        </section>

        {/* ── Volume ── */}
        <section className="ti-section">
          <div className="ti-section-header">
            <SectionLabel>Volume</SectionLabel>
            <div className="ti-time-picker">
              {TIME_OPTIONS.map(t => (
                <button
                  key={t}
                  className={`ti-time-btn${volTime === t ? ' active' : ''}`}
                  onClick={() => setVolTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="ti-stat-grid ti-stat-grid--4">
            <StatCol label="24h Vol">
              <span className="ti-value pos">{coin.vol}</span>
              <span className="ti-sub neg">{coin.volChange}</span>
            </StatCol>
            <StatCol label="Buys">
              <span className="ti-value pos">{coin.buys24h.toLocaleString()}</span>
              <span className="ti-sub pos">{coin.buysVol}</span>
            </StatCol>
            <StatCol label="Sells">
              <span className="ti-value neg">{coin.sells24h.toLocaleString()}</span>
              <span className="ti-sub neg">{coin.sellsVol}</span>
            </StatCol>
            <StatCol label="Net Vol">
              <span className="ti-value pos">{coin.netVol}</span>
            </StatCol>
          </div>
          <div className="ti-buysell-bar">
            <div className="ti-buysell-bar__buy" style={{ flex: buyRatio }} />
            <div className="ti-buysell-bar__sell" style={{ flex: sellRatio }} />
          </div>
        </section>

        {/* ── Risk Score ── */}
        <section className="ti-section">
          <div className="ti-section-header">
            <SectionLabel>Risk Score</SectionLabel>
            <span className="risk-pill">{coin.riskScore} · {coin.riskLabel}</span>
          </div>
          <div className="ti-risk-track">
            <div className="ti-risk-dot" style={{ left: `${riskPct}%` }} />
          </div>
          <div className="ti-risk-labels">
            <span>Low</span><span>High</span>
          </div>
        </section>

        {/* ── Audit Summary ── */}
        <section className="ti-section">
          <div className="ti-section-header">
            <SectionLabel>Audit Summary</SectionLabel>
            <button className="ti-view-all">
              View all <IconChevronRight size={12} />
            </button>
          </div>
          <div className="ti-audit-row">
            <span className="ti-audit-label">Technical</span>
            <div className="ti-audit-track">
              <div className="ti-audit-fill" style={{ width: `${techPct}%` }} />
            </div>
            <span className="ti-audit-score">{techPct}</span>
          </div>
          <div className="ti-audit-row">
            <span className="ti-audit-label">Social</span>
            <div className="ti-audit-track">
              <div className="ti-audit-fill" style={{ width: `${socialPct}%` }} />
            </div>
            <span className="ti-audit-score">{socialPct}</span>
          </div>
        </section>

        {/* ── Token Info ── */}
        <section className="ti-section ti-section--last">
          <SectionLabel>Token Info</SectionLabel>
          <div className="ti-stat-grid">
            <StatCol label="Top 10 H.">
              <div className="ti-icon-val pos">
                <IconTrophy size={12} />
                <span className="ti-value pos">{coin.top10H}</span>
              </div>
            </StatCol>
            <StatCol label="Dev H.">
              <div className="ti-icon-val muted">
                <IconChefHat size={12} />
                <span className="ti-value muted">{coin.devH}</span>
              </div>
            </StatCol>
            <StatCol label="Snipers H.">
              <div className="ti-icon-val pos">
                <IconCrosshair size={12} />
                <span className="ti-value pos">{coin.snipersH}</span>
              </div>
            </StatCol>
          </div>
          <div className="ti-stat-grid">
            <StatCol label="Insiders H.">
              <div className="ti-icon-val pos">
                <IconGhost size={12} />
                <span className="ti-value pos">{coin.insidersH}</span>
              </div>
            </StatCol>
            <StatCol label="Bundlers H.">
              <div className="ti-icon-val pos">
                <IconLayers size={12} />
                <span className="ti-value pos">{coin.bundlersH}</span>
              </div>
            </StatCol>
            <StatCol label="Smart">
              <div className="ti-icon-val warn">
                <IconCandlestick size={12} />
                <span className="ti-value warn">{coin.smart}</span>
              </div>
            </StatCol>
          </div>
          <div className="ti-stat-grid">
            <StatCol label="Dev Migrated">
              <span className="ti-value warn">{coin.devMigrated}</span>
            </StatCol>
            <StatCol label="Dev History">
              <span className="ti-value muted">{coin.devHistory}</span>
            </StatCol>
            <div className="ti-stat-col" />
          </div>
        </section>
      </div>
    </>
  )
}
