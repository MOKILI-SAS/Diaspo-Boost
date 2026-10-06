import { useTranslation } from 'react-i18next'

export function TeamCards({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation()
  const photoClass = compact ? 'h-56' : 'h-72'
  const pad = compact ? 'p-5' : 'p-6'

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="overflow-hidden rounded-xl border border-base-300 bg-white">
        <img
          src="/brand/stephanie-kimbulu.png"
          alt={t('gouvernance.founderName')}
          width={640}
          height={800}
          className={`${photoClass} w-full object-cover object-top`}
        />
        <div className={pad}>
          <p className="text-xs font-semibold uppercase tracking-wide text-magenta">{t('gouvernance.founderTitle')}</p>
          <h2 className="font-display mt-2 text-xl font-bold text-navy">{t('gouvernance.founderName')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral/75">{t('gouvernance.founder')}</p>
        </div>
      </article>
      <article className="flex flex-col overflow-hidden rounded-xl border border-base-300 bg-white">
        <div className={`flex ${photoClass} items-center justify-center bg-base-200 px-6`}>
          <img
            src="/brand/logo-bcc.png"
            alt={t('gouvernance.orgName')}
            width={480}
            height={200}
            className="max-h-28 w-auto object-contain sm:max-h-36"
          />
        </div>
        <div className={`${pad} flex-1`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-magenta">{t('gouvernance.orgTitle')}</p>
          <h2 className="font-display mt-2 text-xl font-bold text-navy">{t('gouvernance.orgName')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral/75">{t('gouvernance.org')}</p>
        </div>
      </article>
    </div>
  )
}
