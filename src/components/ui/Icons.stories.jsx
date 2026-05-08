import {
  IconSearch, IconChevronDown, IconChevronRight, IconChevronUp,
  IconFilters, IconSort, IconLock, IconBack, IconArrowUpRight, IconArrowDownRight,
  IconExternalLink, IconSwapArrows, IconSettings, IconX, IconTelegram, IconGlobe,
  IconSignal, IconWifi, IconBattery,
  IconUserCircle, IconShield, IconTrophy, IconCandlestick, IconUserStar,
  IconChefHat, IconCrosshair, IconGhost, IconLayers, IconCopy,
  IconChainBNB, IconChainSolana, IconChainEthereum,
  IconCoins, IconPacks, IconPortfolio, IconAutosell, IconGear,
} from './Icons'

function IconGrid({ icons }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, padding: 20, maxWidth: 430 }}>
      {icons.map(({ name, Icon, props }) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 60 }}>
          <div style={{ color: 'var(--color-text)' }}>
            <Icon {...props} />
          </div>
          <span style={{ fontSize: 9, color: 'var(--color-muted)', textAlign: 'center', lineHeight: 1.2 }}>{name}</span>
        </div>
      ))}
    </div>
  )
}

export default {
  title: 'UI / Icons',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const Interface = {
  render: () => (
    <IconGrid icons={[
      { name: 'Search', Icon: IconSearch },
      { name: 'ChevronDown', Icon: IconChevronDown, props: { size: 20 } },
      { name: 'ChevronRight', Icon: IconChevronRight },
      { name: 'ChevronUp', Icon: IconChevronUp, props: { size: 20 } },
      { name: 'Filters', Icon: IconFilters },
      { name: 'Sort', Icon: IconSort, props: { size: 20 } },
      { name: 'Lock', Icon: IconLock, props: { size: 16 } },
      { name: 'Back', Icon: IconBack },
      { name: 'ArrowUpRight', Icon: IconArrowUpRight, props: { size: 20 } },
      { name: 'ArrowDownRight', Icon: IconArrowDownRight, props: { size: 20 } },
      { name: 'ExternalLink', Icon: IconExternalLink, props: { size: 16 } },
      { name: 'SwapArrows', Icon: IconSwapArrows, props: { size: 20 } },
      { name: 'Settings', Icon: IconSettings, props: { size: 20 } },
      { name: 'X', Icon: IconX, props: { size: 20 } },
      { name: 'Telegram', Icon: IconTelegram, props: { size: 20 } },
      { name: 'Globe', Icon: IconGlobe, props: { size: 20 } },
      { name: 'Copy', Icon: IconCopy },
      { name: 'Gear', Icon: IconGear },
    ].map(i => ({ ...i, props: i.props || {} }))}
    />
  ),
}

export const Users = {
  render: () => (
    <IconGrid icons={[
      { name: 'UserCircle', Icon: IconUserCircle },
      { name: 'Shield', Icon: IconShield },
      { name: 'Trophy', Icon: IconTrophy },
      { name: 'Candlestick', Icon: IconCandlestick },
      { name: 'UserStar', Icon: IconUserStar },
      { name: 'ChefHat', Icon: IconChefHat },
      { name: 'Crosshair', Icon: IconCrosshair },
      { name: 'Ghost', Icon: IconGhost },
      { name: 'Layers', Icon: IconLayers },
    ].map(i => ({ ...i, props: i.props || {} }))}
    />
  ),
}

export const StatusBar = {
  render: () => (
    <IconGrid icons={[
      { name: 'Signal', Icon: IconSignal, props: {} },
      { name: 'Wifi', Icon: IconWifi, props: {} },
      { name: 'Battery', Icon: IconBattery, props: {} },
    ]}
    />
  ),
}

export const Chains = {
  render: () => (
    <IconGrid icons={[
      { name: 'BNB', Icon: IconChainBNB, props: { size: 24 } },
      { name: 'Solana', Icon: IconChainSolana, props: { size: 24 } },
      { name: 'Ethereum', Icon: IconChainEthereum, props: { size: 24 } },
    ]}
    />
  ),
}

export const Navigation = {
  render: () => (
    <IconGrid icons={[
      { name: 'Coins', Icon: IconCoins },
      { name: 'Packs', Icon: IconPacks },
      { name: 'Portfolio', Icon: IconPortfolio },
      { name: 'Autosell', Icon: IconAutosell, props: { size: 20 } },
    ].map(i => ({ ...i, props: i.props || {} }))}
    />
  ),
}
