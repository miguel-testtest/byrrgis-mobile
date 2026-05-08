import PerformanceCalendar from './PerformanceCalendar'
import { performanceDays, performanceMeta } from '../../data/mockData'

export default {
  title: 'Portfolio/PerformanceCalendar',
  component: PerformanceCalendar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#050A0A' }] },
  },
}

export const Default = {
  args: {
    year: performanceMeta.year,
    month: performanceMeta.month,
    days: performanceDays,
    meta: performanceMeta,
  },
}

export const NoData = {
  args: {
    year: 2025,
    month: 2,
    days: [],
    meta: null,
  },
}
