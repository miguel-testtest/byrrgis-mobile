export default function TradingProfileListSheet({ profiles, onSelect, onEdit, onNew, onDelete, onClose }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 150, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,10,0.55)' }} />

      <div style={{ position: 'relative', background: 'var(--color-surface-2)', borderRadius: '16px 16px 0 0', paddingBottom: 44 }}>
        <div style={{ width: 32, height: 3, borderRadius: 9999, background: 'var(--color-border)', margin: '16px auto 8px' }} />

        {profiles.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '14px 20px',
              background: 'none', border: 'none',
              borderBottom: i < profiles.length - 1 ? '1px solid var(--color-border)' : 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 18, display: 'flex', alignItems: 'center' }}>
                {p.active && (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: 15, fontWeight: 500,
                color: p.active ? 'var(--color-teal)' : 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
              }}>
                {p.name}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {p.active && (
                <button
                  onClick={e => { e.stopPropagation(); onEdit(p) }}
                  style={{
                    background: 'none', border: 'none', padding: 0,
                    color: 'var(--color-teal)', fontSize: 13, fontWeight: 500,
                    fontFamily: 'var(--font-ui)', cursor: 'pointer',
                  }}
                >
                  Open
                </button>
              )}
              <button
                onClick={e => { e.stopPropagation(); onDelete(p.id) }}
                style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', display: 'flex' }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </button>
        ))}

        <button
          onClick={onNew}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '14px 20px',
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-teal)', fontFamily: 'var(--font-ui)' }}>
            New profile
          </span>
        </button>
      </div>
    </div>
  )
}
