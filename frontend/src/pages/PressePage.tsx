import { useTranslation } from 'react-i18next'
import { PRESS, PRESS_GROUPS } from '../data/press'
import { loc } from '../shared/lib/locale'
import { Container, PageHero, Section } from '../shared/ui/Section'

export function PressePage() {
  const { t, i18n } = useTranslation()

  return (
    <>
      <PageHero kicker={t('presse.kicker')} title={t('presse.title')} lead={t('presse.lead')} />
      <Section>
        <Container className="space-y-12">
          {PRESS_GROUPS.map((group) => (
            <div key={group.id}>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-magenta">{loc(group.label, i18n.language)}</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {PRESS.filter((p) => p.group === group.id).map((outlet) => (
                  <li key={outlet.name}>
                    <a
                      href={outlet.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-base-300 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-navy"
                    >
                      {outlet.name}
                      <span className="font-normal text-neutral/50">{loc(outlet.country, i18n.language)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </Section>
    </>
  )
}
