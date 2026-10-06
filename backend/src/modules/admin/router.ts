import { Router } from 'express'
import type { Env } from '../../infra/env.js'
import { unauthorized } from '../../infra/errors.js'
import type { DataStore } from '../../infra/storeTypes.js'
import { maskEmail } from '../../lib/ids.js'

export function adminRouter(store: DataStore, env: Env): Router {
  const router = Router()

  router.post('/login', (req, res, next) => {
    try {
      const { email, password } = (req.body ?? {}) as { email?: string; password?: string }
      const targetEmail = (env.ADMIN_EMAIL || 'contact@diaspoboost.com').toLowerCase().trim()
      const targetPassword = env.ADMIN_PASSWORD || 'DiaspoBoost2026!'
      if (!email || !password || email.toLowerCase().trim() !== targetEmail || password !== targetPassword) {
        throw unauthorized('Identifiants administrateur invalides.')
      }
      res.json({
        success: true,
        token: env.ADMIN_API_KEY,
        email: targetEmail,
      })
    } catch (err) {
      next(err)
    }
  })

  router.use((req, _res, next) => {
    if (req.path === '/login') {
      next()
      return
    }
    const key = req.header('x-admin-key') || req.header('authorization')?.replace(/^Bearer\s+/i, '')
    if (!key || key !== env.ADMIN_API_KEY) {
      next(unauthorized())
      return
    }
    next()
  })

  router.get('/bookings', async (_req, res, next) => {
    try {
      const rows = await store.listBookings()
      res.json({
        data: rows.map((b) => ({
          ...b,
          email: b.email,
          maskedEmail: maskEmail(b.email),
        })),
      })
    } catch (err) {
      next(err)
    }
  })

  return router
}
