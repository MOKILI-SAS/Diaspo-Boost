import { Router } from 'express'
import type { DataStore } from '../../infra/storeTypes.js'

export function healthRouter(store: DataStore): Router {
  const router = Router()
  router.get('/', async (_req, res, next) => {
    try {
      const db = await store.ping()
      res.json({ status: db ? 'ok' : 'degraded', db, time: new Date().toISOString() })
    } catch (err) {
      next(err)
    }
  })
  return router
}
