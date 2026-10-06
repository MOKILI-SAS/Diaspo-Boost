import { Router } from 'express'
import type { DataStore } from '../../infra/storeTypes.js'
import { notFound } from '../../infra/errors.js'
import { resolveLang } from '../../lib/lang.js'
import { presentNews } from '../../lib/presenters.js'
import { newsQuerySchema } from '../../lib/schemas.js'

export function newsRouter(store: DataStore): Router {
  const router = Router()

  router.get('/', async (req, res, next) => {
    try {
      const query = newsQuerySchema.parse(req.query)
      const lang = resolveLang(req)
      const rows = await store.listPublishedNews(query.type)
      res.json({ data: rows.map((n) => presentNews(n, lang)) })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:slug', async (req, res, next) => {
    try {
      const slug = req.params['slug'] ?? ''
      const row = await store.getPublishedNewsBySlug(slug)
      if (!row) throw notFound('Actualité introuvable')
      res.json({ data: presentNews(row, resolveLang(req)) })
    } catch (err) {
      next(err)
    }
  })

  return router
}
