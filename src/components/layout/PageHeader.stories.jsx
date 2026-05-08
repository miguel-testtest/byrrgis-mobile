import PageHeader from './PageHeader'
import { IconSearch, IconGear } from '../ui/Icons'

export default {
  title: 'Layout / PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const CoinsHeader = {
  args: {
    title: 'Coins',
    action: (
      <button className="search-icon-btn" aria-label="Search">
        <IconSearch />
      </button>
    ),
  },
}

export const PortfolioHeader = {
  args: {
    title: 'Portfolio',
    action: (
      <button className="search-icon-btn" aria-label="Settings">
        <IconGear />
      </button>
    ),
  },
}

export const NoAction = {
  args: { title: 'Packs' },
}
