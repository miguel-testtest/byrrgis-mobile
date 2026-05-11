import { useState } from 'react'
import StatusBar from '../components/layout/StatusBar'
import DetailHeader from '../components/trading/DetailHeader'
import DetailTabs from '../components/trading/DetailTabs'
import TradingViewChart from '../components/trading/TradingViewChart'
import TradingPanel from '../components/trading/TradingPanel'
import TransactionList from '../components/trading/TransactionList'
import TablesPanel from '../components/trading/TablesPanel'
import { aaveDetail } from '../data/mockData'

export default function CoinDetailPage() {
  const coin = aaveDetail

  const [activePanel, setActivePanel] = useState('Trade')
  const [activeOp, setActiveOp]       = useState('buy')
  const isTradePanel = activePanel === 'Trade'

  return (
    <div className="app">
      <StatusBar />
      <DetailHeader coin={coin} />
      <DetailTabs active={activePanel} onChange={setActivePanel} />

      <div
        className="scroll-area"
        style={isTradePanel
          ? { overflow: 'hidden', display: 'flex', flexDirection: 'column', paddingBottom: 0 }
          : { paddingBottom: '24px' }
        }
      >
        {/* TRADE */}
        <div
          className={`detail-panel${isTradePanel ? ' active' : ''}`}
          style={isTradePanel ? { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' } : undefined}
        >
          <TradingViewChart symbol={coin.symbol} />
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
          symbol={coin.symbol}
        />
      )}
    </div>
  )
}
