import Sparkline from './Sparkline'

export default {
  title: 'UI / Sparkline',
  component: Sparkline,
  parameters: { layout: 'centered' },
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'flat'] },
  },
}

export const Up   = { args: { trend: 'up' } }
export const Down = { args: { trend: 'down' } }
export const Flat = { args: { trend: 'flat' } }

export const AllTrends = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Sparkline trend="up" />
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Up</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Sparkline trend="down" />
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Down</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Sparkline trend="flat" />
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Flat</div>
      </div>
    </div>
  ),
}
