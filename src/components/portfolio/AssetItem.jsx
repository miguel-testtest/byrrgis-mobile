import { IconChevronRight, IconChainSolana, IconChainEthereum } from '../ui/Icons'
import TpSlTag from '../ui/TpSlTag'
import AssetExpand from './AssetExpand'

function PackAvatar({ emoji }) {
  return (
    <div className="asset-av">
      <span style={{ fontSize: 22 }}>{emoji}</span>
    </div>
  )
}

function CoinAvatar({ bg, init, chain }) {
  const ChainIcon = chain === 'Solana' ? IconChainSolana : IconChainEthereum
  return (
    <div className="asset-av round" style={{ background: bg }}>
      {init}
      <div className="asset-chain-dot"><ChainIcon /></div>
    </div>
  )
}

function coinDisplayName(name, sub) {
  const slash = name.indexOf(' / ')
  if (slash === -1) return { name, sub }
  return {
    name: name.slice(0, slash),
    sub: `${name.slice(slash + 3)} · ${sub}`,
  }
}

export default function AssetItem({ asset, type, miniCoins = [], expandedId, onToggle, onAction }) {
  const isExpanded = expandedId === asset.id
  const { name, sub } = type === 'coin'
    ? coinDisplayName(asset.name, asset.sub)
    : { name: asset.name, sub: asset.sub }

  return (
    <div className={`asset-item${isExpanded ? ' expanded' : ''}`}>
      <div className="asset-row" onClick={() => onAction(asset.id, type, 'sell')}>
        {type === 'pack'
          ? <PackAvatar emoji={asset.emoji} />
          : <CoinAvatar bg={asset.bg} init={asset.init} chain={asset.chain} />
        }

        <div className="asset-info">
          <div className="asset-name">{name}</div>
          <div className="asset-sub">{sub}</div>
        </div>

        <div className="asset-badges">
          <div className="asset-score">{asset.score}</div>
          {asset.tpsl && <TpSlTag />}
        </div>

        <div className="asset-val-col">
          <div className="asset-val">{asset.val}</div>
          <div className={`asset-chg ${asset.pos ? 'pos' : 'neg'}`}>{asset.chg}</div>
        </div>

        <span
          className="asset-chevron"
          onClick={e => { e.stopPropagation(); onToggle(asset.id) }}
        >
          <IconChevronRight size={16} />
        </span>
      </div>

      <div className="asset-expand">
        <AssetExpand
          asset={asset}
          type={type}
          miniCoins={miniCoins}
          onAction={onAction}
        />
      </div>
    </div>
  )
}
