import { Router } from 'express'
import type { DataStore } from '../../infra/storeTypes.js'
import { newsletterBodySchema } from '../../lib/schemas.js'

export function newsletterRouter(store: DataStore): Router {
  const router = Router()
  router.post('/', async (req, res, next) => {
    try {
      const body = newsletterBodySchema.parse(req.body)
      const result = await store.subscribe(body.email, body.source ?? 'footer')
      res.status(result.created ? 201 : 200).json({
        ok: true,
        created: result.created,
      })
    } catch (err) {
      next(err)
    }
  })
  return router
}
