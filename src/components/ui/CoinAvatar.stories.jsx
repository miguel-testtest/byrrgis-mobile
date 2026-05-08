import CoinAvatar from './CoinAvatar'

export default {
  title: 'UI / CoinAvatar',
  component: CoinAvatar,
  parameters: { layout: 'centered' },
  argTypes: {
    chain: { control: 'select', options: ['Ethereum', 'Solana', null] },
    size:  { control: { type: 'range', min: 24, max: 64, step: 4 } },
  },
}

export const Default = {
  args: { avatarBg: '#B6509E', initial: 'A', chain: 'Ethereum', size: 40 },
}
export const SolanaChain = {
  args: { avatarBg: '#D4620A', initial: 'B', chain: 'Solana', size: 40 },
}
export const EmojiToken = {
  args: { avatarBg: '#FF007A', initial: '🦄', chain: 'Ethereum', emoji: true, size: 40 },
}
export const Large = {
  args: { avatarBg: '#4E44CE', initial: 'R', chain: 'Solana', size: 52 },
}
export const NoChain = {
  args: { avatarBg: '#26A17B', initial: 'U', size: 40 },
}

export const Gallery = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <CoinAvatar avatarBg="#B6509E" initial="A" chain="Ethereum" size={40} />
      <CoinAvatar avatarBg="#D4620A" initial="B" chain="Solana"   size={40} />
      <CoinAvatar avatarBg="#FF007A" initial="🦄" chain="Ethereum" emoji size={40} />
      <CoinAvatar avatarBg="#4E44CE" initial="R" chain="Solana"   size={40} />
      <CoinAvatar avatarBg="#26A17B" initial="U" chain="Ethereum" size={40} />
      <CoinAvatar avatarBg="#B8860B" initial="T" chain="Solana"   size={40} />
    </div>
  ),
}
