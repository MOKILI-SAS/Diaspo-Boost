import { useTranslation } from 'react-i18next'
import { useUiStore } from '../../shared/lib/uiStore'
import type { ServiceDto } from '../../shared/types/api'

export function ServiceCard({ service }: { service: ServiceDto }) {
  const { t } = useTranslation()
  const openLancerModal = useUiStore((s) => s.openLancerModal)
  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-base-300 bg-white p-6 shadow-sm transition-all hover:border-navy hover:shadow-md">
      <div className="flex items-start justify-end">
        <span className="badge badge-outline border-navy text-navy">
          {service.isActive ? t('services.active') : t('services.soon')}
        </span>
      </div>
      <h3 className="font-display mt-3 text-xl font-bold text-navy">{service.title}</h3>
      <button
        type="button"
        onClick={() => openLancerModal(service.slug)}
        className="btn btn-primary mt-6 w-full rounded-full"
      >
        {t('nav.start')}
      </button>
    </article>
  )
}
