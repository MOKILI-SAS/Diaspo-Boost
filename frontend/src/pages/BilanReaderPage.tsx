import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QRCodeSVG } from 'qrcode.react'
import { getBilan } from '../data/bilans'
import { loc } from '../shared/lib/locale'
import { Container, PageHero, Section } from '../shared/ui/Section'

export function BilanReaderPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const doc = getBilan(slug)
  const lang = i18n.language
  const pdfUrl = useMemo(() => {
    if (!doc) return ''
    if (typeof window === 'undefined') return doc.file
    return `${window.location.origin}${doc.file}`
  }, [doc])

  if (!doc) return <Navigate to="/bilans" replace />

  return (
    <>
      <PageHero kicker={loc(doc.kicker, lang)} title={loc(doc.title, lang)} lead={loc(doc.subtitle, lang)} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_220px]">
          <div>
            <p className="text-sm leading-relaxed text-neutral/75">{loc(doc.extractLead, lang)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={doc.file} download className="btn btn-secondary rounded-full text-white">
                {t('bilans.downloadFull')}
              </a>
              <a href={doc.file} target="_blank" rel="noopener noreferrer" className="btn btn-outline rounded-full">
                {t('bilans.openTab')}
              </a>
              <Link to="/bilans" className="btn btn-ghost rounded-full">
                {t('bilans.back')}
              </Link>
            </div>
            {doc.heavy ? <p className="mt-3 text-xs text-neutral/50">{t('bilans.heavy')}</p> : null}
          </div>
          <aside className="rounded-xl border border-base-300 bg-white p-5 text-center">
            <QRCodeSVG value={pdfUrl || doc.file} size={140} className="mx-auto" />
            <p className="mt-3 text-xs text-neutral/60">{t('bilans.qr')}</p>
          </aside>
        </Container>
      </Section>
      <Section className="bg-base-200">
        <Container className="max-w-3xl space-y-8">
          <h2 className="font-display text-2xl font-bold text-navy">{t('bilans.extractTitle')}</h2>
          {doc.sections.map((section) => (
            <article key={loc(section.heading, lang)}>
              <h3 className="font-display text-lg font-bold text-navy">{loc(section.heading, lang)}</h3>
              {section.paragraphs.map((p) => (
                <p key={loc(p, lang).slice(0, 48)} className="mt-3 text-sm leading-relaxed text-neutral/75">
                  {loc(p, lang)}
                </p>
              ))}
            </article>
          ))}
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="font-display text-2xl font-bold text-navy">{t('bilans.readerTitle')}</h2>
          <p className="mt-2 text-sm text-neutral/60">{t('bilans.readerLead')}</p>
          <div className="mt-6 overflow-hidden rounded-xl border border-base-300 bg-white">
            <object data={`${doc.file}#toolbar=1&navpanes=0`} type="application/pdf" className="h-[80vh] w-full">
              <iframe title={loc(doc.title, lang)} src={doc.file} className="h-[80vh] w-full" />
            </object>
          </div>
          <p className="mt-4 text-sm text-neutral/60">
            {t('bilans.readerFallback')}{' '}
            <a className="link" href={doc.file} download>
              {t('bilans.download')}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  )
}
