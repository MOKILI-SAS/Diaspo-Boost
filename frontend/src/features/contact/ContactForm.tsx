import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { equipeFormWaHref } from '../../data/whatsapp'
import { sendContact } from '../../shared/lib/api'

export function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const { t, i18n } = useTranslation()
  const [done, setDone] = useState(false)
  const rawIntents = t('contact.intents', { returnObjects: true })
  const intents = Array.isArray(rawIntents) ? (rawIntents as string[]) : []
  const schema = yup.object({
    fullName: yup.string().trim().min(2).required(t('form.required')),
    email: yup.string().trim().email(t('form.emailInvalid')).required(t('form.required')),
    subject: yup.string().trim().min(3).required(t('form.required')),
    message: yup.string().trim().min(20, t('form.messageMin')).required(t('form.required')),
    consent: yup.boolean().oneOf([true], t('form.consentRequired')),
  })

  if (done) {
    return <div className="alert alert-success">{t('form.contactOk')}</div>
  }

  return (
    <Formik
      initialValues={{ fullName: '', email: '', subject: defaultSubject, message: '', consent: false }}
      enableReinitialize
      validationSchema={schema}
      onSubmit={async (values, helpers) => {
        window.open(equipeFormWaHref(i18n.language, values), '_blank', 'noopener,noreferrer')
        try {
          await sendContact({ ...values, consent: true })
        } catch {
          // WhatsApp is the primary channel
        } finally {
          setDone(true)
          helpers.setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-4">
          <label className="form-control">
            <span className="label-text font-medium">{t('form.fullName')}</span>
            <Field name="fullName" className="input input-bordered" />
            <ErrorMessage name="fullName" component="span" className="text-sm text-error" />
          </label>
          <label className="form-control">
            <span className="label-text font-medium">{t('form.email')}</span>
            <Field name="email" type="email" className="input input-bordered" />
            <ErrorMessage name="email" component="span" className="text-sm text-error" />
          </label>
          <label className="form-control">
            <span className="label-text font-medium">{t('form.subject')}</span>
            <Field as="select" name="subject" className="select select-bordered">
              <option value="">{t('form.subjectPlaceholder')}</option>
              {defaultSubject && !intents.includes(defaultSubject) ? (
                <option value={defaultSubject}>{defaultSubject}</option>
              ) : null}
              {intents.map((intent) => (
                <option key={intent} value={intent}>
                  {intent}
                </option>
              ))}
            </Field>
            <ErrorMessage name="subject" component="span" className="text-sm text-error" />
          </label>
          <label className="form-control">
            <span className="label-text font-medium">{t('form.message')}</span>
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
          <button type="submit" className="btn btn-primary rounded-full" disabled={isSubmitting}>
            {isSubmitting ? t('form.sending') : t('form.contactSubmit')}
          </button>
        </Form>
      )}
    </Formik>
  )
}
