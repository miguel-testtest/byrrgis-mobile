import { sparklinePath, sparklineColor } from '../../data/mockData'

export default function Sparkline({ trend, width = 72, height = 32 }) {
  return (
    <div className="sparkline">
      <svg width={width} height={height} viewBox="0 0 72 32" fill="none">
        <path
          d={sparklinePath(trend)}
          stroke={sparklineColor(trend)}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
