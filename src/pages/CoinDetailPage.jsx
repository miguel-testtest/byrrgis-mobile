import { useState } from 'react'
import StatusBar from '../components/layout/StatusBar'
import DetailHeader from '../components/trading/DetailHeader'
import DetailTabs from '../components/trading/DetailTabs'
import OHLCBar from '../components/trading/OHLCBar'
import TimeSelector from '../components/trading/TimeSelector'
import CandlestickChart from '../components/trading/CandlestickChart'
import TradingPanel from '../components/trading/TradingPanel'
import AdvancedSheet from '../components/trading/AdvancedSheet'
import TransactionList from '../components/trading/TransactionList'
import TablesPanel from '../components/trading/TablesPanel'
import BuySellBar from '../components/ui/BuySellBar'
import { aaveDetail } from '../data/mockData'

export default function CoinDetailPage() {
  const coin = aaveDetail

  const [activePanel, setActivePanel] = useState('Trade')
  const [activeOp, setActiveOp]       = useState('buy')
  const [activeTime, setActiveTime]   = useState('1D')
  const [advOpen, setAdvOpen]         = useState(false)

  const isTradePanel = activePanel === 'Trade'

  return (
    <div className="app">
      <StatusBar />
      <DetailHeader coin={coin} />
      <DetailTabs active={activePanel} onChange={setActivePanel} />

      <div
        className="scroll-area"
        style={{ paddingBottom: isTradePanel ? 'calc(236px + env(safe-area-inset-bottom, 0px))' : '80px' }}
      >
        {/* TRADE */}
        <div className={`detail-panel${isTradePanel ? ' active' : ''}`}>
          <OHLCBar ohlc={coin.ohlc} />
          <TimeSelector active={activeTime} onChange={setActiveTime} />
          <CandlestickChart candles={coin.candles} currentPrice="169.42" />
          <div className="bs-strip">
            <BuySellBar buyPct={62} showLabels={false} />
            <div className="bs-strip__counts">
              <span className="buy-ct">▲ {coin.buys.toLocaleString()} buys</span>
              <span>·</span>
              <span className="sell-ct">▼ {coin.sells.toLocaleString()} sells</span>
            </div>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className={`detail-panel${activePanel === 'Transactions' ? ' active' : ''}`}>
          <TransactionList transactions={coin.transactions} />
        </div>

        {/* TABLES */}
        <div className={`detail-panel${activePanel === 'Tables' ? ' active' : ''}`}>
          <TablesPanel />
        </div>
      </div>

      {isTradePanel && (
        <TradingPanel
          activeOp={activeOp}
          onOpChange={setActiveOp}
          onAdvClick={() => setAdvOpen(true)}
          symbol={coin.symbol}
        />
      )}

      <AdvancedSheet open={advOpen} onClose={() => setAdvOpen(false)} />
    </div>
  )
}
