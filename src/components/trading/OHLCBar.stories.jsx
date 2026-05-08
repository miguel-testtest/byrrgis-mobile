import OHLCBar from './OHLCBar'

export default {
  title: 'Trading / OHLCBar',
  component: OHLCBar,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: {
    ohlc: { O: '169.1', H: '172.8', L: '163.1', C: '169.4', chg: '-1.1%', neg: true },
  },
}

export const Positive = {
  args: {
    ohlc: { O: '165.0', H: '175.2', L: '164.0', C: '174.8', chg: '+5.9%', neg: false },
  },
}
