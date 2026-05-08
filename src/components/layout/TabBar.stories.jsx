import { MemoryRouter, Routes, Route } from 'react-router-dom'
import TabBar from './TabBar'

export default {
  title: 'Layout / TabBar',
  component: TabBar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, background: 'var(--color-bg)', height: 120, position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

export const CoinsActive = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
}

export const PacksActive = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/packs']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
}

export const PortfolioActive = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/portfolio']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
}
