import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { downloadIcs, readRdv } from '../features/rdv/calendar'
import { Container, PageHero, Section } from '../shared/ui/Section'

export function RdvConfirmationPage() {
  const { reference } = useParams()
  const { t } = useTranslation()
  const record = useMemo(() => readRdv(reference ?? ''), [reference])

  return (
    <>
      <PageHero title={t('rdv.confirmTitle')} lead={t('rdv.confirmLead')} />
      <Section>
        <Container className="max-w-2xl">
          {!record ? (
            <div className="rounded-xl border border-base-300 p-6">
              <p className="text-neutral/70">{t('rdv.notFound')}</p>
              <Link to="/rdv" className="btn btn-primary mt-6 rounded-full">
                {t('rdv.back')}
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-base-300 bg-white p-6 sm:p-8">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('booking.reference')}</dt>
                  <dd className="font-display text-lg font-bold text-navy">{record.reference}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('rdv.slot')}</dt>
                  <dd className="font-medium text-navy">{record.slotLabel}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('form.email')}</dt>
                  <dd>{record.email}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-neutral/50">{t('rdv.notify')}</dt>
                  <dd>{record.notify}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <a href={record.googleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded-full">
                  {t('rdv.addGoogle')}
                </a>
                <button
                  type="button"
                  className="btn btn-outline rounded-full"
                  onClick={() => downloadIcs(`${record.reference}.ics`, record.ics)}
                >
                  {t('rdv.downloadIcs')}
                </button>
                <a href={record.mailtoUrl} className="btn btn-outline rounded-full">
                  {t('rdv.notifyEmail')}
                </a>
                <a href={record.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5d]">
                  {t('rdv.notifyWhatsapp')}
                </a>
                <a href={record.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline rounded-full">
                  {t('rdv.notifyTelegram')}
                </a>
              </div>
              <p className="mt-6 text-sm text-neutral/70">{t('rdv.confirmNote')}</p>
              <Link to="/services" className="btn btn-ghost mt-4 rounded-full">
                {t('booking.back')}
              </Link>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
