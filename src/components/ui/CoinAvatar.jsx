import { IconChainSolana, IconChainEthereum } from './Icons'

function ChainBadge({ chain }) {
  const Icon = chain === 'Solana' ? IconChainSolana : IconChainEthereum
  return (
    <div className="token-cell__chain-badge">
      <Icon />
    </div>
  )
}

export default function CoinAvatar({ avatarBg, initial, chain, emoji, size = 40, fontSize }) {
  const fs = fontSize || (emoji ? 17 : size === 36 ? 13 : size === 52 ? 20 : 14)

  return (
    <div className="token-cell__avatar">
      <div
        className="token-cell__avatar-img"
        style={{ background: avatarBg, width: size, height: size, fontSize: fs }}
      >
        {initial}
      </div>
      {chain && <ChainBadge chain={chain} />}
    </div>
  )
}
