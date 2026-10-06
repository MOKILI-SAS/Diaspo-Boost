import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ContactForm } from '../features/contact/ContactForm'
import { ContactDetails } from '../features/contact/ContactDetails'
import { TeamCards } from '../features/equipe/TeamCards'
import { EditionCard } from '../features/sommets/EditionCard'
import { EDITIONS } from '../data/editions'
import { isParticiperWaKey, participerWaHref, serviceWaHref } from '../data/whatsapp'
import { BodyText, Container, PageHero, Section } from '../shared/ui/Section'

export function MissionSection() {
  const { t } = useTranslation()
  const points = t('mission.points', { returnObjects: true }) as string[]
  return (
    <Section id="mission" className="scroll-mt-24">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-magenta">{t('mission.kicker')}</p>
        <h2 className="font-display mt-2 text-3xl font-bold text-navy">{t('mission.title')}</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <article className="rounded-xl border border-base-300 p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-navy">{t('mission.visionTitle')}</h3>
            <p className="mt-4 leading-relaxed text-neutral/75">{t('mission.vision')}</p>
          </article>
          <article className="rounded-xl bg-navy p-6 text-white sm:p-8">
            <h3 className="font-display text-2xl font-bold">{t('mission.missionTitle')}</h3>
            <ol className="mt-4 space-y-4">
              {points.map((p, i) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/80">
                  <span className="font-display font-bold text-magenta">0{i + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </Container>
    </Section>
  )
}

export function MissionPage() {
  return <MissionSection />
}

export function InvestirPage() {
  const { t, i18n } = useTranslation()
  const steps = t('investir.steps', { returnObjects: true }) as Array<{ title: string; text: string }>
  return (
    <>
      <PageHero kicker={t('investir.kicker')} title={t('investir.title')} lead={t('investir.lead')} />
      <Section>
        <Container>
          <p className="rounded-xl border border-magenta/30 bg-magenta/5 p-4 text-sm text-navy">{t('investir.disclaimer')}</p>
          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="grid gap-3 rounded-xl border border-base-300 p-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                <span className="font-display text-3xl font-bold text-magenta">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-xl font-bold text-navy">{s.title}</h2>
                  <p className="mt-2 text-neutral/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={serviceWaHref('accompagnement-investissement', i18n.language)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mt-10 rounded-full text-white"
          >
            {t('investir.cta')}
          </a>
        </Container>
      </Section>
    </>
  )
}

export function ParticiperPage() {
  const { t, i18n } = useTranslation()
  const paths = t('participer.paths', { returnObjects: true }) as Array<{
    title: string
    text: string
    to?: string
    wa?: string
  }>
  return (
    <>
      <PageHero kicker={t('participer.kicker')} title={t('participer.title')} />
      <Section>
        <Container className="grid gap-5 md:grid-cols-2">
          {paths.map((p) => {
            const className = 'flex items-center justify-between rounded-xl border border-base-300 p-6 transition hover:border-navy hover:shadow-sm'
            if (isParticiperWaKey(p.wa)) {
              return (
                <a
                  key={p.title}
                  href={participerWaHref(p.wa, i18n.language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <h2 className="font-display text-xl font-bold text-navy">{p.title}</h2>
                  <span className="text-xl text-navy">→</span>
                </a>
              )
            }
            return (
              <Link key={p.title} to={p.to ?? '/'} className={className}>
                <h2 className="font-display text-xl font-bold text-navy">{p.title}</h2>
                <span className="text-xl text-navy">→</span>
              </Link>
            )
          })}
        </Container>
      </Section>
    </>
  )
}

export function SommetsPage() {
  const { t } = useTranslation()
  const past = EDITIONS.filter((e) => e.status === 'past')
  const upcoming = EDITIONS.filter((e) => e.status === 'upcoming')
  return (
    <>
      <PageHero kicker={t('sommets.kicker')} title={t('sommets.title')} lead={t('sommets.lead')} />
      <Section>
        <Container>
          <h2 className="font-display text-2xl font-bold text-navy">{t('sommets.pastTitle')}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {past.map((item) => (
              <EditionCard key={item.id} edition={item} />
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-base-200" id="agenda">
        <Container>
          <h2 className="font-display text-2xl font-bold text-navy">{t('agenda.title')}</h2>
          <p className="mt-2 max-w-2xl text-neutral/70">{t('agenda.lead')}</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {upcoming.map((item) => (
              <EditionCard key={item.id} edition={item} showCta />
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

export function EquipeContactPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero kicker={t('equipe.kicker')} title={t('equipe.title')} lead={t('equipe.lead')} />
      <Section>
        <Container>
          <TeamCards />
        </Container>
      </Section>
      <Section className="bg-base-200" id="contact">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">{t('contact.title')}</h2>
            <div className="mt-6">
              <ContactDetails />
            </div>
          </div>
          <ContactForm />
        </Container>
      </Section>
    </>
  )
}

export function GouvernancePage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero kicker={t('gouvernance.kicker')} title={t('gouvernance.title')} />
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-base-300 p-6">
            <p className="text-xs uppercase tracking-wide text-magenta">{t('gouvernance.founderTitle')}</p>
            <h2 className="font-display mt-2 text-xl font-bold text-navy">{t('gouvernance.founderName')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral/75">{t('gouvernance.founder')}</p>
          </article>
          <article className="rounded-xl border border-base-300 p-6">
            <p className="text-xs uppercase tracking-wide text-magenta">{t('gouvernance.orgTitle')}</p>
            <h2 className="font-display mt-2 text-xl font-bold text-navy">{t('gouvernance.orgName')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral/75">{t('gouvernance.org')}</p>
          </article>
        </Container>
      </Section>
    </>
  )
}

export function FaqPage() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>
  return (
    <>
      <PageHero title={t('faq.title')} />
      <Section>
        <Container className="max-w-3xl space-y-3">
          {items.map((item) => (
            <details key={item.q} className="collapse collapse-arrow rounded-xl border border-base-300 bg-white">
              <summary className="collapse-title font-display font-bold text-navy">{item.q}</summary>
              <div className="collapse-content text-sm leading-relaxed text-neutral/75">{item.a}</div>
            </details>
          ))}
        </Container>
      </Section>
    </>
  )
}

export function ContactPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero title={t('contact.title')} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3 text-sm text-navy">
            <ContactDetails />
          </div>
          <ContactForm />
        </Container>
      </Section>
    </>
  )
}

export function LegalPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero title={t('legal.title')} />
      <Section>
        <Container className="max-w-3xl">
          <BodyText text={t('legal.body')} />
        </Container>
      </Section>
    </>
  )
}

export function PrivacyPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero title={t('privacy.title')} />
      <Section>
        <Container className="max-w-3xl">
          <BodyText text={t('privacy.body')} />
        </Container>
      </Section>
    </>
  )
}

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <Section>
      <Container className="py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-navy">{t('notFound.title')}</h1>
        <p className="mt-3 text-neutral/70">{t('notFound.text')}</p>
        <a href="/" className="btn btn-primary mt-8 rounded-full">
          {t('notFound.home')}
        </a>
      </Container>
    </Section>
  )
}
