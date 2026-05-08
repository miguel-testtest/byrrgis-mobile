const TABS = ['Vetted', 'Trending', 'Blue Chips', 'New Listings']

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="category-tabs">
      {TABS.map(tab => (
        <button
          key={tab}
          className={`category-tab${active === tab ? ' active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
