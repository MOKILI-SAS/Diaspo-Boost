import { Router } from 'express'
import type { Mailer } from '../../infra/mailer.js'
import type { DataStore } from '../../infra/storeTypes.js'
import { contactBodySchema } from '../../lib/schemas.js'

export function contactRouter(store: DataStore, mailer: Mailer): Router {
  const router = Router()
  router.post('/', async (req, res, next) => {
    try {
      const body = contactBodySchema.parse(req.body)
      const row = await store.createContact({
        fullName: body.fullName,
        email: body.email,
        subject: body.subject,
        message: body.message,
      })
      void mailer
        .send({
          to: 'contact@diaspoboost.org',
          subject: `Contact: ${row.subject}`,
          text: `${row.fullName} <${row.email}>\n\n${row.message}`,
        })
        .catch((err: unknown) => {
          console.error('[mailer] contact failed', err)
        })
      res.status(201).json({ ok: true, id: row.id })
    } catch (err) {
      next(err)
    }
  })
  return router
}
