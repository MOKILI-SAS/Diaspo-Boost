import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { isAxiosError } from 'axios'
import { subscribeNewsletter } from '../../shared/lib/api'
import { ArmoiriesPlaceholder } from '../../shared/ui/Section'
import { ContactDetails } from '../contact/ContactDetails'
import { CONTACTS } from '../../data/contacts'
import { useUiStore } from '../../shared/lib/uiStore'

const social = [
  { href: CONTACTS.instagram, label: 'Instagram' },
  { href: CONTACTS.x, label: 'X' },
  { href: CONTACTS.linkedin, label: 'LinkedIn' },
]

export function Footer() {
  const { t } = useTranslation()
  const openLancerModal = useUiStore((s) => s.openLancerModal)
  const year = new Date().getFullYear()
  const [status, setStatus] = useState<'idle' | 'ok' | 'exists' | 'err'>('idle')

  const schema = yup.object({
    email: yup.string().trim().email(t('form.emailInvalid')).required(t('form.required')),
    consent: yup.boolean().oneOf([true], t('form.consentRequired')),
  })

  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">DiaspoBoost</p>
          <p className="mt-3 text-sm text-white/70">{t('footer.disclaimer')}</p>
          <div className="mt-4 flex gap-3">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide">{t('footer.nav')}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <Link to="/">{t('nav.home')}</Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openLancerModal()}
                className="text-left hover:underline text-white/80 hover:text-white"
              >
                {t('nav.start')}
              </button>
            </li>
            <li>
              <Link to="/bilans">{t('nav.bilans')}</Link>
            </li>
            <li>
              <Link to="/membres">{t('nav.membres')}</Link>
            </li>
            <li>
              <Link to="/presse">{t('nav.presse')}</Link>
            </li>
            <li>
              <Link to="/rdv">{t('nav.rdv')}</Link>
            </li>
            <li>
              <Link to="/equipe-contact">{t('nav.equipe')}</Link>
            </li>
            <li>
              <Link to="/faq">{t('nav.faq')}</Link>
            </li>
            <li>
              <Link to="/mentions-legales">{t('legal.title')}</Link>
            </li>
            <li>
              <Link to="/confidentialite">{t('privacy.title')}</Link>
            </li>
            <li>
              <Link to="/admin" className="opacity-60 hover:opacity-100">Espace Admin</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide">{t('footer.contact')}</p>
          <div className="mt-3">
            <ContactDetails variant="dark" />
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide">{t('footer.newsletter')}</p>
          <p className="mt-3 text-sm text-white/70">{t('footer.newsletterLead')}</p>
          <Formik
            initialValues={{ email: '', consent: false }}
            validationSchema={schema}
            onSubmit={async (values, helpers) => {
              setStatus('idle')
              try {
                const res = await subscribeNewsletter(values.email, values.consent)
                setStatus(res.created ? 'ok' : 'exists')
                helpers.resetForm()
              } catch (err: unknown) {
                if (isAxiosError(err) && err.response?.status === 400) setStatus('err')
                else setStatus('err')
              } finally {
                helpers.setSubmitting(false)
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4 space-y-3">
                <label className="sr-only" htmlFor="nl-email">
                  {t('form.email')}
                </label>
                <Field
                  id="nl-email"
                  name="email"
                  type="email"
                  className="input input-bordered w-full text-navy"
                  placeholder={t('form.email')}
                />
                <ErrorMessage name="email" component="p" className="text-xs text-red-200" />
                <label className="flex items-start gap-2 text-xs text-white/80">
                  <Field type="checkbox" name="consent" className="checkbox checkbox-sm mt-0.5 border-white" />
                  <span>
                    {t('form.newsletterConsent')}{' '}
                    <Link to="/confidentialite" className="underline">
                      {t('privacy.title')}
                    </Link>
                  </span>
                </label>
                <ErrorMessage name="consent" component="p" className="text-xs text-red-200" />
                <button type="submit" className="btn btn-secondary w-full rounded-full text-white" disabled={isSubmitting}>
                  {isSubmitting ? t('form.sending') : t('form.newsletterSubmit')}
                </button>
                {status === 'ok' ? <p className="text-xs text-teal-200">{t('form.newsletterOk')}</p> : null}
                {status === 'exists' ? <p className="text-xs text-teal-200">{t('form.newsletterExists')}</p> : null}
                {status === 'err' ? <p className="text-xs text-red-200">{t('form.network')}</p> : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <ArmoiriesPlaceholder alt={t('brand.armoiriesAlt')} />
            <p className="text-xs text-white/70">
              © {year} DiaspoBoost — {t('brand.rights')}
            </p>
          </div>
          <p className="text-xs text-white/70">
            <a href="https://mokili.io" target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline">
              {t('brand.poweredBy')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
