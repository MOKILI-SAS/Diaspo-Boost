import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import { ZodError } from 'zod'
import type { Env } from './infra/env.js'
import { HttpError } from './infra/errors.js'
import type { Mailer } from './infra/mailer.js'
import type { DataStore } from './infra/storeTypes.js'
import { adminRouter } from './modules/admin/router.js'
import { bookingsRouter } from './modules/bookings/router.js'
import { contactRouter } from './modules/contact/router.js'
import { healthRouter } from './modules/health/router.js'
import { newsRouter } from './modules/news/router.js'
import { newsletterRouter } from './modules/newsletter/router.js'
import { servicesRouter } from './modules/services/router.js'

function limiter(max: number) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { code: 'RATE_LIMIT', message: 'Trop de tentatives. Réessayez dans quelques minutes.' },
  })
}

export function createApp(store: DataStore, mailer: Mailer, env: Env) {
  const app = express()
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept-Language', 'x-admin-key'],
    }),
  )
  app.use(express.json({ limit: '32kb' }))
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))

  app.use('/api/v1/health', healthRouter(store))
  app.use('/api/v1/services', servicesRouter(store))
  app.use('/api/v1/news', newsRouter(store))
  app.use('/api/v1/bookings', limiter(5), bookingsRouter(store, mailer))
  app.use('/api/v1/newsletter', limiter(3), newsletterRouter(store))
  app.use('/api/v1/contact', limiter(5), contactRouter(store, mailer))
  app.use('/api/v1/admin', adminRouter(store, env))

  app.use((_req, res) => {
    res.status(404).json({ code: 'NOT_FOUND', message: 'Route introuvable' })
  })

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof ZodError) {
      res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Veuillez vérifier les champs du formulaire.',
        details: err.flatten(),
      })
      return
    }
    if (err instanceof HttpError) {
      res.status(err.status).json({ code: err.code, message: err.message })
      return
    }
    console.error(err)
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Une erreur est survenue. Merci de réessayer.' })
  })

  return app
}
