import { useState } from 'react'
import TradingViewChart from './TradingViewChart'

export default {
  title: 'Trading / TradingViewChart',
  component: TradingViewChart,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, height: 420, background: 'var(--color-bg)', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: { symbol: 'AAVE', interval: '1D' },
}

export const OneHour = {
  args: { symbol: 'BTC', interval: '1h' },
}

export const FourHour = {
  args: { symbol: 'SOL', interval: '4h' },
}

export const Weekly = {
  args: { symbol: 'ETH', interval: '1W' },
}

export const Interactive = {
  render: () => {
    const [symbol, setSymbol] = useState('AAVE')
    const [interval, setInterval] = useState('1D')
    const intervals = ['1m', '5m', '1h', '4h', '1D', '1W']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', gap: 8, padding: '8px 12px', flexWrap: 'wrap' }}>
          {['AAVE', 'BTC', 'ETH', 'SOL'].map((s) => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                background: symbol === s ? 'var(--color-accent)' : 'var(--color-surface)',
                color: 'var(--color-text)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
          {intervals.map((iv) => (
            <button
              key={iv}
              onClick={() => setInterval(iv)}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                background: interval === iv ? 'var(--color-accent)' : 'var(--color-surface)',
                color: 'var(--color-text)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {iv}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <TradingViewChart symbol={symbol} interval={interval} />
        </div>
      </div>
    )
  },
}

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { symbol: 'BTC', interval: '1D' },
        { symbol: 'ETH', interval: '1h' },
      ].map(({ symbol, interval }) => (
        <div key={`${symbol}-${interval}`} style={{ height: 280, position: 'relative' }}>
          <TradingViewChart symbol={symbol} interval={interval} />
        </div>
      ))}
    </div>
  ),
}
