import { useState } from 'react'

function UserAvatar({ user, size = 32 }) {
  const [failed, setFailed] = useState(false)
  const hasImg = user?.avatarUrl && !failed

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: hasImg ? 'var(--color-surface-2)' : (user?.avatarColor || 'var(--color-surface-3)'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {hasImg ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <span style={{
          color: 'var(--text-primary)',
          fontSize: Math.round(size * 0.4),
          fontWeight: 700,
          fontFamily: 'var(--font-ui)',
          lineHeight: 1,
        }}>
          {(user?.initial || user?.name?.[0] || '?').toUpperCase()}
        </span>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export default function TopBar({ user, onProfilePress, onSearchPress }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 32,
      marginTop: 12,
      marginBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
      flexShrink: 0,
    }}>
      <button
        onClick={onProfilePress}
        aria-label="Open profile"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <UserAvatar user={user} size={32} />
      </button>

      <button
        onClick={onSearchPress}
        aria-label="Search"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          transition: 'color 120ms cubic-bezier(0.2,0,0,1)',
        }}
      >
        <SearchIcon />
      </button>
    </div>
  )
}
