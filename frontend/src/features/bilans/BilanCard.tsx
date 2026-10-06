import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { BilanDoc } from '../../data/bilans'
import { loc } from '../../shared/lib/locale'

export function BilanCard({ doc }: { doc: BilanDoc }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <article className="flex h-full flex-col rounded-xl border border-base-300 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-magenta">{loc(doc.kicker, lang)}</p>
      <h2 className="font-display mt-2 text-2xl font-bold text-navy">{loc(doc.title, lang)}</h2>
      <p className="mt-1 text-sm text-navy/60">{loc(doc.meta, lang)}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral/75">{loc(doc.subtitle, lang)}</p>
      {doc.heavy ? <p className="mt-3 text-xs text-neutral/50">{t('bilans.heavy')}</p> : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to={`/bilans/${doc.slug}`} className="btn btn-primary rounded-full">
          {t('bilans.read')}
        </Link>
        <a href={doc.file} download className="btn btn-outline rounded-full">
          {t('bilans.download')}
        </a>
      </div>
    </article>
  )
}
