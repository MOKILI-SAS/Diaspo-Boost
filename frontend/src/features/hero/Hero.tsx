import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { WA_CHANNEL_URL } from '../../data/whatsapp'
import { AfricaMark } from '../../shared/ui/Section'
import { useUiStore } from '../../shared/lib/uiStore'

export function Hero() {
  const { t } = useTranslation()
  const openLancerModal = useUiStore((s) => s.openLancerModal)
  const reduce = useReducedMotion()
  const videoSrc = import.meta.env.VITE_HERO_VIDEO?.trim() ?? ''
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(Boolean(videoSrc))

  useEffect(() => {
    const el = videoRef.current
    if (!el || !videoSrc) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) void el.play().catch(() => undefined)
        else el.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [videoSrc])

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-navy text-white lg:min-h-screen">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster="/brand/logo-diaspoboost.png"
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/65 to-navy/45" />
      <div className="pointer-events-none absolute -right-16 top-10 h-[28rem] w-[28rem] text-white opacity-[0.08]">
        <AfricaMark className="h-full w-full" />
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-screen">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-magenta">{t('hero.kicker')}</p>
          <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">{t('hero.title')}</h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openLancerModal()}
              className="btn btn-secondary rounded-full px-7 text-white font-bold"
            >
              {t('nav.start')}
            </button>
            <a
              href={WA_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline rounded-full border-white px-6 text-white hover:bg-white hover:text-navy"
            >
              {t('hero.ctaPrimary')}
            </a>
            <Link to="/sommets#agenda" className="btn btn-ghost rounded-full text-white/90 hover:text-white">
              {t('hero.ctaSecondary')}
            </Link>
          </div>
          <p className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">{t('hero.proof')}</p>
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {(t('hero.stats', { returnObjects: true }) as Array<{ value: string; label: string }>).map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="font-display text-3xl font-extrabold text-magenta">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-white/70">{stat.label}</p>
                </dd>
              </div>
            ))}
          </dl>
          {!videoSrc ? <p className="mt-4 max-w-lg text-sm text-white/60">{t('hero.videoSoon')}</p> : null}
          {videoSrc ? (
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                className="btn btn-sm rounded-full bg-white/15 text-white"
                onClick={() => {
                  const el = videoRef.current
                  if (!el) return
                  if (playing) {
                    el.pause()
                    setPlaying(false)
                  } else {
                    void el.play()
                    setPlaying(true)
                  }
                }}
              >
                {playing ? t('hero.pause') : t('hero.play')}
              </button>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
