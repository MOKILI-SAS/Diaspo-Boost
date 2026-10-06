import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { createApp } from './app.js'
import { loadEnv } from './infra/env.js'
import { JsonStore } from './infra/jsonStore.js'
import { createMailer } from './infra/mailer.js'
import { PrismaStore } from './infra/prismaStore.js'
import type { DataStore } from './infra/storeTypes.js'

async function main() {
  const env = loadEnv()
  let store: DataStore

  if (env.DB_DRIVER === 'mysql') {
    const prisma = new PrismaClient()
    await prisma.$connect()
    store = new PrismaStore(prisma)
    console.log('[boot] MySQL / Prisma')
  } else {
    const jsonStore = new JsonStore()
    jsonStore.init()
    store = jsonStore
    console.log('[boot] file store (set DB_DRIVER=mysql when Docker MySQL is ready)')
  }

  const mailer = createMailer(env)
  const app = createApp(store, mailer, env)
  app.listen(env.PORT, () => {
    console.log(`[boot] API http://localhost:${env.PORT}/api/v1/health`)
  })
}

main().catch((err: unknown) => {
  console.error('[boot] failed', err)
  process.exit(1)
})
