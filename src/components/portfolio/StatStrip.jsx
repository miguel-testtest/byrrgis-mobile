export default function StatStrip({ stats }) {
  return (
    <div className="port-stat-strip">
      <div className="port-stat-panel">
        <div className="port-stat-grid">

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Total Value</div>
            <div className="port-stat-cell__value">
              {stats.totalValue} <span className="port-stat-cell__unit">USD</span>
            </div>
            <div className={`port-stat-cell__sub ${stats.totalGainPos ? 'pos' : 'neg'}`}>
              {stats.totalGain} ({stats.totalGainPct})
              <span className="port-stat-cell__period">{stats.totalGainPeriod}</span>
            </div>
          </div>

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Total Invested</div>
            <div className="port-stat-cell__value">
              {stats.invested} <span className="port-stat-cell__unit">USD</span>
            </div>
          </div>

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Unrealised P&amp;L</div>
            <div className="port-stat-cell__value">
              {stats.unrealisedPnl} <span className="port-stat-cell__unit">USD</span>
            </div>
            <div className={`port-stat-cell__sub ${stats.unrealisedPos ? 'pos' : 'neg'}`}>
              {stats.unrealisedPnlPct}
              <span className="port-stat-cell__period">all time</span>
            </div>
          </div>

          <div className="port-stat-cell">
            <div className="port-stat-cell__label">Realised P&amp;L</div>
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
          <span className="port-stat-triggers__label">active triggers</span>
          <span className="port-trigger-pill tp">{stats.tpCount} TP</span>
          <span className="port-trigger-pill sl">{stats.slCount} SL</span>
        </div>
      </div>
    </div>
  )
}
