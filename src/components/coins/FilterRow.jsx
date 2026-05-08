import { IconChevronDown, IconFilters } from '../ui/Icons'

export default function FilterRow({ network, time, onNetworkOpen, onTimeOpen }) {
  return (
    <div className="filter-row">
      <button className="filter-select" onClick={onNetworkOpen}>
        {network}
        <IconChevronDown />
      </button>
      <button className="filter-select" onClick={onTimeOpen}>
        {time}
        <IconChevronDown />
      </button>
      <button className="filter-icon-btn" aria-label="More filters">
        <IconFilters />
      </button>
    </div>
  )
}
