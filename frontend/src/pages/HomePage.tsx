import { useQuery } from '@tanstack/react-query'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BILANS } from '../data/bilans'
import { serviceWaHref, WA_CHANNEL_URL, waHref, WA_MSG } from '../data/whatsapp'
import { EDITIONS } from '../data/editions'
import { CONTACTS } from '../data/contacts'
import { useUiStore } from '../shared/lib/uiStore'
import { BilanCard } from '../features/bilans/BilanCard'
import { Hero } from '../features/hero/Hero'
import { Testimonials } from '../features/home/Testimonials'
import { PressStrip } from '../features/home/PressStrip'
import { TeamCards } from '../features/equipe/TeamCards'
import { ServiceCard } from '../features/services/ServiceCard'
import { EditionCard } from '../features/sommets/EditionCard'
import { fetchServices } from '../shared/lib/api'
import { fadeUp, stagger } from '../shared/lib/motion'
import { Container, ErrorState, Section, Spinner } from '../shared/ui/Section'
import { MissionSection } from './StaticPages'

export function HomePage() {
  const { t, i18n } = useTranslation()
  const openLancerModal = useUiStore((s) => s.openLancerModal)
  const reduce = useReducedMotion()
  const services = useQuery({ queryKey: ['services', i18n.language], queryFn: fetchServices })
  const how = t('home.how', { returnObjects: true }) as Array<{ title: string; text: string }>
  const trust = t('trust.items', { returnObjects: true }) as string[]
  const past = EDITIONS.filter((e) => e.status === 'past')
  const upcoming = EDITIONS.filter((e) => e.status === 'upcoming')

  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <Hero />
      <MissionSection />
      <Section className="bg-base-200">
        <Container>
          <h2 className="font-display text-center text-2xl font-bold text-navy">{t('trust.title')}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => (
              <li key={item} className="rounded-xl bg-white p-5 text-sm leading-relaxed text-navy shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-display text-5xl font-extrabold text-magenta sm:text-6xl">{t('stat.value')}</p>
            <p className="mt-3 text-sm text-neutral/60">{t('stat.label')}</p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-navy">{t('stat.claim')}</p>
            <a
              href={serviceWaHref('accompagnement-investissement', i18n.language)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6 rounded-full"
            >
              {t('stat.cta')}
            </a>
          </div>
        </Container>
      </Section>
      <Section className="bg-base-200">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy">{t('home.servicesTitle')}</h2>
            </div>
            <Link to="/services" className="btn btn-ghost text-navy">
              {t('home.allServices')}
            </Link>
          </div>
          {services.isLoading ? <Spinner label={t('common.loading')} /> : null}
          {services.isError ? (
            <ErrorState message={t('common.error')} onRetry={() => void services.refetch()} retryLabel={t('common.retry')} />
          ) : null}
          {services.data ? (
            <motion.div
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              variants={reduce ? undefined : stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {services.data.map((s) => (
                <motion.div key={s.id} variants={reduce ? undefined : fadeUp}>
                  <ServiceCard service={s} />
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="font-display text-3xl font-bold text-navy">{t('home.timelineTitle')}</h2>
          <p className="mt-2 max-w-2xl text-neutral/70">{t('home.timelineLead')}</p>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
            {past.map((item) => (
              <div key={item.id} className="min-w-[300px] max-w-sm shrink-0">
                <EditionCard edition={item} />
              </div>
            ))}
          </div>
          <Link to="/sommets" className="btn btn-ghost mt-4 text-navy">
            {t('home.allEditions')}
          </Link>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="badge badge-outline h-8 border-magenta text-magenta">{t('home.comingTalent')}</span>
            <span className="badge badge-outline h-8 border-navy text-navy">{t('home.comingFund')}</span>
          </div>
        </Container>
      </Section>
      <Section className="bg-navy text-white" id="agenda">
        <Container>
          <h2 className="font-display text-3xl font-bold">{t('agenda.title')}</h2>
          <p className="mt-2 max-w-2xl text-white/70">{t('agenda.lead')}</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {upcoming.map((item) => (
              <EditionCard key={item.id} edition={item} showCta />
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy">{t('bilans.homeTitle')}</h2>
              <p className="mt-2 max-w-xl text-neutral/70">{t('bilans.lead')}</p>
            </div>
            <Link to="/bilans" className="btn btn-ghost text-navy">
              {t('bilans.all')}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {BILANS.map((doc) => (
              <BilanCard key={doc.slug} doc={doc} />
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-base-200">
        <Container>
          <h2 className="font-display text-3xl font-bold text-navy">{t('home.howTitle')}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {how.map((step, i) => (
              <article key={step.title} className="rounded-xl bg-white p-6">
                <p className="text-sm font-bold text-magenta">0{i + 1}</p>
                <h3 className="font-display mt-2 text-xl font-bold text-navy">{step.title}</h3>
                <p className="mt-3 text-sm text-neutral/75">{step.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Testimonials />
        </Container>
      </Section>
      <Section className="bg-base-200">
        <Container>
          <PressStrip compact />
        </Container>
      </Section>
      <Section>
        <Container className="rounded-2xl bg-navy px-6 py-12 text-center text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-magenta">{t('home.galleryKicker')}</p>
          <h2 className="font-display mt-3 text-3xl font-bold">{t('home.galleryTitle')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">{t('home.galleryLead')}</p>
          <a
            href={CONTACTS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mt-8 rounded-full text-white"
          >
            {t('home.galleryCta')}
          </a>
        </Container>
      </Section>
      <Section className="bg-base-200">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy">{t('home.teamTitle')}</h2>
              <p className="mt-2 text-neutral/70">{t('home.teamLead')}</p>
            </div>
            <a
              href={waHref(WA_MSG.equipe, i18n.language)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-navy"
            >
              {t('home.teamCta')}
            </a>
          </div>
          <div className="mt-8">
            <TeamCards compact />
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="text-center">
          <h2 className="font-display text-3xl font-bold text-navy">{t('home.finalTitle')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral/70">{t('home.finalText')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WA_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary rounded-full px-8 text-white font-bold"
            >
              {t('hero.ctaPrimary')}
            </a>
            <button
              type="button"
              onClick={() => openLancerModal()}
              className="btn btn-outline rounded-full px-8"
            >
              {t('nav.start')}
            </button>
          </div>
        </Container>
      </Section>
    </>
  )
}
