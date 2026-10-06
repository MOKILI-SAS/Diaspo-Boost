import { useTranslation } from 'react-i18next'
import { AppointmentForm } from '../features/rdv/AppointmentForm'
import { CalendlyEmbed } from '../features/rdv/CalendlyEmbed'
import { Container, PageHero, Section } from '../shared/ui/Section'

export function RdvPage() {
  const { t } = useTranslation()
  const calendly = import.meta.env.VITE_CALENDLY_URL?.trim() ?? ''

  return (
    <>
      <PageHero kicker={t('rdv.kicker')} title={t('rdv.title')} lead={t('rdv.lead')} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">{t('rdv.howTitle')}</h2>
            <ol className="mt-4 space-y-4 text-sm leading-relaxed text-neutral/75">
              {(t('rdv.steps', { returnObjects: true }) as string[]).map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-display font-bold text-magenta">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-xl border border-magenta/30 bg-magenta/5 p-4 text-sm text-navy">{t('rdv.disclaimer')}</p>
          </div>
          {calendly ? <CalendlyEmbed url={calendly} /> : <AppointmentForm serviceSlug="accompagnement-investissement" />}
        </Container>
      </Section>
      {calendly ? (
        <Section className="bg-base-200">
          <Container>
            <h2 className="font-display text-2xl font-bold text-navy">{t('rdv.altTitle')}</h2>
            <p className="mt-2 max-w-2xl text-neutral/70">{t('rdv.altLead')}</p>
            <div className="mt-8 max-w-xl">
              <AppointmentForm serviceSlug="accompagnement-investissement" />
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
