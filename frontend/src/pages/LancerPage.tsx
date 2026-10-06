import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { isAxiosError } from 'axios'
import { createBooking } from '../shared/lib/api'
import { Container, PageHero, Section } from '../shared/ui/Section'
import type { ProfileType } from '../shared/types/api'

interface LancerFormValues {
  profile: ProfileType | ''
  serviceSlug: string
  sector: string
  message: string
  fullName: string
  email: string
  phone: string
  country: string
  consent: boolean
}

const serviceOptions = [
  { slug: 'accompagnement-investissement', label: 'Investir en Afrique / Accompagnement investissement' },
  { slug: 'sommets-networking', label: 'Participer à un sommet DiaspoBoost (Kinshasa, Anvers, Dakar...)' },
  { slug: 'matchmaking-projets', label: 'Matchmaking de projets (proposer ou étudier un projet)' },
  { slug: 'briefings-sectoriels', label: 'Briefing sectoriel (immobilier, agri, énergie, tech)' },
  { slug: 'partenariats-institutionnels', label: 'Partenariat institutionnel / Coopération B2G' },
  { slug: 'communaute-media', label: 'Rejoindre la communauté & réseau médias' },
]

const profileOptions: Array<{ id: ProfileType; label: string }> = [
  { id: 'diaspora', label: 'Cadre expatrié / Membre de la diaspora africaine' },
  { id: 'porteur_projet', label: 'Porteur de projet / Entrepreneur' },
  { id: 'institution', label: 'Représentant institutionnel / Ministère / État' },
  { id: 'partenaire', label: 'Investisseur / Partenaire d’affaires / Sponsor' },
  { id: 'media', label: 'Média / Journaliste / Observateur' },
]

const sectorOptions = [
  'Agro-industrie & transformation locale',
  'Immobilier, aménagement & infrastructures',
  'Transition énergétique, mines & ressources',
  'Technologies, digital & fintech',
  'Commerce, logistique & distribution',
  'Santé, formation & services',
  'Autre secteur',
]

