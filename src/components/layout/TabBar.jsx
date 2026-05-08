import { useNavigate, useLocation } from 'react-router-dom'
import { IconCoins, IconPacks, IconPortfolio } from '../ui/Icons'

const TABS = [
  { path: '/',          label: 'Coins',     Icon: IconCoins },
  { path: '/packs',     label: 'Packs',     Icon: IconPacks },
  { path: '/portfolio', label: 'Portfolio', Icon: IconPortfolio },
]

export default function TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="tab-bar">
      {TABS.map(({ path, label, Icon }) => (
        <button
          key={path}
          className={`tab-item${pathname === path ? ' active' : ''}`}
          onClick={() => navigate(path)}
        >
          <Icon />
          <span className="tab-item__label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
