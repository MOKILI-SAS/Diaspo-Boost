import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { submitRdv } from '../../shared/lib/api'
import {
  TIMEZONES,
  buildIcs,
  formatSlotLabel,
  googleCalendarUrl,
  parseSlot,
  saveRdv,
  withNotifyLinks,
} from './calendar'

export function AppointmentForm({ serviceSlug }: { serviceSlug: string }) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [networkError, setNetworkError] = useState<string | null>(null)
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr'
  const schema = yup.object({
    fullName: yup.string().trim().min(2).required(t('form.required')),
    email: yup.string().trim().email(t('form.emailInvalid')).required(t('form.required')),
    phone: yup.string().trim().when('notifyWhatsapp', {
      is: true,
      then: (s) => s.min(7, t('form.phoneInvalid')).required(t('form.required')),
      otherwise: (s) => s,
    }),
    country: yup.string().trim().min(2).required(t('form.required')),
    slot: yup.string().required(t('form.required')),
    timeZone: yup.string().required(t('form.required')),
    notifyEmail: yup.boolean(),
    notifyWhatsapp: yup.boolean(),
    notifyTelegram: yup.boolean(),
    telegram: yup.string().trim().when('notifyTelegram', {
      is: true,
      then: (s) => s.min(2, t('form.required')).required(t('form.required')),
      otherwise: (s) => s,
    }),
    message: yup.string().trim().min(20, t('form.messageMin')).required(t('form.required')),
    consent: yup.boolean().oneOf([true], t('form.consentRequired')),
  }).test('notify-one', t('rdv.notifyRequired'), function notifyOne(value) {
    if (value.notifyEmail || value.notifyWhatsapp || value.notifyTelegram) return true
    return this.createError({ path: 'notifyEmail', message: t('rdv.notifyRequired') })
  })

  const minSlot = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)

  return (
    <div className="rounded-xl border border-base-300 bg-base-200 p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-navy">{t('rdv.formTitle')}</h2>
      <p className="mt-2 text-sm text-neutral/70">{t('rdv.formLead')}</p>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          country: '',
          slot: '',
          timeZone: 'Africa/Kinshasa',
          notifyEmail: true,
          notifyWhatsapp: true,
          notifyTelegram: false,
          telegram: '',
          message: '',
          consent: false,
        }}
        validationSchema={schema}
        onSubmit={async (values, helpers) => {
          setNetworkError(null)
          try {
            const { start, end } = parseSlot(values.slot, values.timeZone)
            if (Number.isNaN(start.getTime()) || start.getTime() < Date.now()) {
              helpers.setFieldError('slot', t('rdv.slotInvalid'))
              helpers.setSubmitting(false)
              return
            }
            const created = await submitRdv({
              serviceSlug,
              fullName: values.fullName,
              email: values.email,
              phone: values.phone,
              country: values.country,
              slot: values.slot,
              timeZone: values.timeZone,
              notifyEmail: values.notifyEmail,
              notifyWhatsapp: values.notifyWhatsapp,
              notifyTelegram: values.notifyTelegram,
              telegram: values.telegram,
              message: values.message,
            })
            const title = t('rdv.eventTitle')
            const slotLabel = formatSlotLabel(start, lang, values.timeZone)
            const notify = [
              values.notifyEmail ? 'e-mail' : '',
              values.notifyWhatsapp ? 'WhatsApp' : '',
              values.notifyTelegram ? 'Telegram' : '',
            ]
              .filter(Boolean)
              .join(', ')
            const details = [
              `${values.fullName} · ${values.email}`,
              values.phone,
              slotLabel,
              values.message,
              `Réf. ${created.reference}`,
            ]
              .filter(Boolean)
              .join('\n')
            const googleUrl = googleCalendarUrl(title, details, start, end)
            const ics = buildIcs({
              uid: created.reference,
              title,
              details,
              start,
              end,
            })
            const record = withNotifyLinks({
              reference: created.reference,
              createdAt: created.createdAt,
              fullName: values.fullName,
              email: values.email,
              phone: values.phone,
              country: values.country,
              slotLabel,
              slotStartIso: start.toISOString(),
              slotEndIso: end.toISOString(),
              timeZone: values.timeZone,
              notify,
              telegram: values.telegram,
              message: values.message,
              googleUrl,
              ics,
            })
            saveRdv(record)
            if (values.notifyWhatsapp) {
              window.open(record.whatsappUrl, '_blank', 'noopener,noreferrer')
            }
            void navigate(`/rdv/confirmation/${created.reference}`)
          } catch {
            setNetworkError(t('form.network'))
          } finally {
            helpers.setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, values, errors }) => (
          <Form className="mt-6 grid gap-4" noValidate>
            {networkError ? (
              <div className="alert alert-error text-sm" role="alert">
                {networkError}
              </div>
            ) : null}
            <label className="form-control">
              <span className="label-text font-medium text-navy">{t('form.fullName')}</span>
              <Field name="fullName" className="input input-bordered" />
              <ErrorMessage name="fullName" component="span" className="text-sm text-error" />
            </label>
            <label className="form-control">
              <span className="label-text font-medium text-navy">{t('form.email')}</span>
              <Field name="email" type="email" className="input input-bordered" />
              <ErrorMessage name="email" component="span" className="text-sm text-error" />
            </label>
            <label className="form-control">
              <span className="label-text font-medium text-navy">{t('form.phone')}</span>
              <Field name="phone" type="tel" className="input input-bordered" />
              <ErrorMessage name="phone" component="span" className="text-sm text-error" />
            </label>
            <label className="form-control">
              <span className="label-text font-medium text-navy">{t('form.country')}</span>
              <Field name="country" className="input input-bordered" />
              <ErrorMessage name="country" component="span" className="text-sm text-error" />
            </label>
            <label className="form-control">
              <span className="label-text font-medium text-navy">{t('rdv.slot')}</span>
              <Field name="slot" type="datetime-local" min={minSlot} className="input input-bordered" />
              <ErrorMessage name="slot" component="span" className="text-sm text-error" />
            </label>
            <label className="form-control">
              <span className="label-text font-medium text-navy">{t('rdv.timeZone')}</span>
              <Field as="select" name="timeZone" className="select select-bordered">
                {TIMEZONES.map((tz) => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </Field>
            </label>
            <fieldset className="rounded-lg border border-base-300 bg-white p-4">
              <legend className="px-1 text-sm font-medium text-navy">{t('rdv.notify')}</legend>
              <p className="mb-3 text-xs text-neutral/60">{t('rdv.notifyLead')}</p>
              <label className="flex items-center gap-2 text-sm">
                <Field type="checkbox" name="notifyEmail" className="checkbox checkbox-sm" />
                {t('rdv.viaEmail')}
              </label>
              <label className="mt-2 flex items-center gap-2 text-sm">
                <Field type="checkbox" name="notifyWhatsapp" className="checkbox checkbox-sm" />
                {t('rdv.viaWhatsapp')}
              </label>
              <label className="mt-2 flex items-center gap-2 text-sm">
                <Field type="checkbox" name="notifyTelegram" className="checkbox checkbox-sm" />
                {t('rdv.viaTelegram')}
              </label>
              {errors.notifyEmail && !values.notifyEmail && !values.notifyWhatsapp && !values.notifyTelegram ? (
                <p className="mt-2 text-sm text-error">{t('rdv.notifyRequired')}</p>
              ) : null}
            </fieldset>
            {values.notifyTelegram ? (
              <label className="form-control">
                <span className="label-text font-medium text-navy">{t('rdv.telegramHandle')}</span>
                <Field name="telegram" className="input input-bordered" placeholder="@identifiant" />
                <ErrorMessage name="telegram" component="span" className="text-sm text-error" />
              </label>
            ) : null}
            <label className="form-control">
              <span className="label-text font-medium text-navy">{t('rdv.project')}</span>
              <Field as="textarea" name="message" rows={5} className="textarea textarea-bordered" />
              <ErrorMessage name="message" component="span" className="text-sm text-error" />
            </label>
            <label className="flex items-start gap-3 text-sm">
              <Field type="checkbox" name="consent" className="checkbox mt-0.5" />
              <span>
                {t('form.consent')}{' '}
                <Link to="/confidentialite" className="link">
                  {t('privacy.title')}
                </Link>
              </span>
            </label>
            <ErrorMessage name="consent" component="p" className="text-sm text-error" />
            <button type="submit" className="btn btn-secondary rounded-full text-white" disabled={isSubmitting}>
              {isSubmitting ? t('form.sending') : t('rdv.submit')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
