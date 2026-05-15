import { useState } from 'react'

const CDN = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color'

const CHAIN_LOGO = {
  Solana:   `${CDN}/sol.png`,
  Ethereum: `${CDN}/eth.png`,
}

function ChainBadge({ chain }) {
  const src = CHAIN_LOGO[chain]
  return (
    <div className="token-cell__chain-badge">
      {src && (
        <img
          src={src}
          alt={chain}
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', display: 'block' }}
        />
      )}
    </div>
  )
}

export default function CoinAvatar({ avatarBg, initial, chain, emoji, imageUrl, symbol, size = 40, fontSize }) {
  const [failed, setFailed] = useState(false)

  const src = imageUrl || (symbol ? `${CDN}/${symbol.toLowerCase()}.png` : null)
  const showImg = src && !failed

  const fs = fontSize || (emoji ? 17 : size === 36 ? 13 : size === 52 ? 20 : 14)

  return (
    <div className="token-cell__avatar">
      <div
        className="token-cell__avatar-img"
        style={{
          background: showImg ? '#1a2030' : avatarBg,
          width: size,
          height: size,
          fontSize: fs,
        }}
      >
        {showImg ? (
          <img
            src={src}
            alt={symbol}
            onError={() => setFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', display: 'block' }}
          />
        ) : initial}
      </div>
      {chain && <ChainBadge chain={chain} />}
    </div>
  )
}
