import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { IconChainSolana, IconChainEthereum, IconChevronDown, IconAutosell, IconSwapArrows } from '../ui/Icons'
import MiniCoinRow from './MiniCoinRow'

export default function AssetActionSheet({ sheet, packs, coins, miniCoins = [], onClose }) {
  const [activeTab, setActiveTab] = useState('sell')
  const [swapAmount, setSwapAmount] = useState('')

  useEffect(() => {
    if (sheet) {
      setActiveTab(sheet.tab)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sheet])

  const asset = sheet
    ? (sheet.type === 'pack' ? packs.find(p => p.id === sheet.id) : coins.find(c => c.id === sheet.id))
    : null

  const isOpen = !!sheet
  const isPack = sheet?.type === 'pack'
  const visibleCoins = isPack ? miniCoins.slice(0, 4) : []
  const more = isPack && asset ? Math.max(0, (asset.coinCount ?? 0) - visibleCoins.length) : 0

  return createPortal(
    <>
      <div
        className={`sheet-overlay${isOpen ? ' visible' : ''}`}
        onClick={onClose}
      />

      <div className={`action-sheet${isOpen ? ' open' : ''}`}>
        <div className="as-handle">
          <div className="as-handle-bar" />
        </div>

        {asset && (
          <>
            <div className="as-asset-row">
              {sheet.type === 'pack' || asset.emoji ? (
                <div className="as-asset-av pack">
                  <span>{asset.emoji}</span>
                </div>
              ) : (
                <div className="as-asset-av" style={{ background: asset.bg }}>
                  <span>{asset.init}</span>
                  <div className="as-asset-chain">
                    {asset.chain === 'Solana' ? <IconChainSolana /> : <IconChainEthereum />}
                  </div>
                </div>
              )}
              <div className="as-asset-info">
                <div className="as-asset-top">
                  <span className="as-asset-name">{asset.name}</span>
                  <span className="as-asset-val">{asset.val}</span>
                </div>
                {asset.stats && (
                  <div className="as-inline-stats">
                    <span className="as-istat">
                      <span className="as-istat-label">Invested</span>
                      <span className="as-istat-value">{asset.stats.inv}</span>
                    </span>
                    <span className="as-istat-sep" />
                    <span className="as-istat">
                      <span className="as-istat-label">P&L</span>
                      <span className={`as-istat-value ${asset.stats.pnlPos ? 'pos' : 'neg'}`}>{asset.stats.pnl}</span>
                    </span>
                    <span className="as-istat-sep" />
                    <span className={`as-istat-pct ${asset.stats.pnlPos ? 'pos' : 'neg'}`}>{asset.stats.pnlPct}</span>
                  </div>
                )}
              </div>
            </div>

            {isPack && visibleCoins.length > 0 && (
              <div className="as-coins-section">
                <div className="ae-coins-hdr">Coins ({asset.coinCount})</div>
                {visibleCoins.map((c, i) => <MiniCoinRow key={i} coin={c} />)}
                {more > 0 && (
                  <div className="ae-more-hint">↓ {more} more coin{more > 1 ? 's' : ''}</div>
                )}
              </div>
            )}

            <div className="as-tab-row">
              <button
                className={`as-tab-pill${activeTab === 'sell' ? ' active' : ''}`}
                onClick={() => setActiveTab('sell')}
              >
                Sell
              </button>
              <button
                className={`as-tab-pill swap-pill${activeTab === 'swap' ? ' active' : ''}`}
                onClick={() => setActiveTab('swap')}
              >
                <IconSwapArrows size={13} />
                Swap
              </button>
              <button
                className={`as-tab-pill autosell-pill${activeTab === 'autosell' ? ' active' : ''}`}
                onClick={() => setActiveTab('autosell')}
              >
                <IconAutosell size={13} />
                Auto-sell
              </button>
            </div>

            <div className="as-body">
              <div className={`as-content${activeTab === 'sell' ? ' active' : ''}`}>
                <div className="as-amount-row">
                  <input
                    className="as-amount-input"
                    type="number"
                    placeholder="0.00"
                  />
                  <div className="as-token-pill">
                    <span>{asset.symbol}</span>
                    <IconChevronDown size={12} />
                  </div>
                </div>
                <div className="as-balance-row">
                  <span>Position: {asset.val}</span>
                  <button className="as-max-btn">MAX</button>
                </div>
                <div className="as-quick-row">
                  <button className="as-quick-btn">25%</button>
                  <button className="as-quick-btn">50%</button>
                  <button className="as-quick-btn">75%</button>
                  <button className="as-quick-btn">All</button>
                </div>
                <div className="as-fee-row">
                  <span>Est. network fee</span>
                  <span>0.04</span>
                </div>
                <button className="as-cta-btn">Sell {asset.name}</button>
              </div>

              <div className={`as-content${activeTab === 'swap' ? ' active' : ''}`}>
                <div className="as-swap-label">You pay</div>
                <div className="as-amount-row">
                  <input
                    className="as-amount-input"
                    type="number"
                    placeholder="0.00"
                    value={swapAmount}
                    onChange={e => setSwapAmount(e.target.value)}
                  />
                  <div className="as-token-pill">
                    <span>{asset.symbol}</span>
                    <IconChevronDown size={12} />
                  </div>
                </div>
                <div className="as-balance-row">
                  <span>Position: {asset.val}</span>
                  <button className="as-max-btn">MAX</button>
                </div>
                <div className="as-swap-divider">
                  <IconSwapArrows size={16} />
                </div>
                <div className="as-swap-label">You receive</div>
                <div className="as-amount-row" style={{ paddingBottom: 12 }}>
                  <input
                    className="as-amount-input"
                    type="number"
                    placeholder="0.00"
                    readOnly
                    value=""
                  />
                  <div className="as-token-pill">
                    <span>USDC</span>
                    <IconChevronDown size={12} />
                  </div>
                </div>
                <div className="as-fee-row">
                  <span>Est. network fee</span>
                  <span>0.04</span>
                </div>
                <div className="as-fee-row">
                  <span>Platform fee</span>
                  <span>0.5%</span>
                </div>
                <button className="as-cta-btn as-swap-cta">Swap {asset.name}</button>
              </div>

              <div className={`as-content${activeTab === 'autosell' ? ' active' : ''}`}>
                <div className="as-fields-row">
                  <div className="as-field">
                    <div className="as-field-label">Stop Loss</div>
                    <input className="as-field-input" type="text" placeholder="e.g. -10%" />
                  </div>
                  <div className="as-field">
                    <div className="as-field-label">Take Profit</div>
                    <input className="as-field-input" type="text" placeholder="e.g. +25%" />
                  </div>
                </div>
                <button className="as-autosell-btn">Start auto-sell</button>
                <p className="as-disclaimer">
                  Enabling this will automatically pause your portfolio's global auto-sell rule.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  )
}
