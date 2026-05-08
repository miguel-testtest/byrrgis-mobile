import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/layout/PageHeader'
import { IconPacks } from '../components/ui/Icons'

export default function PacksPage() {
  return (
    <AppShell>
      <PageHeader title="Packs" />
      <div className="empty-state">
        <div className="empty-state__icon">
          <IconPacks size={24} />
        </div>
        <div className="empty-state__title">Packs coming soon</div>
        <div className="empty-state__sub">
          Curated token bundles for every strategy.
        </div>
      </div>
    </AppShell>
  )
}
