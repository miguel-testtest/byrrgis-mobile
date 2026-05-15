import { MemoryRouter } from 'react-router-dom'
import '../src/styles/globals.css'

/** Viewport preset: iPhone 14 Pro (430px) */
const MOBILE = {
  name: 'Mobile 430',
  styles: { width: '430px', height: '932px' },
}

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#050A0A' },
      { name: 'surface', value: '#0D1C1A' },
    ],
  },
  viewport: {
    viewports: { mobile430: MOBILE },
    defaultViewport: 'mobile430',
  },
  layout: 'centered',
}

/** Wrap every story in MemoryRouter so hooks like useNavigate work.
 *  Stories can set parameters.initialPath to control the active route. */
export const decorators = [
  (Story, { parameters }) => (
    <MemoryRouter initialEntries={[parameters.initialPath ?? '/']}>
      <Story />
    </MemoryRouter>
  ),
]
