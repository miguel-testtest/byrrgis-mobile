const TABS = ['Trade', 'Transactions', 'Tables']

export default function DetailTabs({ active, onChange }) {
  return (
    <div className="detail-tabs">
      {TABS.map(tab => (
        <button
          key={tab}
          className={`detail-tab${active === tab ? ' active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
