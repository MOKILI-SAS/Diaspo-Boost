import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PRESS } from '../../data/press'
import { loc } from '../../shared/lib/locale'

export function PressStrip({ compact = false }: { compact?: boolean }) {
  const { t, i18n } = useTranslation()
  const items = compact ? PRESS.slice(0, 8) : PRESS

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-magenta">{t('presse.kicker')}</p>
      <h2 className="font-display mt-2 text-3xl font-bold text-navy">{t('presse.title')}</h2>
      <p className="mt-2 max-w-2xl text-neutral/70">{t('presse.lead')}</p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {items.map((outlet) => (
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
      {compact ? (
        <Link to="/presse" className="btn btn-ghost mt-6 text-navy">
          {t('presse.all')}
        </Link>
      ) : null}
    </div>
  )
}
