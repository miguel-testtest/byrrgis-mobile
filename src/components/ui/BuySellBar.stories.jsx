import BuySellBar from './BuySellBar'

export default {
  title: 'UI / BuySellBar',
  component: BuySellBar,
  parameters: { layout: 'padded' },
  argTypes: {
    buyPct: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
}

export const BullishWithLabels = {
  args: { buyPct: 62, buys: '1.2K', sells: '740', showLabels: true },
}
export const BearishWithLabels = {
  args: { buyPct: 39, buys: '18.2K', sells: '28.5K', showLabels: true },
}
export const BarOnly = {
  args: { buyPct: 62, showLabels: false },
}
export const Even = {
  args: { buyPct: 50, buys: '500', sells: '500', showLabels: true },
}
