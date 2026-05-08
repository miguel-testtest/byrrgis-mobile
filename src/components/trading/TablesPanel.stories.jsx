import TablesPanel from './TablesPanel'

export default {
  title: 'Trading / TablesPanel',
  component: TablesPanel,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = {}
