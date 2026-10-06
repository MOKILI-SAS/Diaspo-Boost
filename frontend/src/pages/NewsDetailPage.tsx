import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { fetchNewsItem } from '../shared/lib/api'
import { formatDate } from '../shared/lib/format'
import { BodyText, Container, ErrorState, PageHero, Section, Spinner } from '../shared/ui/Section'

export function NewsDetailPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const query = useQuery({
    queryKey: ['news-item', slug, i18n.language],
    queryFn: () => fetchNewsItem(slug ?? ''),
    enabled: Boolean(slug),
  })

  if (query.isLoading) return <Spinner label={t('common.loading')} />
  if (query.isError || !query.data) {
    return (
      <Section>
        <Container>
          <ErrorState message={t('common.error')} onRetry={() => void query.refetch()} retryLabel={t('common.retry')} />
        </Container>
      </Section>
    )
  }

  const n = query.data
  return (
    <>
      <PageHero
        kicker={n.type === 'alerte' ? t('news.alerte') : t('news.communique')}
        title={n.title}
        lead={`${t('news.published')} ${formatDate(n.publishedAt, i18n.language)}`}
      />
      <Section>
        <Container className="max-w-3xl">
          <BodyText text={n.body} />
        </Container>
      </Section>
    </>
  )
}
