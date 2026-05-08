import ScoreBadge from './ScoreBadge'

export default {
  title: 'UI / ScoreBadge',
  component: ScoreBadge,
  parameters: { layout: 'centered' },
}

export const High   = { args: { score: 91 } }
export const Medium = { args: { score: 74 } }
export const Low    = { args: { score: 42 } }

export const AllScores = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {[91, 87, 78, 74, 69, 58, 42].map(s => (
        <ScoreBadge key={s} score={s} />
      ))}
    </div>
  ),
}
