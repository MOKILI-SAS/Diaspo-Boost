import { Router } from 'express'
import type { Mailer } from '../../infra/mailer.js'
import type { DataStore } from '../../infra/storeTypes.js'
import { notFound } from '../../infra/errors.js'
import { maskEmail } from '../../lib/ids.js'
import { resolveLang, pickLocalized } from '../../lib/lang.js'
import { bookingBodySchema } from '../../lib/schemas.js'

function emptyToUndef(value: string | undefined): string | undefined {
  if (!value || value.trim() === '') return undefined
  return value
}

export function bookingsRouter(store: DataStore, mailer: Mailer): Router {
  const router = Router()

  router.post('/', async (req, res, next) => {
    try {
      const body = bookingBodySchema.parse(req.body)
      const created = await store.createBooking({
        serviceSlug: body.serviceSlug,
        fullName: body.fullName,
        email: body.email,
        phone: emptyToUndef(body.phone),
        country: body.country,
        profile: body.profile,
        sector: emptyToUndef(body.sector),
        message: body.message,
      })
      const lang = resolveLang(req)
      const serviceTitle = pickLocalized(lang, created.serviceTitleFr, created.serviceTitleEn)
      // Notification pour l'équipe DiaspoBoost
      void mailer
        .send({
          to: 'contact@diaspoboost.com',
          subject: `[DiaspoBoost] Dossier ${created.reference} — ${created.fullName}`,
          text: `Nouvelle démarche reçue via DiaspoBoost\n\nRéférence : ${created.reference}\nNom : ${created.fullName}\nEmail : ${created.email}\nTéléphone : ${created.phone ?? 'N/A'}\nPays : ${created.country}\nProfil : ${created.profile}\nSecteur : ${created.sector ?? 'N/A'}\nService : ${serviceTitle}\n\nMessage / Projet :\n${created.message}`,
        })
        .catch((err: unknown) => {
          console.error('[mailer] admin notification failed', err)
        })

      // Confirmation au demandeur
      void mailer
        .send({
          to: created.email,
          subject: `Votre démarche DiaspoBoost (${created.reference})`,
          text: `Bonjour ${created.fullName},\n\nVotre demande d'accompagnement pour "${serviceTitle}" a bien été enregistrée sous la référence ${created.reference}.\n\nNotre équipe étudie votre dossier et vous recontactera rapidement.\n\nL'équipe DiaspoBoost\ncontact@diaspoboost.com\n+243 812 226 604`,
        })
        .catch((err: unknown) => {
          console.error('[mailer] applicant confirmation failed', err)
        })
      res.status(201).json({
        reference: created.reference,
        serviceTitle,
        createdAt: created.createdAt,
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:reference', async (req, res, next) => {
    try {
      const reference = req.params['reference'] ?? ''
      const row = await store.getBookingByReference(reference)
      if (!row) throw notFound('Dossier introuvable')
      const lang = resolveLang(req)
      res.json({
        data: {
          reference: row.reference,
          status: row.status,
          createdAt: row.createdAt,
          fullName: row.fullName,
          email: maskEmail(row.email),
          country: row.country,
          profile: row.profile,
          sector: row.sector,
          serviceTitle: pickLocalized(lang, row.serviceTitleFr, row.serviceTitleEn),
        },
      })
    } catch (err) {
      next(err)
    }
  })

  return router
}
