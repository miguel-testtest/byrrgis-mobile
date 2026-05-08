import RiskBadge from './RiskBadge'

export default {
  title: 'UI / RiskBadge',
  component: RiskBadge,
  parameters: { layout: 'centered' },
}

export const High  = { args: { level: 'high' } }
export const Med   = { args: { level: 'med' } }
export const Low   = { args: { level: 'low' } }
export const VLow  = { args: { level: 'vlow' } }

export const AllLevels = {
  render: () => (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <RiskBadge level="high" />
      <RiskBadge level="med" />
      <RiskBadge level="low" />
      <RiskBadge level="vlow" />
    </div>
  ),
}
