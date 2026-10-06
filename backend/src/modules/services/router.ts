import { Router } from 'express'
import type { DataStore } from '../../infra/storeTypes.js'
import { notFound } from '../../infra/errors.js'
import { resolveLang } from '../../lib/lang.js'
import { presentService } from '../../lib/presenters.js'

export function servicesRouter(store: DataStore): Router {
  const router = Router()

  router.get('/', async (req, res, next) => {
    try {
      const lang = resolveLang(req)
      const rows = await store.listActiveServices()
      res.json({ data: rows.map((s) => presentService(s, lang)) })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:slug', async (req, res, next) => {
    try {
      const slug = req.params['slug'] ?? ''
      const row = await store.getActiveServiceBySlug(slug)
      if (!row) throw notFound('Service introuvable')
      res.json({ data: presentService(row, resolveLang(req)) })
    } catch (err) {
      next(err)
    }
  })

  return router
}
