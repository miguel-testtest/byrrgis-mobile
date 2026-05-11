import { useEffect, useRef } from 'react'

const INTERVAL_MAP = {
  '1s': '1S',
  '1m': '1',
  '5m': '5',
  '1h': '60',
  '4h': '240',
  '1D': 'D',
  '1W': 'W',
  '1M': 'M',
}

export default function TradingViewChart({ symbol = 'AAVE', interval = '1D' }) {
  const containerRef = useRef()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}USDT`,
      interval: INTERVAL_MAP[interval] ?? interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      hide_top_toolbar: false,
      hide_legend: true,
      hide_side_toolbar: true,
      save_image: false,
      calendar: false,
    })
    el.appendChild(script)

    return () => { el.innerHTML = '' }
  }, [symbol, interval])

  return <div className="tv-chart-wrap" ref={containerRef} />
}
