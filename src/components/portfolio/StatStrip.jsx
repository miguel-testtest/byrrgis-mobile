export default function StatStrip({ stats }) {
  return (
    <div className="port-stat-strip">

        <div className="port-stat-hero">
          <div className="port-stat-hero__header">
            <span className="port-stat-cell__label">Total Value</span>
            <span className="port-stat-hero__currency">USD</span>
          </div>
          <div className="port-stat-hero__value">{stats.totalValue}</div>
          <div className={`port-stat-hero__sub ${stats.totalGainPos ? 'pos' : 'neg'}`}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              {stats.totalGainPos
                ? <path d="M4.5 1.5L8 7.5H1L4.5 1.5Z" fill="currentColor"/>
                : <path d="M4.5 7.5L1 1.5H8L4.5 7.5Z" fill="currentColor"/>}
            </svg>
            {stats.totalGain} {stats.totalGainPct}
            <span className="port-stat-cell__period">{stats.totalGainPeriod}</span>
          </div>
        </div>

        <div className="port-stat-row">
          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Invested</div>
            <div className="port-stat-cell__value">
              {stats.invested} <span className="port-stat-cell__unit">USD</span>
            </div>
          </div>

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Unreal. P&amp;L</div>
            <div className="port-stat-cell__value">
              {stats.unrealisedPnl} <span className="port-stat-cell__unit">USD</span>
            </div>
            <div className={`port-stat-cell__sub ${stats.unrealisedPos ? 'pos' : 'neg'}`}>
              {stats.unrealisedPnlPct}
              <span className="port-stat-cell__period">all time</span>
            </div>
          </div>

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Real. P&amp;L</div>
            <div className="port-stat-cell__value">
              {stats.realisedPnl} <span className="port-stat-cell__unit">USD</span>
            </div>
            <div className={`port-stat-cell__sub ${stats.realisedPos ? 'pos' : 'neg'}`}>
              {stats.realisedPnlPct}
              <span className="port-stat-cell__period">all time</span>
            </div>
          </div>
        </div>

        <div className="port-stat-triggers">
          <span className="port-stat-triggers__count">{stats.activeTriggers}</span>
          <span className="port-stat-triggers__label">on autosell</span>
          <span className="port-trigger-pill tp">{stats.tpCount} TP</span>
          <span className="port-trigger-pill sl">{stats.slCount} SL</span>
        </div>

    </div>
  )
}
