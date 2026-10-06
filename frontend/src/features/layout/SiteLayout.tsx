import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppFloat } from './WhatsAppFloat'
import { LancerOverlayModal } from '../booking/LancerOverlayModal'

export function SiteLayout() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    document.title = t('meta.title')
    const desc = document.querySelector('meta[name="description"]')
    desc?.setAttribute('content', t('meta.description'))
  }, [t, i18n.language])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="flex min-h-screen flex-col bg-base-100" data-theme="diaspoboost">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <LancerOverlayModal />
    </div>
  )
}
