import AvatarStack from './AvatarStack'

const MOCK_ASSETS = [
  { id: 'sol',  symbol: 'SOL', bg: '#9945FF', init: 'S' },
  { id: 'eth',  symbol: 'ETH', bg: '#627EEA', init: 'E' },
  { id: 'bnb',  symbol: 'BNB', bg: '#F3BA2F', init: 'B' },
  { id: 'avax', symbol: 'AVAX', bg: '#E84142', init: 'A' },
]

export default {
  title: 'Portfolio / AvatarStack',
  component: AvatarStack,
  parameters: { layout: 'centered' },
}

export const Default = {
  args: { assets: MOCK_ASSETS, size: 28, maxVisible: 2 },
}

export const ShowThree = {
  args: { assets: MOCK_ASSETS, size: 28, maxVisible: 3 },
}

export const ShowAll = {
  args: { assets: MOCK_ASSETS, size: 28, maxVisible: 4 },
}

export const Large = {
  args: { assets: MOCK_ASSETS, size: 36, maxVisible: 2 },
}

export const Single = {
  args: { assets: [MOCK_ASSETS[0]], size: 28, maxVisible: 2 },
}

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24, background: 'var(--color-bg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-ui)', width: 80 }}>maxVisible 2</span>
        <AvatarStack assets={MOCK_ASSETS} size={28} maxVisible={2} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-ui)', width: 80 }}>maxVisible 3</span>
        <AvatarStack assets={MOCK_ASSETS} size={28} maxVisible={3} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-ui)', width: 80 }}>size 36</span>
        <AvatarStack assets={MOCK_ASSETS} size={36} maxVisible={2} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-ui)', width: 80 }}>single</span>
        <AvatarStack assets={[MOCK_ASSETS[0]]} size={28} maxVisible={2} />
      </div>
    </div>
  ),
}
