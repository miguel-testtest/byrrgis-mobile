import { IconChainSolana, IconChainEthereum } from '../ui/Icons'

export default function MiniCoinRow({ coin }) {
  const ChainIcon = coin.chain === 'Solana' ? IconChainSolana : IconChainEthereum

  return (
    <div className="ae-coin-row">
      <div className="aecr-av" style={{ background: coin.bg }}>
        {coin.init}
        <div className="aecr-chain"><ChainIcon /></div>
      </div>
      <span className="aecr-name">{coin.name}</span>
      <div className="aecr-score">{coin.score}</div>
      <span className="aecr-val">{coin.val}</span>
      <span className={`aecr-chg ${coin.pos ? 'pos' : 'neg'}`}>{coin.chg}</span>
    </div>
  )
}
