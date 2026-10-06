import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { isAxiosError } from 'axios'
import { useUiStore } from '../../shared/lib/uiStore'
import { createBooking } from '../../shared/lib/api'
import type { ProfileType } from '../../shared/types/api'

interface FormValues {
  profile: ProfileType | ''
  serviceSlug: string
  sector: string
  fullName: string
  email: string
  phone: string
  country: string
  message: string
  consent: boolean
}

const serviceOptions = [
  { slug: 'accompagnement-investissement', label: 'Investir en Afrique / Accompagnement investissement' },
  { slug: 'sommets-networking', label: 'Participer à un sommet DiaspoBoost (Kinshasa, Anvers, Dakar...)' },
  { slug: 'matchmaking-projets', label: 'Matchmaking de projets (proposer ou financer un projet)' },
  { slug: 'briefings-sectoriels', label: 'Briefing sectoriel (immobilier, agro-industrie, énergie, tech)' },
  { slug: 'partenariats-institutionnels', label: 'Partenariat institutionnel / Coopération B2G' },
  { slug: 'communaute-media', label: 'Rejoindre le réseau de la diaspora & relations médias' },
]

const profileOptions: Array<{ id: ProfileType; label: string; desc: string }> = [
  {
    id: 'diaspora',
    label: 'Cadre expatrié / Diaspora africaine',
    desc: 'Investisseur individuel souhaitant sécuriser des placements productifs.',
  },
  {
    id: 'porteur_projet',
    label: 'Porteur de projet / Entrepreneur',
    desc: 'Entreprise ou initiateur de projet cherchant ancrage et financement.',
  },
  {
    id: 'institution',
    label: 'Institution / Organisme public',
    desc: 'Ministère, agence de promotion ou représentant d’État (B2G).',
  },
  {
    id: 'partenaire',
    label: 'Partenaire d’affaires / Investisseur',
    desc: 'Fonds d’investissement, entreprise établie ou sponsor.',
  },
  {
    id: 'media',
    label: 'Média & Journaliste',
    desc: 'Couverture médiatique et partenariats de diffusion.',
  },
]

const sectorOptions = [
  'Agro-industrie & Agriculture',
  'Immobilier & Construction',
  'Énergie, Mines & Ressources',
  'Technologies, Digital & Fintech',
  'Santé & Industrie pharmaceutique',
  'Logistique & Transport',
  'Finance & Fonds d’investissement',
  'Autre secteur',
]

