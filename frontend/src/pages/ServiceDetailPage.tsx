import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { serviceWaHref } from '../data/whatsapp'
import { fetchService } from '../shared/lib/api'
import { BodyText, Container, ErrorState, PageHero, Section, Spinner } from '../shared/ui/Section'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const query = useQuery({
    queryKey: ['service', slug, i18n.language],
    queryFn: () => fetchService(slug ?? ''),
    enabled: Boolean(slug),
  })

  if (query.isLoading) {
    return <Spinner label={t('common.loading')} />
  }
  if (query.isError || !query.data) {
    return (
      <Section>
        <Container>
          <ErrorState message={t('common.error')} onRetry={() => void query.refetch()} retryLabel={t('common.retry')} />
        </Container>
      </Section>
    )
  }

  const s = query.data
  return (
    <>
      <PageHero kicker={t('services.kicker')} title={s.title} lead={s.summary} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <BodyText text={s.description} />
            <h2 className="font-display mt-8 text-xl font-bold text-navy">{t('services.forWho')}</h2>
            <p className="mt-2 text-neutral/75">{s.audience}</p>
            <h2 className="font-display mt-8 text-xl font-bold text-navy">{t('services.outcomes')}</h2>
            <p className="mt-2 text-neutral/75">{s.outcomes}</p>
          </div>
          <aside className="h-fit rounded-xl border border-base-300 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-navy">{t('services.formTitle')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral/70">{t('services.formLead')}</p>
            <a
              href={serviceWaHref(s.slug, i18n.language)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-6 w-full rounded-full text-white"
            >
              {s.ctaLabel}
            </a>
          </aside>
        </Container>
      </Section>
    </>
  )
}
