import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ServiceCard } from '../features/services/ServiceCard'
import { fetchServices } from '../shared/lib/api'
import { Container, EmptyState, ErrorState, PageHero, Section, Spinner } from '../shared/ui/Section'

export function ServicesPage() {
  const { t, i18n } = useTranslation()
  const query = useQuery({ queryKey: ['services', i18n.language], queryFn: fetchServices })

  return (
    <>
      <PageHero kicker={t('services.kicker')} title={t('services.title')} lead={t('services.lead')} />
      <Section>
        <Container>
          {query.isLoading ? <Spinner label={t('common.loading')} /> : null}
          {query.isError ? (
            <ErrorState message={t('common.error')} onRetry={() => void query.refetch()} retryLabel={t('common.retry')} />
          ) : null}
          {query.data && query.data.length === 0 ? <EmptyState title={t('services.empty')} /> : null}
          {query.data ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {query.data.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
