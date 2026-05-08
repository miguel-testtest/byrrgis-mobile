import { IconChevronUp } from '../ui/Icons'

export default function PortfolioHero({ value, pnl24h, pnlAll }) {
  return (
    <div className="portfolio-hero">
      <div className="portfolio-hero__label">Total Value</div>
      <div className="portfolio-hero__value">{value}</div>
      <div className="portfolio-hero__pnl-row">
        <div className={`pnl-chip ${pnl24h.pos ? 'pos' : 'neg'}`}>
          <IconChevronUp />
          {pnl24h.value}
          <span className="pnl-chip__label">24H</span>
        </div>
        <div className={`pnl-chip ${pnlAll.pos ? 'pos' : 'neg'}`}>
          <IconChevronUp />
          {pnlAll.value}
          <span className="pnl-chip__label">ALL</span>
        </div>
      </div>
    </div>
  )
}
