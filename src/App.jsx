import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Agentation } from 'agentation'
import CoinsPage from './pages/CoinsPage'
import CoinDetailPage from './pages/CoinDetailPage'
import PortfolioPage from './pages/PortfolioPage'
import PacksPage from './pages/PacksPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/coins" element={<CoinsPage />} />
        <Route path="/coin/:id" element={<CoinDetailPage />} />
        <Route path="/packs" element={<PacksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </HashRouter>
  )
}
