import { Formik, Form, Field, ErrorMessage } from 'formik'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { createBooking } from '../../shared/lib/api'
import { createBookingSchema, emptyBooking, type BookingValues } from './schema'
import type { ProfileType } from '../../shared/types/api'

const profiles: ProfileType[] = ['diaspora', 'porteur_projet', 'institution', 'partenaire', 'media']

export function BookingForm({ serviceSlug }: { serviceSlug: string }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [networkError, setNetworkError] = useState<string | null>(null)
  const schema = createBookingSchema(t)

  return (
    <div className="rounded-xl border border-base-300 bg-base-200 p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-navy">{t('services.formTitle')}</h2>
      <p className="mt-2 text-sm text-neutral/70">{t('services.formLead')}</p>
      <Formik<BookingValues>
        initialValues={emptyBooking}
        validationSchema={schema}
        onSubmit={async (values, helpers) => {
          setNetworkError(null)
          try {
            const created = await createBooking({
              serviceSlug,
              fullName: values.fullName,
              email: values.email,
              phone: values.phone || undefined,
              country: values.country,
              profile: values.profile,
              sector: values.sector || undefined,
              message: values.message,
              consent: true,
            })
            void navigate(`/booking/confirmation/${created.reference}`)
          } catch (err: unknown) {
            if (isAxiosError(err) && err.response?.status === 409) {
              setNetworkError(t('form.duplicate'))
            } else if (isAxiosError(err) && err.response?.status === 400) {
              setNetworkError(t('form.errorSummary'))
            } else {
              setNetworkError(t('form.network'))
            }
          } finally {
            helpers.setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => {
          const hasErrors = Object.keys(errors).some((k) => Boolean((touched as Record<string, unknown>)[k]))
          return (
            <Form className="mt-6 grid gap-4" noValidate>
              {hasErrors ? (
                <div className="alert alert-warning text-sm" role="alert">
                  {t('form.errorSummary')}
                </div>
              ) : null}
              {networkError ? (
                <div className="alert alert-error text-sm" role="alert">
                  {networkError}
                </div>
              ) : null}
              <FieldBlock name="fullName" label={t('form.fullName')} />
              <FieldBlock name="email" label={t('form.email')} type="email" />
              <FieldBlock name="phone" label={t('form.phone')} type="tel" />
              <FieldBlock name="country" label={t('form.country')} />
              <label className="form-control w-full">
                <span className="label-text font-medium text-navy">{t('form.profile')}</span>
                <Field as="select" name="profile" className="select select-bordered w-full" aria-invalid={Boolean(errors.profile && touched.profile)}>
                  <option value="">{t('form.profile')}</option>
                  {profiles.map((p) => (
                    <option key={p} value={p}>
                      {t(`form.profiles.${p}`)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="profile" component="span" className="label-text-alt text-error" />
              </label>
              <FieldBlock name="sector" label={t('form.sector')} />
              <label className="form-control w-full">
                <span className="label-text font-medium text-navy">{t('form.message')}</span>
                <Field
                  as="textarea"
                  name="message"
                  rows={5}
                  className="textarea textarea-bordered w-full"
                  aria-invalid={Boolean(errors.message && touched.message)}
                />
                <ErrorMessage name="message" component="span" className="label-text-alt text-error" />
              </label>
              <label className="flex items-start gap-3 text-sm">
                <Field type="checkbox" name="consent" className="checkbox mt-0.5" />
                <span>
                  {t('form.consent')}{' '}
                  <Link to="/confidentialite" className="link text-navy">
                    {t('privacy.title')}
                  </Link>
                </span>
              </label>
              <ErrorMessage name="consent" component="p" className="text-sm text-error" />
              <button type="submit" className="btn btn-secondary rounded-full text-white" disabled={isSubmitting}>
                {isSubmitting ? t('form.sending') : t('form.submit')}
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

function FieldBlock({ name, label, type = 'text' }: { name: string; label: string; type?: string }) {
  return (
    <label className="form-control w-full">
      <span className="label-text font-medium text-navy">{label}</span>
      <Field id={name} name={name} type={type} className="input input-bordered w-full" />
      <ErrorMessage name={name} component="span" className="label-text-alt text-error" />
    </label>
  )
}