export function LancerPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialService = searchParams.get('service') || 'accompagnement-investissement'
  const [networkError, setNetworkError] = useState<string | null>(null)

  const schema = yup.object({
    profile: yup.string().required(t('form.required')),
    serviceSlug: yup.string().required(t('form.required')),
    sector: yup.string(),
    message: yup.string().trim().min(20, t('form.messageMin')).required(t('form.required')),
    fullName: yup.string().trim().min(2).required(t('form.required')),
    email: yup.string().trim().email(t('form.emailInvalid')).required(t('form.required')),
    phone: yup.string().trim().min(6, t('form.phoneInvalid')).required(t('form.required')),
    country: yup.string().trim().min(2).required(t('form.required')),
    consent: yup.boolean().oneOf([true], t('form.consentRequired')),
  })

  return (
    <>
      <PageHero
        kicker="Démarche officielle"
        title="JE ME LANCE"
        lead="Formulaire de cadrage DiaspoBoost — Répondez à ces questions pour structurer votre démarche. Vos réponses permettent à l'équipe de préparer un accompagnement sur mesure."
      />
      <Section className="bg-base-200">
        <Container className="max-w-3xl">
          <Formik<LancerFormValues>
            initialValues={{
              profile: 'diaspora',
              serviceSlug: initialService,
              sector: 'Agro-industrie & transformation locale',
              message: '',
              fullName: '',
              email: '',
              phone: '',
              country: '',
              consent: false,
            }}
            validationSchema={schema}
            onSubmit={async (values, helpers) => {
              setNetworkError(null)
              try {
                const created = await createBooking({
                  serviceSlug: values.serviceSlug,
                  fullName: values.fullName,
                  email: values.email,
                  phone: values.phone,
                  country: values.country,
                  profile: values.profile,
                  sector: values.sector,
                  message: values.message,
                  consent: true,
                })
                void navigate(`/booking/confirmation/${created.reference}`)
              } catch (err: unknown) {
                if (isAxiosError(err) && err.response?.status === 409) {
                  setNetworkError(t('form.duplicate'))
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
                {networkError ? (
                  <div className="alert alert-error text-sm" role="alert">
                    {networkError}
                  </div>
                ) : null}

                {/* Question 1 : Profil */}
                <div className="rounded-xl border border-base-300 bg-white p-6 shadow-sm">
                  <div className="border-b border-base-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-magenta">Question 1</span>
                    <h2 className="font-display mt-1 text-lg font-bold text-navy">
                      Quel est votre profil ? <span className="text-error">*</span>
                    </h2>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {profileOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-all ${
                          values.profile === opt.id
                            ? 'border-navy bg-navy/5 text-navy font-medium'
                            : 'border-base-200 hover:border-base-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="profile"
                          value={opt.id}
                          checked={values.profile === opt.id}
                          onChange={() => setFieldValue('profile', opt.id)}
                          className="radio radio-primary radio-sm"
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="profile" component="p" className="mt-2 text-xs text-error" />
                </div>

                {/* Question 2 : Service / Démarche */}
                <div className="rounded-xl border border-base-300 bg-white p-6 shadow-sm">
                  <div className="border-b border-base-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-magenta">Question 2</span>
                    <h2 className="font-display mt-1 text-lg font-bold text-navy">
                      Quelle est votre démarche principale ? <span className="text-error">*</span>
                    </h2>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {serviceOptions.map((opt) => (
                      <label
                        key={opt.slug}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-all ${
                          values.serviceSlug === opt.slug
                            ? 'border-navy bg-navy/5 text-navy font-medium'
                            : 'border-base-200 hover:border-base-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceSlug"
                          value={opt.slug}
                          checked={values.serviceSlug === opt.slug}
                          onChange={() => setFieldValue('serviceSlug', opt.slug)}
                          className="radio radio-primary radio-sm"
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="serviceSlug" component="p" className="mt-2 text-xs text-error" />
                </div>

                {/* Question 3 : Secteur d'activité */}
                <div className="rounded-xl border border-base-300 bg-white p-6 shadow-sm">
                  <div className="border-b border-base-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-magenta">Question 3</span>
                    <h2 className="font-display mt-1 text-lg font-bold text-navy">
                      Quel secteur ou domaine concerne votre démarche ?
                    </h2>
                  </div>
                  <div className="mt-4">
                    <Field as="select" name="sector" className="select select-bordered w-full text-sm">
                      {sectorOptions.map((sec) => (
                        <option key={sec} value={sec}>
                          {sec}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                {/* Question 4 : Description du projet / besoin */}
                <div className="rounded-xl border border-base-300 bg-white p-6 shadow-sm">
                  <div className="border-b border-base-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-magenta">Question 4</span>
                    <h2 className="font-display mt-1 text-lg font-bold text-navy">
                      Décrivez brièvement votre projet, intention ou besoin <span className="text-error">*</span>
                    </h2>
                    <p className="mt-1 text-xs text-neutral/60">
                      Minimum 20 caractères. Précisez le pays d’intérêt, le stade de maturité ou les questions clés à aborder.
                    </p>
                  </div>
                  <div className="mt-4">
                    <Field
                      as="textarea"
                      name="message"
                      rows={5}
                      className="textarea textarea-bordered w-full text-sm"
                      placeholder="Exemple : Je souhaite investir dans l’agro-industrie au Kongo-Central et j'ai besoin d'un cadrage juridique, fiscal et de partenaires fiables sur le terrain..."
                    />
                    <ErrorMessage name="message" component="p" className="mt-1 text-xs text-error" />
                  </div>
                </div>

                {/* Question 5 : Coordonnées directes */}
                <div className="rounded-xl border border-base-300 bg-white p-6 shadow-sm">
                  <div className="border-b border-base-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-magenta">Question 5</span>
                    <h2 className="font-display mt-1 text-lg font-bold text-navy">
                      Vos coordonnées directes <span className="text-error">*</span>
                    </h2>
                    <p className="mt-1 text-xs text-neutral/60">
                      Pour vous recontacter et vous envoyer votre référence officielle de dossier.
                    </p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label py-1">
                        <span className="label-text text-xs font-medium text-navy">Nom et prénom *</span>
                      </label>
                      <Field name="fullName" className="input input-bordered w-full text-sm" placeholder="Ex: Jean Dupont" />
                      <ErrorMessage name="fullName" component="p" className="mt-1 text-xs text-error" />
                    </div>
                    <div>
                      <label className="label py-1">
                        <span className="label-text text-xs font-medium text-navy">Adresse e-mail *</span>
                      </label>
                      <Field name="email" type="email" className="input input-bordered w-full text-sm" placeholder="Ex: jean.dupont@email.com" />
                      <ErrorMessage name="email" component="p" className="mt-1 text-xs text-error" />
                    </div>
                    <div>
                      <label className="label py-1">
                        <span className="label-text text-xs font-medium text-navy">Numéro WhatsApp / Téléphone *</span>
                      </label>
                      <Field name="phone" type="tel" className="input input-bordered w-full text-sm" placeholder="Ex: +33 6 12 34 56 78" />
                      <ErrorMessage name="phone" component="p" className="mt-1 text-xs text-error" />
                    </div>
                    <div>
                      <label className="label py-1">
                        <span className="label-text text-xs font-medium text-navy">Pays de résidence *</span>
                      </label>
                      <Field name="country" className="input input-bordered w-full text-sm" placeholder="Ex: France, Belgique, RDC..." />
                      <ErrorMessage name="country" component="p" className="mt-1 text-xs text-error" />
                    </div>
                  </div>
                </div>

                {/* Consentement & Soumission */}
                <div className="rounded-xl border border-base-300 bg-white p-6 shadow-sm">
                  <label className="flex items-start gap-3 text-sm">
                    <Field type="checkbox" name="consent" className="checkbox checkbox-primary mt-0.5" />
                    <span className="text-neutral/80">
                      J’accepte que DiaspoBoost conserve ces informations pour traiter ma demande de cadrage, conformément à la{' '}
                      <Link to="/confidentialite" className="link font-medium text-navy">
                        politique de confidentialité
                      </Link>
                      .
                    </span>
                  </label>
                  <ErrorMessage name="consent" component="p" className="mt-2 text-xs text-error" />

                  <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full rounded-full px-8 text-base sm:w-auto"
                    >
                      {isSubmitting ? 'Envoi en cours…' : 'Valider et envoyer (JE ME LANCE)'}
                    </button>
                    <p className="text-xs text-neutral/50">
                      Référence unique de dossier générée immédiatement à l'envoi.
                    </p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Section>
    </>
  )
}
