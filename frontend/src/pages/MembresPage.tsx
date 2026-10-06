import { useTranslation } from 'react-i18next'
import { MEMBERSHIP_PLANS } from '../data/membership'
import { membresPlanWaHref, waHref, WA_MSG } from '../data/whatsapp'
import { loc } from '../shared/lib/locale'
import { ContactForm } from '../features/contact/ContactForm'
import { Container, PageHero, Section } from '../shared/ui/Section'

export function MembresPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <>
      <PageHero kicker={t('membres.kicker')} title={t('membres.title')} lead={t('membres.lead')} />
      <Section>
        <Container>
          <p className="rounded-xl border border-magenta/30 bg-magenta/5 p-4 text-sm text-navy">{t('membres.payNote')}</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {MEMBERSHIP_PLANS.map((plan) => (
              <article key={plan.id} className="flex flex-col overflow-hidden rounded-xl border border-base-300 bg-white">
                <div className="bg-navy p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wide text-magenta">{loc(plan.badge, lang)}</p>
                  <h2 className="font-display mt-2 text-2xl font-bold">{loc(plan.name, lang)}</h2>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="rounded-lg bg-white/10 px-4 py-3">
                      <p className="font-display text-2xl font-bold">{plan.monthly}</p>
                      <p className="text-xs text-white/70">{t('membres.monthly')}</p>
                    </div>
                    <div className="rounded-lg border border-magenta/40 bg-magenta/15 px-4 py-3">
                      <p className="font-display text-2xl font-bold text-magenta">{plan.yearly}</p>
                      <p className="text-xs text-white/70">{t('membres.yearly')}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <ul className="space-y-2 text-sm text-neutral/80">
                    {plan.perks.map((perk) => (
                      <li key={loc(perk, lang)} className="flex gap-2">
                        <span className="text-magenta">•</span>
                        <span>{loc(perk, lang)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-neutral/55">{loc(plan.note, lang)}</p>
                  <a
                    href={membresPlanWaHref(loc(plan.name, lang), i18n.language)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary mt-6 rounded-full text-white"
                  >
                    {t('membres.ask')}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-base-200">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">{t('membres.formTitle')}</h2>
            <p className="mt-3 text-neutral/70">{t('membres.formLead')}</p>
            <p className="mt-6">
              <a
                href={waHref(WA_MSG.equipe, i18n.language)}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {t('home.teamCta')}
              </a>
            </p>
          </div>
          <ContactForm defaultSubject={t('membres.defaultSubject')} />
        </Container>
      </Section>
    </>
  )
}
