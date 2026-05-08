import InfoCard from './InfoCard'

export default {
  title: 'UI / InfoCard',
  component: InfoCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}

export const OpenByDefault = {
  args: {
    title: 'Market',
    defaultOpen: true,
    children: (
      <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
        <p>MCap: $2.50B</p>
        <p>Supply: 16M</p>
        <p>Holders: 857K</p>
      </div>
    ),
  },
}

export const CollapsedByDefault = {
  args: {
    title: 'Token Info',
    defaultOpen: false,
    children: (
      <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
        Top10 Holders: 1.9%
      </div>
    ),
  },
}

export const WithCustomHeader = {
  args: {
    title: 'Vetting Score',
    headerRight: (
      <span className="score-pill">87 · High</span>
    ),
    defaultOpen: true,
    children: (
      <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
        Technical: 85 · Social: 82
      </div>
    ),
  },
}
