import { useState } from 'react'
import TradingPanel from './TradingPanel'

export default {
  title: 'Trading / TradingPanel',
  component: TradingPanel,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', position: 'relative', height: 280 }}>
        <Story />
      </div>
    ),
  ],
}

export const BuyMode = {
  args: { activeOp: 'buy', onOpChange: () => {}, onAdvClick: () => {}, symbol: 'AAVE' },
}

export const SellMode = {
  args: { activeOp: 'sell', onOpChange: () => {}, onAdvClick: () => {}, symbol: 'AAVE' },
}

export const SwapMode = {
  args: { activeOp: 'swap', onOpChange: () => {}, onAdvClick: () => {}, symbol: 'AAVE' },
}

export const Interactive = {
  render: () => {
    const [op, setOp] = useState('buy')
    return (
      <TradingPanel
        activeOp={op}
        onOpChange={setOp}
        onAdvClick={() => {}}
        symbol="AAVE"
      />
    )
  },
}