export function LancerOverlayModal() {
  const { t } = useTranslation()
  const isOpen = useUiStore((s) => s.lancerModalOpen)
  const selectedSlug = useUiStore((s) => s.lancerSelectedService)
  const closeModal = useUiStore((s) => s.closeLancerModal)

  const [submittedRef, setSubmittedRef] = useState<string | null>(null)
  const [networkError, setNetworkError] = useState<string | null>(null)

  // Fermer sur touche Echap
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeModal])

  if (!isOpen) return null

  const schema = yup.object({
    profile: yup.string().required(t('form.required')),
    serviceSlug: yup.string().required(t('form.required')),
    sector: yup.string().required(t('form.required')),
    fullName: yup.string().trim().min(2, t('form.required')).required(t('form.required')),
    email: yup.string().trim().email(t('form.emailInvalid')).required(t('form.required')),
    phone: yup.string().trim().nullable(),
    country: yup.string().trim().min(2, t('form.required')).required(t('form.required')),
    message: yup.string().trim().min(10, 'Précisez votre projet (10 caractères min.)').required(t('form.required')),
    consent: yup.boolean().oneOf([true], t('form.consentRequired')).required(),
  })

  const initialValues: FormValues = {
    profile: '',
    serviceSlug: selectedSlug || 'accompagnement-investissement',
    sector: '',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    consent: false,
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-lancer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy/80 backdrop-blur-md transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <div className="relative flex flex-col w-full max-w-3xl max-h-[92vh] rounded-2xl bg-white shadow-2xl border border-base-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex items-start justify-between border-b border-base-200 bg-gradient-to-r from-navy to-navy/95 px-6 py-5 text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-secondary badge-sm uppercase tracking-wider font-semibold">
                Démarche Officielle
              </span>
            </div>
            <h2 id="modal-lancer-title" className="font-display mt-2 text-2xl font-bold tracking-tight text-white">
              JE ME LANCE
            </h2>
            <p className="mt-1 text-xs text-white/80">
              Formulaire de candidature et d'accompagnement directement relié au compte DiaspoBoost.
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-circle btn-ghost btn-sm text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Corps défilant du modal */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submittedRef ? (
            <div className="text-center py-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display mt-4 text-2xl font-bold text-navy">
                Candidature transmise avec succès !
              </h3>
              <p className="mt-2 text-sm text-neutral/70">
                Votre dossier a été enregistré et notifié à l'équipe sur{' '}
                <strong className="text-navy">contact@diaspoboost.com</strong>.
              </p>
              <div className="mt-6 inline-block rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Numéro de dossier unique
                </p>
                <p className="font-mono text-2xl font-black text-emerald-950 mt-1">{submittedRef}</p>
              </div>
              <p className="mt-4 text-xs text-neutral/60">
                Conservez ce numéro pour tout suivi. Un email récapitulatif vous a été envoyé.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-primary rounded-full px-8"
                >
                  Terminer
                </button>
              </div>
            </div>
          ) : (
            <div>

              {networkError ? (
                <div className="alert alert-error mb-6 text-sm" role="alert">
                  {networkError}
                </div>
              ) : null}

              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={async (values, helpers) => {
                  setNetworkError(null)
                  try {
                    const res = await createBooking({
                      profile: values.profile as ProfileType,
                      serviceSlug: values.serviceSlug,
                      sector: values.sector,
                      fullName: values.fullName,
                      email: values.email,
                      phone: values.phone || undefined,
                      country: values.country,
                      message: values.message,
                      consent: values.consent,
                    })
                    setSubmittedRef(res.reference)
                    helpers.resetForm()
                  } catch (err: unknown) {
                    if (isAxiosError(err) && err.response?.status === 409) {
                      setNetworkError(
                        'Un dossier avec cet email pour ce service a déjà été enregistré au cours des dernières 24h.'
                      )
                    } else {
                      setNetworkError(t('form.network'))
                    }
                  } finally {
                    helpers.setSubmitting(false)
                  }
                }}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="space-y-6">
                    {/* Question 1 : Profil */}
                    <div className="rounded-xl border border-base-300 bg-base-100 p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-magenta">Étape 1</span>
                      <h3 className="font-display mt-1 text-base font-bold text-navy">
                        Quel est votre profil ? <span className="text-error">*</span>
                      </h3>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {profileOptions.map((opt) => (
                          <label
                            key={opt.id}
                            className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors ${
                              values.profile === opt.id
                                ? 'border-magenta bg-magenta/5 ring-1 ring-magenta'
                                : 'border-base-300 hover:bg-base-200/50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="profile"
                                value={opt.id}
                                checked={values.profile === opt.id}
                                onChange={() => setFieldValue('profile', opt.id)}
                                className="radio radio-primary radio-sm"
                              />
                              <span className="text-xs font-bold text-navy">{opt.label}</span>
                            </div>
                            <span className="mt-1 text-[11px] text-neutral/70 pl-6">{opt.desc}</span>
                          </label>
                        ))}
                      </div>
                      <ErrorMessage name="profile" component="p" className="text-xs text-error mt-2" />
                    </div>

                    {/* Question 2 : Service / Volet */}
                    <div className="rounded-xl border border-base-300 bg-base-100 p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-magenta">Étape 2</span>
                      <h3 className="font-display mt-1 text-base font-bold text-navy">
                        Volet d'accompagnement souhaité <span className="text-error">*</span>
                      </h3>
                      <Field
                        as="select"
                        name="serviceSlug"
                        className="select select-bordered w-full mt-3 text-sm text-navy"
                      >
                        {serviceOptions.map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {s.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="serviceSlug" component="p" className="text-xs text-error mt-1" />
                    </div>

                    {/* Question 3 : Secteur d'activité */}
                    <div className="rounded-xl border border-base-300 bg-base-100 p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-magenta">Étape 3</span>
                      <h3 className="font-display mt-1 text-base font-bold text-navy">
                        Secteur d'activité concerné <span className="text-error">*</span>
                      </h3>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sectorOptions.map((sec) => (
                          <label
                            key={sec}
                            className={`flex items-center gap-2.5 rounded-lg border p-2.5 cursor-pointer text-xs ${
                              values.sector === sec
                                ? 'border-magenta bg-magenta/5 font-semibold text-magenta'
                                : 'border-base-300 hover:bg-base-200/50 text-navy'
                            }`}
                          >
                            <input
                              type="radio"
                              name="sector"
                              value={sec}
                              checked={values.sector === sec}
                              onChange={() => setFieldValue('sector', sec)}
                              className="radio radio-primary radio-xs"
                            />
                            <span>{sec}</span>
                          </label>
                        ))}
                      </div>
                      <ErrorMessage name="sector" component="p" className="text-xs text-error mt-1" />
                    </div>

                    {/* Question 4 : Coordonnées */}
                    <div className="rounded-xl border border-base-300 bg-base-100 p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-magenta">Étape 4</span>
                      <h3 className="font-display mt-1 text-base font-bold text-navy">
                        Vos coordonnées directes <span className="text-error">*</span>
                      </h3>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-medium text-navy">Nom & Prénom *</label>
                          <Field
                            name="fullName"
                            type="text"
                            placeholder="ex. David Mukendi"
                            className="input input-bordered input-sm w-full mt-1 text-navy"
                          />
                          <ErrorMessage name="fullName" component="p" className="text-xs text-error mt-1" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-navy">Email *</label>
                          <Field
                            name="email"
                            type="email"
                            placeholder="ex. david@example.com"
                            className="input input-bordered input-sm w-full mt-1 text-navy"
                          />
                          <ErrorMessage name="email" component="p" className="text-xs text-error mt-1" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-navy">Téléphone / WhatsApp</label>
                          <Field
                            name="phone"
                            type="tel"
                            placeholder="ex. +243 812 226 604"
                            className="input input-bordered input-sm w-full mt-1 text-navy"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-navy">Pays de résidence *</label>
                          <Field
                            name="country"
                            type="text"
                            placeholder="ex. RDC, Belgique, France, Canada..."
                            className="input input-bordered input-sm w-full mt-1 text-navy"
                          />
                          <ErrorMessage name="country" component="p" className="text-xs text-error mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Question 5 : Description du projet */}
                    <div className="rounded-xl border border-base-300 bg-base-100 p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-magenta">Étape 5</span>
                      <h3 className="font-display mt-1 text-base font-bold text-navy">
                        Présentation de votre projet ou besoin <span className="text-error">*</span>
                      </h3>
                      <Field
                        as="textarea"
                        name="message"
                        rows={3}
                        placeholder="Décrivez brièvement vos attentes, le budget estimé ou les étapes souhaitées..."
                        className="textarea textarea-bordered w-full mt-3 text-sm text-navy"
                      />
                      <ErrorMessage name="message" component="p" className="text-xs text-error mt-1" />
                    </div>

                    {/* Consentement */}
                    <div className="space-y-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Field
                          type="checkbox"
                          name="consent"
                          className="checkbox checkbox-primary checkbox-sm mt-0.5"
                        />
                        <span className="text-xs text-neutral/80">
                          J'accepte que mes informations soient transmises à l'équipe DiaspoBoost et au compte{' '}
                          <strong>contact@diaspoboost.com</strong> pour le traitement de ma demande.
                        </span>
                      </label>
                      <ErrorMessage name="consent" component="p" className="text-xs text-error" />
                    </div>

                    {/* Actions de soumission */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-ghost btn-sm rounded-full order-2 sm:order-1"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary rounded-full px-8 order-1 sm:order-2 w-full sm:w-auto"
                      >
                        {isSubmitting ? 'Envoi en cours…' : 'TRANSMETTRE MA CANDIDATURE'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
