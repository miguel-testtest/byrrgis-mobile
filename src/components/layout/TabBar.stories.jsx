import TabBar from './TabBar'

export default {
  title: 'Layout / TabBar',
  component: TabBar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', height: 120, position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

export const PortfolioActive = {
  parameters: { initialPath: '/' },
}

export const CoinsActive = {
  parameters: { initialPath: '/coins' },
}

export const PacksActive = {
  parameters: { initialPath: '/packs' },
}
