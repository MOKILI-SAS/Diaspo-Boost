import { mkdirSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import request from 'supertest'
import { afterEach, describe, expect, it } from 'vitest'
import { createApp } from '../app.js'
import { JsonStore } from '../infra/jsonStore.js'
import { consoleMailer } from '../infra/mailer.js'
import type { Env } from '../infra/env.js'

const env: Env = {
  NODE_ENV: 'test',
  PORT: 4080,
  DB_DRIVER: 'file',
  FRONTEND_ORIGIN: 'http://127.0.0.1:5280',
  ADMIN_API_KEY: 'test-admin-key-ok',
  ADMIN_EMAIL: 'contact@diaspoboost.com',
  ADMIN_PASSWORD: 'DiaspoBoost2026!',
  SMTP_FROM: 'DiaspoBoost <contact@diaspoboost.com>',
}

function testApp() {
  const store = new JsonStore()
  store.init()
  return createApp(store, consoleMailer, env)
}

describe('API smoke', () => {
  const tmp = path.join(os.tmpdir(), `db-boost-${Date.now()}`)

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  it('health returns ok', async () => {
    mkdirSync(tmp, { recursive: true })
    const res = await request(testApp()).get('/api/v1/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.db).toBe(true)
  })

  it('rejects invalid booking', async () => {
    const res = await request(testApp()).post('/api/v1/bookings').send({
      serviceSlug: 'accompagnement-investissement',
      fullName: 'A',
      email: 'not-an-email',
      country: 'FR',
      profile: 'diaspora',
      message: 'too short',
      consent: true,
    })
    expect(res.status).toBe(400)
    expect(res.body.code).toBe('VALIDATION_ERROR')
  })

  it('creates a booking and hides unpublished news', async () => {
    const app = testApp()
    const created = await request(app)
      .post('/api/v1/bookings')
      .send({
        serviceSlug: 'accompagnement-investissement',
        fullName: 'Marie Nkosi',
        email: `marie.nkosi.${Date.now()}@example.com`,
        country: 'France',
        profile: 'diaspora',
        message: 'Je souhaite investir dans l’agro-industrie au Kongo-Central et j’ai besoin d’un cadrage.',
        consent: true,
      })
    expect(created.status).toBe(201)
    expect(created.body.reference).toMatch(/^DB-\d{8}-[A-F0-9]{4}$/)

    const news = await request(app).get('/api/v1/news')
    expect(news.status).toBe(200)
    const slugs = (news.body.data as Array<{ slug: string; type: string }>).map((n) => n.slug)
    expect(slugs).not.toContain('brouillon-alerte-interne')
    expect(slugs).toContain('interet-dakar-2027')
  })

  it('newsletter requires consent', async () => {
    const res = await request(testApp()).post('/api/v1/newsletter').send({
      email: 'hello@example.com',
    })
    expect(res.status).toBe(400)
  })

  it('admin login succeeds with valid email and password', async () => {
    const app = testApp()
    const res = await request(app).post('/api/v1/admin/login').send({
      email: 'contact@diaspoboost.com',
      password: 'DiaspoBoost2026!',
    })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.token).toBe('test-admin-key-ok')

    const badLogin = await request(app).post('/api/v1/admin/login').send({
      email: 'contact@diaspoboost.com',
      password: 'wrong-password',
    })
    expect(badLogin.status).toBe(401)
  })
})
