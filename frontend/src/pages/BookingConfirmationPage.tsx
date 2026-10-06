import { useQuery } from '@tanstack/react-query'
import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { fetchBooking } from '../shared/lib/api'
import { formatDate } from '../shared/lib/format'
import { Container, ErrorState, PageHero, Section, Spinner } from '../shared/ui/Section'

export function BookingConfirmationPage() {
  const { reference } = useParams()
  const { t, i18n } = useTranslation()
  const query = useQuery({
    queryKey: ['booking', reference],
    queryFn: () => fetchBooking(reference ?? ''),
    enabled: Boolean(reference),
  })

  const qrValue = typeof window !== 'undefined' ? window.location.href : reference ?? ''

  return (
    <>
      <PageHero title={t('booking.title')} lead={t('booking.lead')} />
      <Section>
        <Container className="max-w-2xl">
          {query.isLoading ? <Spinner label={t('common.loading')} /> : null}
          {query.isError ? (
            <ErrorState message={t('booking.notFound')} onRetry={() => void query.refetch()} retryLabel={t('common.retry')} />
          ) : null}
          {query.data ? (
            <div className="rounded-xl border border-base-300 bg-white p-6 sm:p-8">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('booking.reference')}</dt>
                  <dd className="font-display text-lg font-bold text-navy">{query.data.reference}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('booking.service')}</dt>
                  <dd className="font-medium text-navy">{query.data.serviceTitle}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('booking.when')}</dt>
                  <dd>{formatDate(query.data.createdAt, i18n.language)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('form.email')}</dt>
                  <dd>{query.data.email}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-base-200 p-6">
                <QRCodeSVG value={qrValue} size={168} fgColor="#1A365D" />
                <p className="text-center text-sm text-neutral/70">{t('booking.qr')}</p>
              </div>
              <p className="mt-6 text-sm text-neutral/70">{t('booking.agenda')}</p>
              <Link to="/services" className="btn btn-primary mt-6 rounded-full">
                {t('booking.back')}
              </Link>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
