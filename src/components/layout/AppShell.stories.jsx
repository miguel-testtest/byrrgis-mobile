import AppShell from './AppShell'

export default {
  title: 'Layout / AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, height: 932, background: 'var(--color-bg)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithContent = {
  render: () => (
    <AppShell>
      <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 56, borderRadius: 10,
              background: 'var(--color-surface)',
              opacity: 1 - i * 0.1,
            }}
          />
        ))}
      </div>
    </AppShell>
  ),
}

export const Empty = {
  render: () => <AppShell />,
}
