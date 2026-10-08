import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Edition } from '../../data/editions'
import { eventInviteWaHref } from '../../data/whatsapp'
import { loc } from '../../shared/lib/locale'

export function EditionCard({ edition, showCta = false }: { edition: Edition; showCta?: boolean }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const title = loc(edition.title, lang)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-base-300 bg-white">
      <div className="relative h-44 w-full overflow-hidden bg-navy sm:h-48">
        <img
          src={edition.image}
          alt={title}
          width={680}
          height={360}
          className="h-full w-full object-cover sm:h-48"
          style={edition.imagePosition ? { objectPosition: edition.imagePosition } : undefined}
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 shadow-md backdrop-blur">
          <img src="/brand/logo-diaspoboost.png" alt="DiaspoBoost" className="h-4 w-auto object-contain" />
          <span className="text-[10px] font-bold text-navy tracking-tight">DiaspoBoost</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-magenta">{loc(edition.date, lang)}</p>
        <h3 className="font-display mt-2 text-xl font-bold text-navy">{title}</h3>
        <p className="mt-1 text-sm text-navy/70">{loc(edition.place, lang)}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral/75">{loc(edition.text, lang)}</p>
        {edition.tags ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {edition.tags.map((tag) => (
              <span key={loc(tag, lang)} className="badge badge-outline h-7 border-navy/20 text-navy">
                {loc(tag, lang)}
              </span>
            ))}
          </div>
        ) : null}
        {edition.prices ? <p className="mt-3 text-xs text-neutral/60">{loc(edition.prices, lang)}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3">
          {edition.bilanSlug ? (
            <Link to={`/bilans/${edition.bilanSlug}`} className="btn btn-sm rounded-full btn-outline">
              {t('bilans.readShort')}
            </Link>
          ) : null}
          {showCta && edition.waLabel ? (
            <a
              href={eventInviteWaHref(edition.waLabel, i18n.language)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5d]"
            >
              {t('agenda.ask')}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
