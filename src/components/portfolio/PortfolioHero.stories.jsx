import PortfolioHero from './PortfolioHero'

export default {
  title: 'Portfolio / PortfolioHero',
  component: PortfolioHero,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Positive = {
  args: {
    value: '$24,831.40',
    pnl24h: { value: '+$412.18', pos: true },
    pnlAll:  { value: '+$3,241.60', pos: true },
  },
}

export const Negative = {
  args: {
    value: '$18,240.00',
    pnl24h: { value: '-$1,320.50', pos: false },
    pnlAll:  { value: '-$2,800.00', pos: false },
  },
}

export const Mixed = {
  args: {
    value: '$21,589.80',
    pnl24h: { value: '+$412.18', pos: true },
    pnlAll:  { value: '-$542.00', pos: false },
  },
}
