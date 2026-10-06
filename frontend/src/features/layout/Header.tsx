import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { useUiStore } from '../../shared/lib/uiStore'
import { cn } from '../../shared/lib/cn'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/services', key: 'nav.services' },
  { to: '/participer', key: 'nav.participer' },
  { to: '/sommets', key: 'nav.sommets' },
  { to: '/equipe-contact', key: 'nav.equipe' },
] as const

export function Header() {
  const { t, i18n } = useTranslation()
  const mobileOpen = useUiStore((s) => s.mobileOpen)
  const setMobileOpen = useUiStore((s) => s.setMobileOpen)
  const openLancerModal = useUiStore((s) => s.openLancerModal)
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr'

  function switchLang(next: 'fr' | 'en') {
    void i18n.changeLanguage(next)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-h-11 min-w-0 items-center gap-2" onClick={() => setMobileOpen(false)}>
          <img src="/brand/logo-diaspoboost.png" alt="DiaspoBoost" width={148} height={56} className="h-10 w-auto sm:h-12" />
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-2.5 py-2 text-[13px] font-medium text-navy/80 hover:bg-base-200 hover:text-navy',
                  isActive && 'bg-base-200 text-navy',
                )
              }
            >
              {t(l.key)}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <div className="join rounded-full border border-base-300" role="group" aria-label="Language">
            <button
              type="button"
              className={cn('btn btn-xs join-item min-h-11 px-3', lang === 'fr' ? 'btn-primary' : 'btn-ghost')}
              onClick={() => switchLang('fr')}
              aria-pressed={lang === 'fr'}
            >
              FR
            </button>
            <button
              type="button"
              className={cn('btn btn-xs join-item min-h-11 px-3', lang === 'en' ? 'btn-primary' : 'btn-ghost')}
              onClick={() => switchLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={() => openLancerModal()}
            className="btn btn-secondary hidden rounded-full text-white sm:inline-flex"
          >
            {t('nav.start')}
          </button>
          <button
            type="button"
            className="btn btn-ghost lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={t('nav.menu')}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="text-xl">{mobileOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div className="border-t border-base-300 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-navy"
              >
                {t(l.key)}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => openLancerModal()}
              className="btn btn-secondary mt-2 rounded-full text-white"
            >
              {t('nav.start')}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
