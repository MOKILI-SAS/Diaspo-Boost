import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { fetchNews } from '../shared/lib/api'
import { formatDate } from '../shared/lib/format'
import { cn } from '../shared/lib/cn'
import { Container, EmptyState, ErrorState, PageHero, Section, Spinner } from '../shared/ui/Section'

type Filter = 'all' | 'communique' | 'alerte'

export function NewsPage() {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')
  const query = useQuery({ queryKey: ['news', i18n.language], queryFn: () => fetchNews() })
  const items = useMemo(() => {
    const rows = query.data ?? []
    if (filter === 'all') return rows
    return rows.filter((n) => n.type === filter)
  }, [filter, query.data])

  return (
    <>
      <PageHero kicker={t('news.kicker')} title={t('news.title')} lead={t('news.lead')} />
      <Section>
        <Container>
          <div className="flex flex-wrap gap-2">
            {(['all', 'communique', 'alerte'] as const).map((f) => (
              <button
                key={f}
                type="button"
                className={cn('btn btn-sm rounded-full', filter === f ? 'btn-primary' : 'btn-ghost')}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? t('news.all') : t(`news.${f}`)}
              </button>
            ))}
          </div>
          {query.isLoading ? <Spinner label={t('common.loading')} /> : null}
          {query.isError ? (
            <ErrorState message={t('common.error')} onRetry={() => void query.refetch()} retryLabel={t('common.retry')} />
          ) : null}
          {query.data && items.length === 0 ? <div className="mt-8"><EmptyState title={t('news.empty')} /></div> : null}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {items.map((n) => (
              <article
                key={n.id}
                className={cn(
                  'rounded-xl border bg-white p-6',
                  n.type === 'alerte' ? 'border-magenta/60' : 'border-base-300',
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-magenta">
                  {n.type === 'alerte' ? t('news.alerte') : t('news.communique')}
                </p>
                <h2 className="font-display mt-2 text-xl font-bold text-navy">{n.title}</h2>
                <p className="mt-2 text-sm text-neutral/70">{n.excerpt}</p>
                <p className="mt-3 text-xs text-neutral/50">
                  {t('news.published')} {formatDate(n.publishedAt, i18n.language)}
                </p>
                <Link to={`/actualites/${n.slug}`} className="btn btn-ghost mt-4 px-0 text-navy">
                  {t('common.read')}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
