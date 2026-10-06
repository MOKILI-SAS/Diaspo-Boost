import { useTranslation } from 'react-i18next'
import { TESTIMONIALS } from '../../data/testimonials'
import { loc } from '../../shared/lib/locale'

export function Testimonials() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-magenta">{t('temoignages.kicker')}</p>
      <h2 className="font-display mt-2 text-3xl font-bold text-navy">{t('temoignages.title')}</h2>
      <p className="mt-2 max-w-2xl text-neutral/70">{t('temoignages.lead')}</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <article key={item.name} className="rounded-xl border border-base-300 bg-white p-6">
            <p className="text-sm leading-relaxed text-neutral/80">« {loc(item.quote, i18n.language)} »</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                {item.initials}
              </span>
              <div>
                <p className="font-display font-bold text-navy">{item.name}</p>
                <p className="text-xs text-neutral/60">{loc(item.role, i18n.language)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
