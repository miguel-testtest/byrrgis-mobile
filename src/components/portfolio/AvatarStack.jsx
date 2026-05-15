import { useState } from 'react'

const CDN = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color'

function StackedAvatar({ symbol, bg, initial, size, offset }) {
  const [failed, setFailed] = useState(false)
  const src = symbol ? `${CDN}/${symbol.toLowerCase()}.png` : null
  const showImg = src && !failed

  return (
    <div
      className="astack__av"
      style={{
        width: size,
        height: size,
        background: showImg ? '#1a2030' : bg,
        marginLeft: offset,
      }}
    >
      {showImg ? (
        <img
          src={src}
          alt={symbol}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', display: 'block' }}
        />
      ) : (
        <span style={{ fontSize: size * 0.38, fontWeight: 700, color: '#fff' }}>{initial}</span>
      )}
    </div>
  )
}

export default function AvatarStack({ assets, size = 28, maxVisible = 2 }) {
  const visible = assets.slice(0, maxVisible)
  const rest = assets.length - maxVisible

  return (
    <div className="astack">
      {visible.map((a, i) => (
        <StackedAvatar
          key={a.id ?? i}
          symbol={a.symbol}
          bg={a.bg}
          initial={a.init}
          size={size}
          offset={i === 0 ? 0 : -(size * 0.3)}
        />
      ))}
      {rest > 0 && (
        <div
          className="astack__more"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.34,
            marginLeft: -(size * 0.3),
          }}
        >
          +{rest}
        </div>
      )}
    </div>
  )
}
